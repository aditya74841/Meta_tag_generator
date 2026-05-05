import * as cheerio from 'cheerio';

/**
 * Extracts relevant metadata and content from HTML to be sent to an LLM.
 * @param {string} html - The raw HTML content of the page.
 * @returns {object} - Extracted metadata (title, description, keywords, headings, main text).
 */
export const extractMetadata = (html) => {
    const $ = cheerio.load(html);

    // Extract title
    const title = $('title').text().trim() || $('meta[property="og:title"]').attr('content') || '';

    // Extract meta tags
    const metaTags = {};
    $('meta').each((i, el) => {
        const name = $(el).attr('name') || $(el).attr('property');
        const content = $(el).attr('content');
        if (name && content) {
            metaTags[name] = content;
        }
    });

    // Specific focus on description if available
    const description = $('meta[name="description"]').attr('content') ||
        $('meta[property="og:description"]').attr('content') ||
        '';

    // Extract headings
    const headings = {
        h1: [],
        h2: [],
        h3: []
    };
    $('h1').each((i, el) => {
        const text = $(el).text().trim();
        if (text) headings.h1.push(text);
    });
    $('h2').each((i, el) => {
        const text = $(el).text().trim();
        if (text) headings.h2.push(text);
    });
    $('h3').each((i, el) => {
        const text = $(el).text().trim();
        if (text) headings.h3.push(text);
    });

    // Extract main text (paragraphs) - limit to avoid context overflow
    const paragraphs = [];
    $('p').each((i, el) => {
        if (paragraphs.length < 15) { // Increased to 15 paragraphs for better context
            const text = $(el).text().trim();
            if (text.length > 30) { // Filter out very short strings
                paragraphs.push(text);
            }
        }
    });

    return {
        title,
        description,
        metaTags,
        headings,
        paragraphs: paragraphs.join('\n\n')
    };
};


export const extractInternalLinks = (html, baseUrl) => {
    const $ = cheerio.load(html);
    const links = new Set();

    const base = new URL(baseUrl);

    $('a').each((_, el) => {
        let href = $(el).attr('href');

        if (!href) return;

        try {
            // Convert relative → absolute URL
            const fullUrl = new URL(href, baseUrl).href;

            const urlObj = new URL(fullUrl);

            // Only same domain
            if (urlObj.hostname === base.hostname) {
                // Remove fragments (#section)
                urlObj.hash = "";

                links.add(urlObj.href);
            }
        } catch (err) {
            // Ignore invalid URLs
        }
    });

    return Array.from(links);
};