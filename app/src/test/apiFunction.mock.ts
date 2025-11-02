import { getLocalDate } from "@/utils/local_date/getLocalDate";

const mockFetchCurrentAqi = vi.fn();
const mockFetchCurrentWeatherData = vi.fn();
const mockDoIpLookUp = vi.fn();

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

export { mockDoIpLookUp, mockFetchCurrentAqi, mockFetchCurrentWeatherData };
