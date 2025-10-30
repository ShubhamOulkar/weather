import { vi } from "vitest";
import { getLocalDate } from "@/utils/local_date/getLocalDate";

export const mockFetchCurrentAqi = vi.fn();
export const mockFetchCurrentWeatherData = vi.fn();

vi.mock("@/utils/apis/fetchCurrentAqi/fetchCurrentAqi", () => ({
  fetchCurrentAqi: mockFetchCurrentAqi,
}));

vi.mock("@/utils/apis/fetchCurrentWeatherData/fetchCurrentWeatherData", () => ({
  fetchCurrentWeatherData: mockFetchCurrentWeatherData,
}));

mockFetchCurrentAqi.mockResolvedValue(45);

mockFetchCurrentWeatherData.mockResolvedValue({
  temp: 100,
  wmo: 80,
  metrics: [
    { key: "Feels Like", value: 102 },
    { key: "Humidity", value: 50 },
    { key: "Wind", value: 5 },
    { key: "Precipitation", value: 0 },
  ],
  locDate: getLocalDate(undefined, { minute: "2-digit" }, "en-US"),
});
