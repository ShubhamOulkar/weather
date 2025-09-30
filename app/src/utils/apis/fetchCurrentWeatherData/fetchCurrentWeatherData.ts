import { fetchWeatherApi } from "openmeteo";
import type { Cooradinates } from "../../../types/types";

interface MetricData {
    key: string;
    value: string;
}

interface CurrentWeatherMetrics {
    temp: string;
    wmo: number;
    metrics: MetricData[];
}

/**
 * Fetches current weather data from the OpenMeteo API using coordinates.
 * @param coordinates The coordinates object {latitude, longitude}.
 * @returns A promise that resolves to current temperature and structured metrics.
 */
export async function fetchCurrentWeatherData({ latitude, longitude }: Cooradinates): Promise<CurrentWeatherMetrics> {

    const url: string = import.meta.env.VITE_OPEN_METEO_WEATHER;

    if (!url) {
        throw new Error("Missing VITE_OPEN_METEO_WEATHER API endpoint environment variable.");
    }

    const params = {
        latitude: latitude,
        longitude: longitude,
        current: [
            "temperature_2m",
            "apparent_temperature",
            "relative_humidity_2m",
            "wind_speed_10m",
            "precipitation",
            "weather_code",
        ],
        timezone: "auto",
    };

    // Define units and the desired display name for each variable
    const variableMap: { [key: string]: { unit: string; name: string } } = {
        temperature_2m: { unit: "°C", name: "Temperature" },
        apparent_temperature: { unit: "°C", name: "Feels Like" },
        relative_humidity_2m: { unit: "%", name: "Humidity" },
        wind_speed_10m: { unit: "km/h", name: "Wind" },
        precipitation: { unit: "mm", name: "Precipitation" },
        weather_code: {unit: "", name: "wmo"}
    };

    try {
        // retries is 0 because tanstack query do that
        const responses = await fetchWeatherApi(url, params, 0, 1000, 2000, { method: 'GET' });

        if (!responses || responses.length === 0) {
            throw new Error("OpenMeteo API returned an empty response array.");
        }

        const response = responses[0];
        const current = response.current();

        if (!current) {
            throw new Error("OpenMeteo response structure is missing current weather data.");
        }

        const metricsArray: MetricData[] = [];
        let mainTemperature: string | null = null;
        let weather_code: number | null = null;

        // Iterate through all requested variables
        params.current.forEach(variableName => {
            const index = params.current.indexOf(variableName);
            const variable = current.variables(index);
            const mapEntry = variableMap[variableName];

            if (!variable || !mapEntry) {
                console.warn(`Missing data or map entry for variable: ${variableName}`);
                return;
            }
    
            const value = `${variable.value().toFixed(0)} ${mapEntry.unit}`;

            if(variableName === "weather_code") return weather_code = variable.value()

            if (variableName === "temperature_2m") return mainTemperature = value;

            // Add all other variables to the metrics array for the cards
            metricsArray.push({
                key: mapEntry.name,
                value: value,
            });
        });

        if (!mainTemperature || weather_code === null) {
            throw new Error("temperature_2m/weather_code is not found in the response.");
        }

        const results: CurrentWeatherMetrics = {
            temp: mainTemperature,
            wmo: weather_code,
            metrics: metricsArray,
        };

        return results;

    } catch (error) {
        if (error instanceof Error) {
            console.error("OpenMeteo Fetch Error:", error.message);
            throw error;
        }
        console.error("Unknown error during OpenMeteo fetch:", error);
        throw new Error("An unexpected error occurred while retrieving weather data.");
    }
}