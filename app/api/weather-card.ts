import type { VercelRequest, VercelResponse } from "@vercel/node";

interface query {
  [key: string]: string;
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  const {
    name = "Hupari",
    temp = "25",
    wmo = "61",
    date,
    time,
  } = req.query as query;
  const title = `Today's weather at ${name} is ${temp}°C.`;
  const domain = `${
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000"
  }`;

  const ogImageUrl = `${domain}/api/og-image?name=${encodeURIComponent(name)}&temp=${temp}&wmo=${wmo}&date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}`;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>${title}</title>
        <meta property="og:title" content="${title}" />
        <meta property="og:description" content="Check out the latest weather update for ${name}" />
        <meta property="og:image" content="${ogImageUrl}" />
        <meta property="og:type" content="website" />
        <meat property="og:url" content="${domain}" />
        <meta property="og:image:alt" content="Weather at ${name}: ${temp}°C — automatically generated forecast card" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="${title}" />
        <meta name="twitter:description" content="Check out the latest weather update for ${name}" />
        <meta name="twitter:image" content="${ogImageUrl}" />
        <meta name="twitter:image:alt" content="Weather at ${name}: ${temp}°C — automatically generated forecast card" />
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
