import { fetchWeatherApi } from "openmeteo";
import { beforeEach, describe, expect, it, type Mock, vi } from "vitest";
import { fetchCurrentAqi } from "./fetchCurrentAqi";

// mock the dependency
vi.mock("openmeteo", () => ({
  fetchWeatherApi: vi.fn(),
}));

describe("fetchCurrentAqi", () => {
  const mockUrl = "https://api.open-meteo.com/v1/air-quality";
  const mockCoords = { latitude: 40.71, longitude: -74.01 };

  beforeEach(() => {
    vi.resetAllMocks();
    vi.stubEnv("VITE_OPEN_METEO_AQI", mockUrl);
  });

  it("throws an error if env variable is missing", async () => {
    vi.stubEnv("VITE_OPEN_METEO_AQI", undefined); // make env var undefined
    await expect(fetchCurrentAqi(mockCoords)).rejects.toThrow(
      "Missing VITE_OPEN_METEO_AQI API endpoint environment variable.",
    );
  });

  it("throws an error if API returns empty array", async () => {
    (fetchWeatherApi as Mock).mockResolvedValue([]);
    await expect(fetchCurrentAqi(mockCoords)).rejects.toThrow(
      "OpenMeteo API returned an empty AQI response array.",
    );
  });

  it("throws an error if AQI data is missing", async () => {
    const mockResponse = [
      {
        current: vi.fn(() => ({
          variables: vi.fn(() => ({
            value: vi.fn(() => undefined),
          })),
        })),
      },
    ];

    (fetchWeatherApi as Mock).mockResolvedValue(mockResponse);

    await expect(fetchCurrentAqi(mockCoords)).rejects.toThrow(
      "OpenMeteo response structure is missing current AQI data.",
    );
  });

  it("returns AQI value successfully", async () => {
    const mockResponse = [
      {
        current: vi.fn(() => ({
          variables: vi.fn(() => ({
            value: vi.fn(() => 42),
          })),
        })),
      },
    ];

    (fetchWeatherApi as Mock).mockResolvedValue(mockResponse);

    const result = await fetchCurrentAqi(mockCoords);
    expect(result).toBe(42);
    expect(fetchWeatherApi).toHaveBeenCalledWith(
      mockUrl,
      { latitude: 40.71, longitude: -74.01, current: "us_aqi" },
      0,
      1000,
      2000,
      { method: "GET" },
    );
  });

  it("rethrows known Error instances", async () => {
    const error = new Error("Network failed");
    (fetchWeatherApi as Mock).mockRejectedValue(error);

    await expect(fetchCurrentAqi(mockCoords)).rejects.toThrow("Network failed");
  });

  it("throws a wrapped error for non-Error objects", async () => {
    (fetchWeatherApi as Mock).mockRejectedValue("server down");

    await expect(fetchCurrentAqi(mockCoords)).rejects.toThrow(
      "An unexpected error occurred while retrieving AQI data.",
    );
  });
});
