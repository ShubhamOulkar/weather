import type { Cooradinates } from "../../types/types";
import { useQuery } from "@tanstack/react-query";
import { fetchCurrentAqi } from "../../utils/apis/fetchCurrentAqi/fetchCurrentAqi";

export function useAQI(coords: Cooradinates) { 
    return useQuery({
        queryKey: ['aqi', coords],
        queryFn: () => fetchCurrentAqi(coords),
        enabled: !!coords,
        initialData: 30
    })
}