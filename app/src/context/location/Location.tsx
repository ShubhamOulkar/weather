import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import useLocationWeather from "@/hooks/useLocationWeather/useLocationWeather";
import type { LocationInput, LookUpReturn } from "@/types/types";
import { logger } from "@/utils/logger/logger";

interface LocationContext {
  location?: LocationInput;
  setLocation: (loc?: LocationInput) => void;
  data: ReturnType<typeof useLocationWeather>["data"];
  isLoading: boolean;
  isWeatherError: boolean;
  error: (Error | null)[];
  refetch: () => void;
  storeIpData: (data: LookUpReturn) => void;
}

const LocationContext = createContext<LocationContext | undefined>(undefined);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<LocationInput | undefined>(
    undefined,
  );

  const [ipData, setIpData] = useState<LookUpReturn | undefined>(undefined);

  const storeIpData = useCallback((data: LookUpReturn) => {
    if (data) setIpData(data);
  }, []);

  // centralise weather data
  const {
    data,
    isFetching: isLoading,
    isError: isWeatherError,
    error: weatherError,
    refetch,
  } = useLocationWeather(location, ipData);

  useEffect(() => {
    if (isWeatherError && weatherError) {
      logger.error("Weather fetch failed", {
        context: "LocationProvider",
        error: weatherError,
      });
    }
  }, [isWeatherError, weatherError]);

  const provideValue = {
    location,
    setLocation,
    data,
    isLoading,
    isWeatherError,
    error: [weatherError],
    refetch,
    storeIpData,
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
