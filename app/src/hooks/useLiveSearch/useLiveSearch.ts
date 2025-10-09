import { useQuery } from "@tanstack/react-query";
import {
  CITY_DATA_QUERY_KEY,
  fetchCityData,
} from "../../utils/apis/fetchCityData/fetchCityData";
import { useDebounce } from "../useDebounce/useDebounce";

/**
 * Debounce query for 500ms.
 * @param query
 * @returns
 */

export function useLiveSearch(query: string) {
  const [debouncedValue, { cancel, flush }] = useDebounce(query);

  const queryResults = useQuery({
    queryKey: [...CITY_DATA_QUERY_KEY, debouncedValue],
    queryFn: () => fetchCityData(debouncedValue),
    enabled: !!debouncedValue,
  });

  return {
    ...queryResults,
    cancel,
    flush,
    debouncedValue,
  };
}
