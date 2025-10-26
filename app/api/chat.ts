import { google } from "@ai-sdk/google";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { messages } = req.body as { messages: UIMessage[] };

  const result = streamText({
    model: google("gemini-2.5-flash"),
    messages: convertToModelMessages(messages),
  });

  for await (const textPart of result.textStream) {
    console.log(textPart);
  }

  result.pipeTextStreamToResponse(res);
}
