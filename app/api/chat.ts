import { google } from "@ai-sdk/google";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

// --- MANDATORY SYSTEM INSTRUCTION ---
const SYSTEM_INSTRUCTION = `
You are a professional Weather and Travel Health Advisor. Your primary goal is to help users compare weather data between two locations and provide actionable, personalized health and hygiene advice for travel.

1. **Always use the \`Google Search\` tool** to retrieve the latest weather forecast for the specified locations. Do not rely on internal knowledge.
2. **Analyze the weather data** (e.g., temperature, UV index, air quality, humidity, precipitation) for the locations mentioned in the user's request.
3. **Provide comprehensive travel advice** in a conversational, supportive tone, tailored to a traveler going between these two places.

**Specific Advice MUST Cover the following topics, based on the retrieved weather data:**
* **Sun Protection:** Recommend necessity of sunscreen (include suggested SPF rating if possible), hats, and sunglasses, especially if the UV index is high.
* **Respiratory Health:** Provide recommendations for mask usage and caution regarding air quality (AQI) or high pollen counts.
* **Hydration/Clothing:** Offer tips for hydration and specific clothing suggestions (e.g., light layers for temperature swings, waterproof gear for rain).
* **Hygiene/Safety:** Mention specific hygiene or safety considerations (e.g., insect repellent for humid areas, extra hand sanitizer).

Structure your response clearly: start with the weather comparison, and follow with the personalized travel advice section.
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
        },
      },
      // Ensure Google Search is enabled for grounding and real-time data
      tools: {
        google_search: google.tools.googleSearch({}),
      },
    });

    result.pipeUIMessageStreamToResponse(res);
  } catch (error) {
    console.error("AI Streaming Error:", error);
    res.status(500).json({ error: "Failed to process request." });
  }
}
