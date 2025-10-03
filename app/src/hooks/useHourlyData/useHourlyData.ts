import { useQuery } from "@tanstack/react-query";
import { fetchHourlyWeather, HOURLY_DATA_QUERY_KEY } from "../../utils/apis/fetchHourlyData/fetchHourlyData";
import { groupHourlyByDay } from "../../utils/groupHourlyByDay/groupHourlyByDay";
import type { Cooradinates } from "../../types/types";
import { useLocation } from "../../context/location/Location";

export function useHourlyData(coords: Cooradinates) {
    const { data } = useLocation()
    const { locDate: { date } } = data // this is searched location current date
    return useQuery({
        queryKey: [...HOURLY_DATA_QUERY_KEY, coords, date],
        queryFn: async () => {
            const res = await fetchHourlyWeather(coords)

            const data = groupHourlyByDay(res, date)
            return data
        },
        enabled: !!coords,
        refetchOnWindowFocus: false,
        refetchInterval: 300000,
    })
}