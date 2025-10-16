import fs from "fs";
import path from "path";
import satori from "satori";
import sharp from "sharp";
import { fileURLToPath } from "url";
import { getWeatherIcon } from "../../src/utils/getWeatherIcon/getWeatherIcon.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define weather data type
interface WeatherData {
  city: string;
  temperature: string;
  wmo: number;
  date: string;
  time: string;
}

/**
 * Generate OG image for weather data
 */
export async function generateImage(data: WeatherData) {
  const { city, temperature, wmo, date, time } = data;

  const weatherMeta = getWeatherIcon[wmo];

  const iconPath = path.resolve(
    path.join(__dirname, `../../public/icons/${weatherMeta.file}`),
  );

  const iconBuffer = (await sharp(iconPath).png().toBuffer()).toString(
    "base64",
  );

  const element = {
    type: "div",
    props: {
      style: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "989px",
        height: "366px",
        background: "linear-gradient(135deg, #283EFA 0%, #3C00A0 100%)",
        borderRadius: "24px",
        padding: "40px 60px",
        color: "white",
        fontFamily: "Inter",
        position: "relative",
      },
      children: [
        // LEFT SIDE: city + date
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "36px",
                    fontWeight: 700,
                    marginBottom: "12px",
                  },
                  children: city,
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "20px",
                    opacity: 0.8,
                  },
                  children: date,
                },
              },
            ],
          },
        },
        // RIGHT SIDE: temperature + icon
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "20px",
            },
            children: [
              {
                type: "img",
                props: {
                  src: `data:image/png;base64,${iconBuffer}`,
                  width: 100,
                  height: 100,
                  alt: "weather icon",
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "64px",
                    fontWeight: 700,
                  },
                  children: `${temperature}°C`,
                },
              },
            ],
          },
        },
        // TOP RIGHT BADGE
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: "25px",
              right: "30px",
              backgroundColor: "rgba(255,255,255,0.15)",
              borderRadius: "12px",
              padding: "8px 14px",
              fontSize: "18px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              backdropFilter: "blur(5px)",
            },
            children: `${weatherMeta.alt} | ${time}`,
          },
        },
      ],
    },
  };

  const svg = await satori(element as React.ReactNode, {
    width: 989,
    height: 366,
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
  return png;
}
