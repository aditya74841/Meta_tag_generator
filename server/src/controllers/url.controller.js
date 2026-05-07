import axios from "axios";
import { extractMetadata } from "../utils/metadataExtractor.js";
import { generateMetadata } from "../utils/groqClient.js";

/**
 * Handles the incoming URL, fetches its content, extracts metadata,
 * and uses Groq LLM to generate optimized SEO tags and structured data.
 */
export const handleUrl = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        error: "URL is required",
      });
    }

    // 1. Fetch raw HTML from the provided URL
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
      timeout: 15000, // 15 second timeout for deployment stability
    });

    const html = response.data;

    // 2. Extract relevant SEO metadata and content
    const metadata = extractMetadata(html);
    if (!metadata || (!metadata.title && !metadata.paragraphs)) {
      throw new Error(
        "Could not extract meaningful content from the provided URL.",
      );
    }

    // 3. Generate optimized meta tags and structured data using Groq LLM
    const generatedData = await generateMetadata(metadata);

    return res.status(200).json({
      success: true,
      message: "SEO metadata successfully generated",
      data: {
        originalMetadata: metadata,
        generated: generatedData,
      },
    });
  } catch (error) {
    console.error("Error processing URL:", error.message);

    let errorMessage = "Failed to process URL and generate metadata.";
    if (error.response) {
      errorMessage = `Failed to fetch URL: ${error.response.status} ${error.response.statusText}`;
    } else if (error.code === "ECONNABORTED") {
      errorMessage = "Request timed out while fetching the URL.";
    } else {
      errorMessage += ` ${error.message}`;
    }

    return res.status(500).json({
      success: false,
      error: errorMessage,
    });
  }
};
