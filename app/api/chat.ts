import { openai } from "@ai-sdk/openai";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { convertToModelMessages, streamText, UIMessage } from "ai";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { messages } = req.body as { messages: UIMessage[] };

    const result = streamText({
      model: openai("gpt-4o"),
      messages: convertToModelMessages(messages),
    });

    console.log(messages);
  } catch (err: any) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
}
