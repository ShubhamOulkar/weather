import { useQuery } from "@tanstack/react-query";
import { fetchHourlyWeather, HOURLY_DATA_QUERY_KEY } from "../../utils/apis/fetchHourlyData/fetchHourlyData";
import { groupHourlyByDay } from "../../utils/groupHourlyByDay/groupHourlyByDay";
import type { Cooradinates } from "../../types/types";

export function useHourlyData(coords: Cooradinates) { 
    return useQuery({
        queryKey: [...HOURLY_DATA_QUERY_KEY, coords],
        queryFn: async () => {
            const res = await fetchHourlyWeather(coords)
            const data = groupHourlyByDay(res)
            return data
        } ,
        enabled: !!coords
    })
}