import fs from "fs";
import path from "path";
import satori from "satori";
import sharp from "sharp";
import { fileURLToPath } from "url";
import { getWeatherIcon } from "../../src/utils/getWeatherIcon/getWeatherIcon.js";

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

  const backGroundPath = path.resolve(
    path.join(__dirname, "../../public/bg-today-small.svg"),
  );

  const backgroundSvgContent = await fs.promises.readFile(
    backGroundPath,
    "utf-8",
  );

  const backgroundBase64 = Buffer.from(backgroundSvgContent).toString("base64");
  const backgroundDataUrl = `data:image/svg+xml;base64,${backgroundBase64}`;

  const iconBuffer = (await sharp(iconPath).png().toBuffer()).toString(
    "base64",
  );

  const element = {
    type: "div",
    props: {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        gap: "16px",
        width: "100%",
        height: "100%",
        background: `url(${backgroundDataUrl})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        borderRadius: "8px",
        padding: "16px",
        color: "white",
        fontFamily: "Noto-Sans",
      },
      children: [
        // Top badge
        {
          type: "div",
          props: {
            style: {
              backgroundColor: "rgba(255,255,255,0.15)",
              borderRadius: "8px",
              padding: "3px 6px",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              backdropFilter: "blur(4px)",
            },
            children: `${weatherMeta.alt} | ${time}`,
          },
        },
        // city and date
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
                    textWrap: "wrap",
                    fontSize: "16px",
                    fontWeight: 700,
                    marginBottom: "6px",
                  },
                  children: city,
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "16px",
                    opacity: 0.85,
                  },
                  children: date,
                },
              },
            ],
          },
        },

        // temperature + icon
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "12px",
            },
            children: [
              {
                type: "img",
                props: {
                  src: `data:image/png;base64,${iconBuffer}`,
                  width: 32,
                  height: 32,
                  alt: "weather icon",
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "32px",
                    fontWeight: 700,
                    lineHeight: 1,
                  },
                  children: `${temperature}°C`,
                },
              },
            ],
          },
        },
      ],
    },
  };

  const svg = await satori(element as React.ReactNode, {
    width: 300,
    height: 200,
    fonts: [
      {
        name: "Noto-Sans",
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
