import { useQuery } from "@tanstack/react-query";
import { doIpLookUp, IP_LOOKUP_QUERY_KEY } from "../../utils/apis/doIpLookUp/doIpLookUp";

export function useIpLookUp() { 
    return useQuery({
        queryKey: IP_LOOKUP_QUERY_KEY,
        queryFn: doIpLookUp,
    })
}