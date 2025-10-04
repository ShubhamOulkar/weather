
/**
 *  WMO numbers are taken from open-meteo api documentation
 * These numbers are taken from weather_code parameter
*/
export const getWeatherIcon: Record<number, { file: string; alt: string }> = {
    0: { file: "icon-sunny.webp", alt: "Clear sky" },
    1: { file: "icon-partly-cloudy.webp", alt: "Partly cloudy" },
    2: { file: "icon-partly-cloudy.webp", alt: "Partly cloudy" },
    3: { file: "icon-overcast.webp", alt: "Overcast" },
    45: { file: "icon-fog.webp", alt: "Fog" },
    48: { file: "icon-fog.webp", alt: "Fog" },
    51: { file: "icon-drizzle.webp", alt: "Drizzle" },
    53: { file: "icon-drizzle.webp", alt: "Drizzle" },
    55: { file: "icon-drizzle.webp", alt: "Drizzle" },
    61: { file: "icon-rain.webp", alt: "Rain" },
    63: { file: "icon-rain.webp", alt: "Rain" },
    65: { file: "icon-rain.webp", alt: "Rain" },
    71: { file: "icon-snow.webp", alt: "Snow" },
    73: { file: "icon-snow.webp", alt: "Snow" },
    75: { file: "icon-snow.webp", alt: "Snow" },
    80: { file: "icon-rain.webp", alt: "Rain showers" },
    81: { file: "icon-rain.webp", alt: "Rain showers" },
    82: { file: "icon-rain.webp", alt: "Rain showers" },
    85: { file: "icon-snow.webp", alt: "Snow showers" },
    86: { file: "icon-snow.webp", alt: "Snow showers" },
    95: { file: "icon-storm.webp", alt: "Storm" },
    96: { file: "icon-storm.webp", alt: "Storm" },
    99: { file: "icon-storm.webp", alt: "Storm" },
}
