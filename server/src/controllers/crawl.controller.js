import axios from "axios";
import * as cheerio from "cheerio";

const AXIOS_CONFIG = {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    Accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
  },
  timeout: 10000, // Tighter timeout so slow pages don't block workers
};

const MAX_PAGES = 50; // Safety cap
const CONCURRENCY = 6; // Parallel workers — polite but fast

// ─── Helpers ─────────────────────────────────────────────────────────────────

function extractPageTitle(html, url) {
  const $ = cheerio.load(html);
  return (
    $("title").text().trim() ||
    $('meta[property="og:title"]').attr("content") ||
    $("h1").first().text().trim() ||
    new URL(url).pathname ||
    url
  );
}

function extractInternalLinks(html, baseUrl) {
  const $ = cheerio.load(html);
  const links = new Set();
  const base = new URL(baseUrl);

  $("a[href]").each((_, el) => {
    const href = $(el).attr("href");
    if (
      !href ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("javascript:")
    )
      return;

    try {
      const full = new URL(href, baseUrl);
      if (full.hostname === base.hostname) {
        full.hash = "";
        links.add(full.href);
      }
    } catch {
      // ignore malformed URLs
    }
  });

  return Array.from(links);
}

function pathToLabel(url) {
  const { pathname } = new URL(url);
  if (pathname === "/" || pathname === "") return "Home";
  const segment = pathname.split("/").filter(Boolean).pop() || pathname;
  return segment
    .replace(/[-_]/g, " ")
    .replace(/\.[^.]+$/, "")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// ─── Concurrency helper ───────────────────────────────────────────────────────
/**
 * Run `tasks` (array of async functions) with at most `limit` running in
 * parallel.  Returns results in the same order as `tasks`.
 */
async function pLimit(tasks, limit) {
  const results = new Array(tasks.length);
  let nextIdx = 0;

  async function worker() {
    while (nextIdx < tasks.length) {
      const idx = nextIdx++;
      results[idx] = await tasks[idx]();
    }
  }

  const workers = Array.from({ length: Math.min(limit, tasks.length) }, worker);
  await Promise.all(workers);
  return results;
}

// ─── Fetch a single page ──────────────────────────────────────────────────────
async function fetchPage(pageUrl, depth) {
  try {
    const response = await axios.get(pageUrl, AXIOS_CONFIG);
    const contentType = response.headers["content-type"] || "";
    if (!contentType.includes("text/html")) return null; // skip non-HTML

    const html = response.data;
    const title = extractPageTitle(html, pageUrl);
    const path = new URL(pageUrl).pathname || "/";
    const links = depth < 2 ? extractInternalLinks(html, pageUrl) : [];

    return {
      page: {
        url: pageUrl,
        title: title || pathToLabel(pageUrl),
        path,
        label: pathToLabel(pageUrl),
        depth,
        statusCode: response.status,
      },
      links,
    };
  } catch (err) {
    const status = err.response?.status;
    // Record non-404 errors; silently drop 404s and network timeouts
    if (status && status !== 404) {
      return {
        page: {
          url: pageUrl,
          title: pathToLabel(pageUrl),
          path: new URL(pageUrl).pathname || "/",
          label: pathToLabel(pageUrl),
          depth,
          statusCode: status,
          error: `HTTP ${status}`,
        },
        links: [],
      };
    }
    return null;
  }
}

// ─── Controller ───────────────────────────────────────────────────────────────
/**
 * POST /api/crawl
 * Discovers all internal pages using parallel BFS (up to CONCURRENCY workers).
 *
 * Sequential approach: ~12s × N pages
 * Parallel approach:   ~12s × ceil(N / CONCURRENCY)  → ~6× faster
 */
export const crawlWebsite = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ success: false, error: "URL is required" });
  }

  let origin;
  try {
    origin = new URL(url).origin;
  } catch {
    return res
      .status(400)
      .json({ success: false, error: "Invalid URL format" });
  }

  const visited = new Set();
  const pages = [];

  // BFS level-by-level with parallel workers per level
  let currentLevel = [`${origin}/`];

  while (currentLevel.length > 0 && pages.length < MAX_PAGES) {
    // Deduplicate and cap this level
    const toFetch = [
      ...new Set(currentLevel.filter((u) => !visited.has(u))),
    ].slice(0, MAX_PAGES - pages.length);

    toFetch.forEach((u) => visited.add(u));

    // Determine depth from the first URL in this level (all same depth)
    const depth =
      pages.length === 0 ? 0 : (pages[pages.length - 1]?.depth ?? 0) + 1;

    // Run all fetches for this level in parallel (limited by CONCURRENCY)
    const tasks = toFetch.map((u) => () => fetchPage(u, depth));
    const results = await pLimit(tasks, CONCURRENCY);

    const nextLevel = [];
    for (const result of results) {
      if (!result) continue;
      pages.push(result.page);
      // Queue new links for the next BFS level
      for (const link of result.links) {
        if (!visited.has(link)) {
          nextLevel.push(link);
        }
      }
    }

    currentLevel = nextLevel;
  }

  // Sort: home first → shallow → alphabetical
  pages.sort((a, b) => {
    if (a.path === "/" || a.path === "") return -1;
    if (b.path === "/" || b.path === "") return 1;
    if (a.depth !== b.depth) return a.depth - b.depth;
    return a.path.localeCompare(b.path);
  });

  return res.status(200).json({
    success: true,
    message: `Discovered ${pages.length} page(s) on ${origin}`,
    data: { origin, totalPages: pages.length, pages },
  });
};
