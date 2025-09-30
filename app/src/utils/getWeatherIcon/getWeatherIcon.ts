
/**
 *  WMO numbers are taken from open-meteo api documentation
 * These numbers are taken from weather_code parameter
*/
export const getWeatherIcon: Record<number, { file: string; alt: string }> = {
    0: { file: "icon-sunny.webp", alt: "sunny" },
    1: { file: "icon-partly-cloudy.webp", alt: "partly cloudy" },
    2: { file: "icon-partly-cloudy.webp", alt: "partly cloudy" },
    3: { file: "icon-overcast.webp", alt: "overcast" },
    45: { file: "icon-fog.webp", alt: "fog" },
    48: { file: "icon-fog.webp", alt: "fog" },
    51: { file: "icon-drizzle.webp", alt: "drizzle" },
    53: { file: "icon-drizzle.webp", alt: "drizzle" },
    55: { file: "icon-drizzle.webp", alt: "drizzle" },
    61: { file: "icon-rain.webp", alt: "rain" },
    63: { file: "icon-rain.webp", alt: "rain" },
    65: { file: "icon-rain.webp", alt: "rain" },
    71: { file: "icon-snow.webp", alt: "snow" },
    73: { file: "icon-snow.webp", alt: "snow" },
    75: { file: "icon-snow.webp", alt: "snow" },
    80: { file: "icon-rain.webp", alt: "rain showers" },
    81: { file: "icon-rain.webp", alt: "rain showers" },
    82: { file: "icon-rain.webp", alt: "rain showers" },
    85: { file: "icon-snow.webp", alt: "snow showers" },
    86: { file: "icon-snow.webp", alt: "snow showers" },
    95: { file: "icon-storm.webp", alt: "storm" },
    96: { file: "icon-storm.webp", alt: "storm" },
    99: { file: "icon-storm.webp", alt: "storm" },
}
