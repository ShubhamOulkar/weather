import type { VercelRequest, VercelResponse } from "@vercel/node";
import { generateImage } from "./ogImage/generateOgImage.js";

interface query {
  [key: string]: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { name = "Hupari", temp = "25", wmo = "61" } = req.query as query;
  await generateImage({ city: name, temperature: temp, wmo: Number(wmo) });
  const title = `Today's weather at ${name} is ${temp}°C.`;
  const imageUrl = `${
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000"
  }/public/weather/${name}.png`;
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>${title}</title>
        <meta property="og:title" content="${title}" />
        <meta property="og:description" content="Check out the latest weather update for ${name}" />
        <meta property="og:image" content="${imageUrl}" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="${title}" />
        <meta name="twitter:description" content="Check out the latest weather update for ${name}" />
        <meta name="twitter:image" content="${imageUrl}" />
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body>
        <p>Preview page for weather in ${name}</p>
      </body>
    </html>
  `;

  res.setHeader("Content-Type", "text/html");
  res.status(200).end(html);
}
