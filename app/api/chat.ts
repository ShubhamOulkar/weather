import { google } from "@ai-sdk/google";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

// --- MANDATORY SYSTEM INSTRUCTION ---
const SYSTEM_INSTRUCTION = `
You are a professional Weather and Travel Health Advisor. Your primary goal is to compare weather data and provide actionable, personalized health and hygiene advice for travel.

**CRITICAL INSTRUCTION:** You MUST return your response as a single JSON object. Do not include any text, markdown, or explanation outside of the JSON structure.

1. Always use the \`Google Search\` tool to retrieve the latest weather forecast for the specified locations.
2. Analyze the weather data for the places mentioned in the user's request.
3. Structure your output exactly according to the JSON schema provided below.

**JSON Schema:**
{
  "greeting": "A brief, encouraging introductory sentence.",
  "comparison": "A concise summary of the main weather difference (e.g., 'New Delhi is hot and humid, while NYC is cool and dry') based on the next 24 hours.",
  "advice": {
    "[City Name 1]": {
      "sunProtection": "Advice on sunscreen, hats, UV index for the next 24 hours.",
      "respiratoryHealth": "Advice on masks, air quality, or pollen for the next 24 hours.",
      "hydrationClothing": "Advice on hydration, clothing layers, and rain gear for the next 24 hours.",
      "hygieneSafety": "Advice on hand hygiene, insect repellent, and city safety."
    },
    "[City Name 2]": {
      "sunProtection": "Advice on sunscreen, hats, UV index for the next 24 hours.",
      "respiratoryHealth": "Advice on masks, air quality, or pollen for the next 24 hours.",
      "hydrationClothing": "Advice on hydration, clothing layers, and rain gear for the next 24 hours.",
      "hygieneSafety": "Advice on hand hygiene, insect repellent, and city safety."
    }
  },
  "farewell": "A short closing sentence."
}
`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { messages } = req.body as { messages: UIMessage[] };

  try {
    const result = streamText({
      model: google("gemini-2.5-flash"),
      messages: convertToModelMessages(messages),
      // Pass the detailed system instruction here
      system: SYSTEM_INSTRUCTION,
      providerOptions: {
        google: {
          // Allows the model more time to use the tool and think deeply
          thinkingConfig: {
            thinkingBudget: -1,
          },
          responseMimeType: "application/json",
        },
      },
      // Ensure Google Search is enabled for grounding and real-time data
      tools: {
        google_search: google.tools.googleSearch({}),
      },
    });

    console.log(result);

    res.setHeader("Content-Type", "application/json");

    result.pipeUIMessageStreamToResponse(res);
  } catch (error) {
    console.error("AI Streaming Error:", error);
    res.status(500).json({ error: "Failed to process request." });
  }
}
