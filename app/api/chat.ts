import { openai } from "@ai-sdk/openai";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

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
      onError({ error }) {
        console.error("Streaming error:", error);
      },
      onFinish({ text, usage, finishReason }) {
        console.log("Stream finished:", { finishReason, usage });
      },
    });

    for await (const textPart of result.textStream) {
      console.log(textPart);
    }

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");

    result.pipeUIMessageStreamToResponse(res);
  } catch (err: any) {
    console.error("Handler error:", err);
    res.status(500).json({
      error: "Internal Server Error",
      details: err.message,
    });
  }
}
