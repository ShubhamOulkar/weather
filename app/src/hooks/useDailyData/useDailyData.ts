import { useQuery } from "@tanstack/react-query";
import { fetchDailyWeather, DAILY_DATA_QUERY_KEY } from "../../utils/apis/fetchDailyData/fetchDailyData";
import type { Cooradinates } from "../../types/types";

export function useDailyData(coords: Cooradinates) { 
    return useQuery({
        queryKey: [...DAILY_DATA_QUERY_KEY, coords],
        queryFn: () => fetchDailyWeather(coords),
        enabled: !!coords
    })
}