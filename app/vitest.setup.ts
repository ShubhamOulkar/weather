import { vi } from "vitest";
import {
  mockDoIpLookUp,
  mockFetchCurrentAqi,
  mockFetchCurrentWeatherData,
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

vi.mock("@/utils/apis/fetchCurrentAqi/fetchCurrentAqi", () => ({
  fetchCurrentAqi: mockFetchCurrentAqi,
}));

vi.mock("@/utils/apis/fetchCurrentWeatherData/fetchCurrentWeatherData", () => ({
  fetchCurrentWeatherData: mockFetchCurrentWeatherData,
}));

vi.mock("@/utils/apis/doIpLookUp/doIpLookUp", () => ({
  doIpLookUp: mockDoIpLookUp,
}));
