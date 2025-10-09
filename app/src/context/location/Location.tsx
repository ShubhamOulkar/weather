import { createContext, type ReactNode, useContext, useState } from "react";
import { useIpLookUp } from "../../hooks/useIpLookUp/useIpLookUp";
import useLocationWeather from "../../hooks/useLocationWeather/useLocationWeather";
import type { LocationInput, LookUpReturn } from "../../types/types";
import { logger } from "../../utils/logger/logger";

interface LocationContext {
  location?: LocationInput;
  setLocation: (loc?: LocationInput) => void;
  data: ReturnType<typeof useLocationWeather>["data"];
  isLoading: boolean;
  ipData: LookUpReturn | undefined;
  ipLoading: boolean;
  isIpError: boolean;
  isWeatherError: boolean;
  error: (Error | null)[];
  refetch: () => void;
}

const LocationContext = createContext<LocationContext | undefined>(undefined);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<LocationInput | undefined>(
    undefined,
  );

  // ip lookup
  const {
    data: ipData,
    isLoading: ipLoading,
    isError: isIpError,
    error: ipError,
  } = useIpLookUp();

  if (isIpError && ipError) {
    logger.error("IP lookup failed", {
      context: "LocationProvider",
      error: ipError,
    });
  }

  // centralise weather data
  const {
    data,
    isFetching: isLoading,
    isError: isWeatherError,
    error: weatherError,
    refetch,
  } = useLocationWeather(location, ipData);

  if (isWeatherError && weatherError) {
    logger.error("Weather fetch failed", {
      context: "LocationProvider",
      error: weatherError,
    });
  }

  const provideValue = {
    location,
    setLocation,
    data,
    isLoading,
    ipLoading,
    ipData,
    isIpError,
    isWeatherError,
    error: [ipError, weatherError],
    refetch,
  };

  return <LocationContext value={provideValue}>{children}</LocationContext>;
}

/**
 * Direct use of latitude and logitude data from location context
 * @returns LocationContext
 */
export function useLocation() {
  const context = useContext(LocationContext);

  if (!context)
    throw new Error("useLocation must be used inside LocationProvider");

  return context;
}
