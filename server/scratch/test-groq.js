import { generateMetadata } from '../src/utils/groqClient.js';

const mockMetadata = {
    title: "Example Website",
    metaTags: {
        description: "This is an example website for testing."
    },
    headings: {
        h1: ["Welcome to Example"],
        h2: ["Our Services"]
    },
    paragraphs: "We provide high-quality example services to our clients worldwide. Our mission is to demonstrate how Groq API works."
};

async function test() {
    try {
        console.log("Generating metadata...");
        const result = await generateMetadata(mockMetadata);
        console.log("Result:", JSON.stringify(result, null, 2));
    } catch (error) {
        console.error("Test failed:", error);
    }
}

test();
