import fs from "fs";
import path from "path";
import satori from "satori";
import sharp, { format } from "sharp";
import { fileURLToPath } from "url";
import { getWeatherIcon } from "../../src/utils/getWeatherIcon/getWeatherIcon.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define weather data type
interface WeatherData {
  city: string;
  temperature: string;
  wmo: number;
}

/**
 * Generate OG image for weather data
 */
export async function generateImage(data: WeatherData) {
  const { city, temperature, wmo } = data;

  const weatherMeta = getWeatherIcon[wmo];

  const iconPath = path.resolve(
    path.join(__dirname, `../../public/icons/${weatherMeta.file}`),
  );

  const pngBuffer = (await sharp(iconPath).png().toBuffer()).toString("base64");

  const element = {
    type: "div",
    props: {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
        fontFamily: "Inter",
        color: "#1a1a1a",
        textAlign: "center",
        padding: "20px",
      },
      children: [
        {
          type: "img",
          props: {
            src: `data:image/png;base64,${pngBuffer}`,
            width: 120,
            height: 120,
            alt: "weather icon",
            style: { marginBottom: 10 },
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    display: "block",
                    fontSize: "48px",
                    fontWeight: 600,
                  },
                  children: city,
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    display: "block",
                    fontSize: "36px",
                    marginTop: "10px",
                  },
                  children: `${temperature}°C — ${weatherMeta.alt}`,
                },
              },
            ],
          },
        },
      ],
    },
  };

  const svg = await satori(element as React.ReactNode, {
    width: 800,
    height: 400,
    fonts: [
      {
        name: "Inter",
        data: await fs.promises.readFile(
          path.resolve(
            path.join(
              __dirname,
              "../../public/fonts/noto_sans/noto-sans-latin-700-normal.woff",
            ),
          ),
        ),
        weight: 400,
        style: "normal",
      },
    ],
  });

  // const svgPath = `./public/weather/weather-${city}.svg`;
  // await fs.promises.writeFile(svgPath, svg);
  // const webpPath = `./public/weather/weather-${city}.webp`;
  // await fs.promises.writeFile(webpPath, webp);

  const png = await sharp(Buffer.from(svg)).png({ quality: 100 }).toBuffer();

  const svgPath = `./public/weather/${city}.png`;
  await fs.promises.writeFile(svgPath, png);
}
