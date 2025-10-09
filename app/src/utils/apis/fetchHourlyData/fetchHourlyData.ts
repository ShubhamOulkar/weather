import { fetchWeatherApi } from "openmeteo";
import type { Cooradinates, HourlyWeather } from "../../../types/types";

export const HOURLY_DATA_QUERY_KEY = ["hourlyData"];

/**
 * Fetches hourly temperatures and weather code from the OpenMeteo API using coordinates.
 * @param coordinates The coordinates object {latitude, longitude}.
 * @returns A promise that resolves to hourly data for a given day temperature data.
 */
export async function fetchHourlyWeather({
  latitude,
  longitude,
}: Cooradinates): Promise<HourlyWeather> {
  const url: string = import.meta.env.VITE_OPEN_METEO_HOURLY;

  if (!url) {
    throw new Error(
      "Missing VITE_OPEN_METEO_HOURLY API endpoint environment variable.",
    );
  }

  const params = {
    latitude: latitude,
    longitude: longitude,
    hourly: ["temperature_2m", "weather_code"],
    timezone: "auto",
    forecast_days: 7,
  };

  try {
    const responses = await fetchWeatherApi(url, params, 0, 1000, 2000, {
      method: "GET",
    });

    if (!responses || responses.length === 0) {
      throw new Error(
        "OpenMeteo API returned an empty hourly weather response array.",
      );
    }

    const hourly = responses[0].hourly();

    if (!hourly) {
      throw new Error("OpenMeteo response structure is missing hourly data.");
    }

    const weatherData = {
      hourly: {
        time: [
          ...Array(
            (Number(hourly.timeEnd()) - Number(hourly.time())) /
              hourly.interval(),
          ),
        ].map(
          (_, i) =>
            new Date((Number(hourly.time()) + i * hourly.interval()) * 1000),
        ),
        temperature_2m: hourly.variables(0)?.valuesArray(),
        weather_code: hourly.variables(1)?.valuesArray(),
        timezone: responses[0].timezone(),
      },
    };

    return weatherData.hourly;
  } catch (error) {
    // Standard error handling
    if (error instanceof Error) {
      console.error("OpenMeteo hourly Weather Fetch Error:", error.message);
      throw error;
    }
    console.error(
      "Unknown error during OpenMeteo hourly weather fetch:",
      error,
    );
    throw new Error(
      "An unexpected error occurred while retrieving hourly weather data.",
    );
  }
}
