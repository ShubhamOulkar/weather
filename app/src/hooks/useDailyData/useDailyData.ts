import { useQuery } from "@tanstack/react-query";
import type { Cooradinates } from "../../types/types";
import {
  DAILY_DATA_QUERY_KEY,
  fetchDailyWeather,
} from "../../utils/apis/fetchDailyData/fetchDailyData";

export function useDailyData(coords: Cooradinates) {
  return useQuery({
    queryKey: [...DAILY_DATA_QUERY_KEY, coords],
    queryFn: () => fetchDailyWeather(coords),
    enabled: !!coords,
    throwOnError: true,
  });
}
