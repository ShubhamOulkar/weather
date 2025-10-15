// api/og-image.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { generateImage } from "./ogImage/generateOgImage.js";

interface query {
  [key: string]: string;
}

export default async function ogImageHandler(
  req: VercelRequest,
  res: VercelResponse,
) {
  try {
    const { name = "Hupari", temp = "25", wmo = "61" } = req.query as query;

    // 1. Generate the image and get the raw PNG Buffer
    const pngBuffer = await generateImage({
      city: name,
      temperature: temp,
      wmo: Number(wmo),
    });

    // 2. Set the Content-Type header to image/png
    res.setHeader("Content-Type", "image/png");

    // 3. Set a cache header (recommended for performance)
    // Caches the image for one hour (adjust as needed)
    res.setHeader(
      "Cache-Control",
      "public, immutable, no-transform, max-age=3600",
    );

    // 4. Send the raw PNG buffer as the response body
    res.status(200).send(pngBuffer);
  } catch (error) {
    console.error("Error generating OG image:", error);
    res.status(500).send("Error generating image");
  }
}
