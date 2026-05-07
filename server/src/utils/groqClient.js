import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/**
 * Generates SEO meta tags and structured data using Groq LLM.
 * @param {object} metadata - The extracted metadata from the website.
 * @returns {Promise<object>} - The generated meta tags and structured data.
 */
export const generateMetadata = async (metadata) => {
  // Cap inputs to prevent prompt from exceeding token limits
  const safeTitle = (metadata.title || "").substring(0, 200);
  const safeMetaTags = JSON.stringify(metadata.metaTags || {}).substring(
    0,
    500,
  );
  const safeHeadings = JSON.stringify(metadata.headings || {}).substring(
    0,
    400,
  );
  const safeContent = (metadata.paragraphs || "").substring(0, 800);

  const prompt = `You are an expert SEO specialist. Generate optimized SEO meta tags and JSON-LD structured data for this webpage.

Title: ${safeTitle}
Meta Tags: ${safeMetaTags}
Headings: ${safeHeadings}
Content: ${safeContent}

Return ONLY this JSON (no extra text):
{"metaTags":{"title":"Optimized Title","description":"Optimized Description (max 160 chars)","keywords":"kw1, kw2, kw3","og:title":"OG Title","og:description":"OG Description","twitter:card":"summary_large_image","twitter:title":"Twitter Title","twitter:description":"Twitter Description"},"structuredData":{"@context":"https://schema.org","@type":"WebPage","name":"Title","description":"Description"}}

Replace placeholder values with real, optimized content. Keep description under 160 chars.`;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that outputs only JSON.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      max_tokens: 1200,
    });

    return JSON.parse(chatCompletion.choices[0].message.content);
  } catch (error) {
    console.error("Error generating metadata with Groq:", error);
    throw new Error("Failed to generate metadata");
  }
};

/**
 * Generates a detailed SEO expert overview/audit for a given page.
 * All inputs are capped to keep the total prompt under ~2 500 tokens so the
 * response never exceeds Groq's 64 000-token output limit.
 *
 * @param {object} metadata - Extracted page metadata (title, description, etc.)
 * @returns {Promise<object>} - Structured SEO audit report.
 */
export const generateSeoOverview = async (metadata) => {
  // ── Cap all inputs to stay inside the token budget ────────────────────────
  const safeTitle = (metadata.title || "").substring(0, 150);
  const safeDesc = (metadata.description || "").substring(0, 250);
  const safeMetaTags = JSON.stringify(metadata.metaTags || {}).substring(
    0,
    300,
  );
  const safeH1 = JSON.stringify(metadata.headings?.h1 || []).substring(0, 150);
  const safeH2 = JSON.stringify(metadata.headings?.h2 || []).substring(0, 150);
  const safeContent = (metadata.paragraphs || "").substring(0, 600);

  const prompt = `You are an SEO expert. Audit this webpage and return ONLY a JSON object with no extra text.

URL: ${metadata.url || "N/A"}
Title: ${safeTitle}
Description: ${safeDesc}
Meta tags: ${safeMetaTags}
H1: ${safeH1}
H2: ${safeH2}
Content: ${safeContent}

Return JSON matching this exact structure (replace placeholder values with real findings, keep ALL string values under 120 characters):
{"overallScore":75,"grade":"B+","summary":"2-3 sentence expert summary.","scores":{"titleTag":{"score":80,"status":"good","detail":"finding"},"metaDescription":{"score":60,"status":"warning","detail":"finding"},"headingStructure":{"score":70,"status":"warning","detail":"finding"},"contentQuality":{"score":75,"status":"good","detail":"finding"},"keywordOptimization":{"score":65,"status":"warning","detail":"finding"},"socialSharing":{"score":50,"status":"critical","detail":"finding"}},"criticalIssues":["issue1","issue2"],"warnings":["w1","w2"],"opportunities":["o1","o2","o3"],"topRecommendations":[{"priority":"high","action":"action","impact":"impact"},{"priority":"medium","action":"action","impact":"impact"},{"priority":"low","action":"action","impact":"impact"}],"targetKeywords":["kw1","kw2","kw3"],"competitiveInsight":"Short insight."}`;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an SEO auditor. Respond with valid JSON only. Keep all string values concise (under 120 chars each).",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      temperature: 0.3,
      max_tokens: 1800,
    });

    return JSON.parse(chatCompletion.choices[0].message.content);
  } catch (error) {
    console.error("Error generating SEO overview with Groq:", error);
    throw new Error("Failed to generate SEO overview");
  }
};
