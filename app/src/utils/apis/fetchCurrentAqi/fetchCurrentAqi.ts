import { fetchWeatherApi } from "openmeteo";
import type { Cooradinates } from "../../../types/types";

/**
 * Fetches current US AQI data from the OpenMeteo API using coordinates.
 * @param coordinates The coordinates object {latitude, longitude}.
 * @returns A promise that resolves to current AQI.
 */
export async function fetchCurrentAqi({
  latitude,
  longitude,
}: Cooradinates): Promise<number> {
  const url: string = import.meta.env.VITE_OPEN_METEO_AQI;

  if (!url) {
    throw new Error(
      "Missing VITE_OPEN_METEO_AQI API endpoint environment variable.",
    );
  }

  const params = {
    latitude: latitude,
    longitude: longitude,
    current: "us_aqi",
  };

  try {
    // retries is 0 because tanstack query do that
    const responses = await fetchWeatherApi(url, params, 0, 1000, 2000, {
      method: "GET",
    });

    if (!responses || responses.length === 0) {
      throw new Error("OpenMeteo API returned an empty AQI response array.");
    }

    const response = responses[0];
    const current = response.current();
    const aqi = current?.variables(0)?.value();

    if (!aqi) {
      throw new Error(
        "OpenMeteo response structure is missing current AQI data.",
      );
    }

    return aqi;
  } catch (error) {
    if (error instanceof Error) {
      console.error("OpenMeteo AQI Fetch Error:", error.message);
      throw error;
    }
    console.error("Unknown error during OpenMeteo AQI fetch:", error);
    throw new Error("An unexpected error occurred while retrieving AQI data.");
  }
}
