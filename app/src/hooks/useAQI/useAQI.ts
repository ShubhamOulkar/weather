import { useQuery } from "@tanstack/react-query";
import type { Cooradinates } from "../../types/types";
import { fetchCurrentAqi } from "../../utils/apis/fetchCurrentAqi/fetchCurrentAqi";

export function useAQI(coords: Cooradinates) {
  return useQuery({
    queryKey: ["aqi", coords],
    queryFn: () => fetchCurrentAqi(coords),
    enabled: !!coords,
    throwOnError: true,
  });
}
