import { getLocalDate } from "@/utils/local_date/getLocalDate";

const mockFetchCurrentAqi = vi.fn();
const mockFetchCurrentWeatherData = vi.fn();
const mockDoIpLookUp = vi.fn();
const mockFetchDailyData = vi.fn();
const mockFetchHourlyData = vi.fn();

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

mockDoIpLookUp.mockResolvedValueOnce({
  capital: "moon",
  country: "universe",
  country_code: "000",
  country_icon: "Un",
});

mockFetchDailyData.mockResolvedValueOnce({
  time: getLocalDate().date,
  temperature_2m_max: [10, 2, 5, 10, 7, 15, 0],
  temperature_2m_min: [0, 3, 2, 1, 0, 8, 0],
  weather_code: [0, 80, 96, 99, 96, 80, 99],
});

mockFetchHourlyData.mockResolvedValueOnce({
  time: getLocalDate().date,
  temperature_2m_max: [
    10, 2, 5, 10, 7, 15, 0, 10, 2, 5, 10, 7, 15, 0, 10, 2, 5, 10, 7, 15, 0, 8,
    10, 3,
  ],
  temperature_2m_min: [
    0, 3, 2, 1, 0, 8, 0, 0, 3, 2, 1, 0, 8, 0, 0, 3, 2, 1, 0, 8, 0, 2, 4, 5,
  ],
  weather_code: [
    0, 80, 96, 99, 96, 80, 99, 0, 80, 96, 99, 96, 80, 99, 0, 80, 96, 99, 96, 80,
    99, 80, 80, 99,
  ],
  timezone: "Kolkata",
});

export {
  mockDoIpLookUp,
  mockFetchCurrentAqi,
  mockFetchCurrentWeatherData,
  mockFetchDailyData,
  mockFetchHourlyData,
};
