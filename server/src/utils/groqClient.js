import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

/**
 * Generates SEO meta tags and structured data using Groq LLM.
 * @param {object} metadata - The extracted metadata from the website.
 * @returns {Promise<object>} - The generated meta tags and structured data.
 */
export const generateMetadata = async (metadata) => {
    const prompt = `
    You are an expert SEO specialist. Based on the following website content, generate optimized SEO meta tags and structured data (JSON-LD).
    
    Website Content:
    Title: ${metadata.title}
    Meta Tags: ${JSON.stringify(metadata.metaTags)}
    Headings: ${JSON.stringify(metadata.headings)}
    Key Content: ${metadata.paragraphs}

    Please provide the output in the following JSON format:
    {
      "metaTags": {
        "title": "Optimized Title",
        "description": "Optimized Description",
        "keywords": "keyword1, keyword2, ...",
        "og:title": "Open Graph Title",
        "og:description": "Open Graph Description",
        "twitter:card": "summary_large_image",
        "twitter:title": "Twitter Title",
        "twitter:description": "Twitter Description"
      },
      "structuredData": {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Optimized Title",
        "description": "Optimized Description"
      }
    }
    
    Ensure the JSON is valid and the recommendations are based on SEO best practices. Return ONLY the JSON.

    For additional context, here is the full extracted metadata object:
    ${JSON.stringify(metadata, null, 2)}
    `;

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: 'You are a helpful assistant that outputs only JSON.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            model: 'llama-3.3-70b-versatile',
            response_format: { type: "json_object" }
        });

        return JSON.parse(chatCompletion.choices[0].message.content);
    } catch (error) {
        console.error('Error generating metadata with Groq:', error);
        throw new Error('Failed to generate metadata');
    }
};
