import { vi } from "vitest";
import {
  mockDoIpLookUp,
  mockFetchCurrentAqi,
  mockFetchCurrentWeatherData,
  mockFetchDailyData,
  mockFetchHourlyData,
} from "./src/test/apiFunction.mock";

// Mock localStorage
Object.defineProperty(global, "localStorage", {
  value: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  },
});

// MOck location
Object.defineProperty(window, "location", {
  value: { href: "https://example.com/" },
  writable: true,
});

vi.mock("@/utils/apis/fetchCurrentAqi/fetchCurrentAqi", () => ({
  fetchCurrentAqi: mockFetchCurrentAqi,
}));

vi.mock("@/utils/apis/fetchCurrentWeatherData/fetchCurrentWeatherData", () => ({
  fetchCurrentWeatherData: mockFetchCurrentWeatherData,
}));

vi.mock("@/utils/apis/doIpLookUp/doIpLookUp", () => ({
  doIpLookUp: mockDoIpLookUp,
}));

vi.mock("@/utils/api/fetchDailyData/fetchDailyData", () => ({
  fetchDailyData: mockFetchDailyData,
}));

vi.mock("@/utils/api/fetchHourlyData/fetchHourlyData", () => ({
  fetchHourlyData: mockFetchHourlyData,
}));
