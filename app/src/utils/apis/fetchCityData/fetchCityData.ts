import type { CityData, OwmGeocodingResponse } from "../../../types/types";

export const CITY_DATA_QUERY_KEY = ["cityData"];

/**
 * Fetches geological location (latitude, longitude, name, country, state) by city name
 * using the OpenWeatherMap Geocoding API.
 * Note: the input 'city' has been validated and trimmed by the Zod schema.
 * @param city The name of the city (e.g., "Mumbai, MH, IN").
 * @param limit The maximum number of results to return (default is 5).
 * @returns A promise that resolves to an array of CityData results (up to the specified limit).
 */
export async function fetchCityData(
  city: string | undefined,
  limit = 5,
): Promise<CityData[]> {
  // Safety check for empty string (ZOD doing same validating)
  if (!city || city === "") return [];

  const API_ENDPOINT: string = import.meta.env.VITE_GEOCODING_NAME;
  const API_KEY: string = import.meta.env.VITE_OPEN_WEATHER_MAP_ID;

  if (!API_ENDPOINT || !API_KEY) {
    throw new Error("Missing environment variables for API access.");
  }

  const url = `${API_ENDPOINT}?q=${city}&limit=${limit}&appid=${API_KEY}`;

  try {
    const res = await fetch(url, { method: "GET" });

    if (!res.ok) {
      console.log(
        `HTTP Error: Failed to fetch coordinates for ${city}. Status: ${res.status} ${res.statusText}`,
      );
      throw new Error(
        `HTTP Error: Failed to fetch coordinates for ${city}. Status: ${res.status} ${res.statusText}`,
      );
    }

    const data: OwmGeocodingResponse = await res.json();

    if (!data || data.length === 0) return [];

    const results: CityData[] = data.map((result) => ({
      coords: {
        latitude: result.lat,
        longitude: result.lon,
      },
      countryCode: result.country,
      name: result.name,
      state: result.state,
    }));

    return results;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(
      `An unexpected error occurred during geocoding for ${city}.`,
    );
  }
}
