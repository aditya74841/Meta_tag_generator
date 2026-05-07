import axios from "axios";
import { extractMetadata } from "../utils/metadataExtractor.js";
import { generateSeoOverview } from "../utils/groqClient.js";

const AXIOS_CONFIG = {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  },
  timeout: 15000,
};

/**
 * POST /api/seo-overview
 * Body: { url: string }
 *
 * Fetches the page, extracts all SEO-relevant signals,
 * then asks Groq to produce a full expert audit.
 */
export const getSeoOverview = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ success: false, error: "URL is required" });
  }

  console.log(`[POST /api/seo-overview] Auditing: ${url}`);

  try {
    // 1. Fetch raw HTML
    const response = await axios.get(url, AXIOS_CONFIG);
    const html = response.data;

    // 2. Extract SEO signals
    const metadata = extractMetadata(html);
    metadata.url = url; // pass url into prompt for context

    if (!metadata || (!metadata.title && !metadata.paragraphs)) {
      return res.status(422).json({
        success: false,
        error: "Could not extract meaningful content from this page.",
      });
    }

    // 3. Generate AI SEO overview
    const overview = await generateSeoOverview(metadata);

    return res.status(200).json({
      success: true,
      message: "SEO overview generated successfully",
      data: {
        url,
        extractedMetadata: {
          title: metadata.title,
          description: metadata.description,
          headings: metadata.headings,
        },
        // Existing meta tags for before/after comparison in the UI
        originalMeta: {
          title: metadata.title,
          description: metadata.description,
          keywords: metadata.metaTags?.keywords || metadata.metaTags?.['article:tag'] || '',
          'og:title': metadata.metaTags?.['og:title'] || '',
        },
        overview,
      },
    });
  } catch (error) {
    console.error("Error generating SEO overview:", error.message);

    let errorMessage = "Failed to generate SEO overview.";
    if (error.response) {
      errorMessage = `Failed to fetch page: HTTP ${error.response.status} ${error.response.statusText}`;
    } else if (error.code === "ECONNABORTED") {
      errorMessage = "Request timed out while fetching the page.";
    } else {
      errorMessage += ` ${error.message}`;
    }

    return res.status(500).json({ success: false, error: errorMessage });
  }
};
