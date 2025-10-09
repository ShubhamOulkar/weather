import type {
  CityData,
  Cooradinates,
  OwmGeocodingResponse,
} from "../../../types/types";

export const REVERSE_GEOCODE_QUERY_KEY = ["reverseGeocode"];

/**
 * Fetches geological location name (city, country, state) using coordinates
 * via the OpenWeatherMap Reverse Geocoding API.
 * @param coords The coordinates object containing latitude and longitude.
 * @returns A promise that resolves to a single CityData object.
 */
export async function fetchLocationByCoords(
  coords: Cooradinates,
): Promise<CityData> {
  const API_ENDPOINT: string = import.meta.env.VITE_REVESE_GEOCODING;
  const API_KEY: string = import.meta.env.VITE_OPEN_WEATHER_MAP_ID;
  const LIMIT = 1;

  if (!API_ENDPOINT || !API_KEY) {
    throw new Error("Missing environment variables for API access.");
  }

  const { latitude: lat, longitude: lon } = coords;

  const url = `${API_ENDPOINT}?lat=${lat}&lon=${lon}&limit=${LIMIT}&appid=${API_KEY}`;

  try {
    const res = await fetch(url, { method: "GET" });

    if (!res.ok) {
      throw new Error(
        `HTTP Error: Failed to retrieve location for coordinates. Status: ${res.status}`,
      );
    }

    const data: OwmGeocodingResponse = await res.json();

    if (!data || data.length === 0) {
      throw new Error(
        `No recognizable location found for coordinates: (${lat}, ${lon}).`,
      );
    }

    const result = data[0];

    const cityData: CityData = {
      coords: { latitude: result.lat, longitude: result.lon },
      countryCode: result.country,
      name: result.name,
      state: result.state,
    };

    return cityData;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(
      `An unexpected error occurred during reverse geocoding for (${lat}, ${lon}).`,
    );
  }
}
