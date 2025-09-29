import { fetchWeatherApi } from "openmeteo";
import type { Cooradinates } from "../../../types/types";

export const DAILY_DATA_QUERY_KEY = ["dailyData"];

/**
 * Fetches daily maximum, minimum temperatures and weather code from the OpenMeteo API using coordinates.
 * @param coordinates The coordinates object {latitude, longitude}.
 * @returns A promise that resolves to daily data.
 */
export async function fetchDailyWeather({ latitude, longitude }: Cooradinates) {
    const url: string = import.meta.env.VITE_OPEN_METEO_DAILY || 'https://climate-api.open-meteo.com/v1/climate';

    if (!url) {
        throw new Error("Missing VITE_OPEN_METEO_DAILY API endpoint environment variable.");
    }

    const params = {
        latitude: latitude,
        longitude: longitude,
        daily: ["temperature_2m_max", "temperature_2m_min", "weather_code"],
        timezone: "auto",
    };

    try {
        const responses = await fetchWeatherApi(url, params, 0, 1000, 2000, { method: 'GET' });

        if (!responses || responses.length === 0) {
            throw new Error("OpenMeteo API returned an empty daily weather response array.");
        }
        const utcOffsetSeconds = responses[0].utcOffsetSeconds()
        const daily = responses[0].daily();

        if (!daily) {
            throw new Error("OpenMeteo response structure is missing daily data.");
        }

        const weatherData = {
            daily: {
                time: [...Array((Number(daily.timeEnd()) - Number(daily.time())) / daily.interval())].map(
                    (_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
                ),
                temperature_2m_max: daily.variables(0)!.valuesArray(),
                temperature_2m_min: daily.variables(1)!.valuesArray(),
                weather_code: daily.variables(2)!.valuesArray(),
            },
        };

        return weatherData.daily;

    } catch (error) {
        // Standard error handling
        if (error instanceof Error) {
            console.error("OpenMeteo Daily Weather Fetch Error:", error.message);
            throw error;
        }
        console.error("Unknown error during OpenMeteo daily weather fetch:", error);
        throw new Error("An unexpected error occurred while retrieving daily weather data.");
    }
}
