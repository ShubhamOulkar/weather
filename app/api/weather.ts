import type { VercelRequest, VercelResponse } from "@vercel/node";
import { generateImage } from "./ogImage/generateOgImage.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { name = "Hupari", temp = "25", wmo = "61" } = req.query;
    const data = { city: name, temperature: temp, wmo: Number(wmo) };
    const { webp } = await generateImage(data);
    res.setHeader("Content-Type", "image/webp");
    res.setHeader("Content-Length", webp.length);
    res.end(webp);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to generate image");
  }
}
