import type { Plugin } from "vite";
import { generateImage } from "../src/utils/ogImage/generateOgImage";

export async function ogServerPlugin(): Promise<Plugin> {
    return {
        name: "vite-plugin-og-server",
        configureServer(server) {
            server.middlewares.use(async (req, res, next) => {
                if (!req.url?.startsWith("/weather")) return next();

                try {
                    const url = new URL(req.url!, "http://localhost");
                    const place = url.searchParams.get("place") || "Hupari";
                    const temp = url.searchParams.get("temp") || "20";
                    const wmo = Number(url.searchParams.get("wmo")) || 61;

                    const data = {
                        city: place,
                        temperature: temp,
                        wmo: wmo,
                    };
                    const { webp } = await generateImage(data);
                    res.setHeader("Content-Type", "image/webp");
                    res.setHeader("Content-Length", webp.length);
                    res.end(webp);
                } catch (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.end("Failed to generate weather image");
                }
            });
        },
    };
}
