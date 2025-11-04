import { useQuery } from "@tanstack/react-query";
import { doIpLookUp } from "@/utils/apis/doIpLookUp/doIpLookUp";

const IP_LOOKUP_QUERY_KEY = ["ipLookup"];

export function useIpLookUp() {
  return useQuery({
    queryKey: IP_LOOKUP_QUERY_KEY,
    queryFn: doIpLookUp,
  });
}
