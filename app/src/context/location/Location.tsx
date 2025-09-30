import { createContext, useState, useContext, type ReactNode } from "react";
import type { LocationInput } from "../../types/types";
import useLocationWeather from "../../hooks/useLocationWeather/useLocationWeather";

interface LocationContext {
    location?: LocationInput;
    setLocation: (loc?: LocationInput) => void;
    data: ReturnType<typeof useLocationWeather>["data"];
    isLoading: boolean;
    refetch: () => void;
}

const LocationContext = createContext<LocationContext | undefined>(undefined)

export function LocationProvider({ children }: { children: ReactNode }) {
    const [location, setLocation] = useState<LocationInput | undefined>(undefined)

    // centralise weather data
    const { data, isFetching: isLoading, refetch } = useLocationWeather(location)

    return <LocationContext value={{ location, setLocation, data, isLoading, refetch }}>
        {children}
    </LocationContext>
}

/**
 * Direct use of latitude and logitude data from location context
 * @returns LocationContext
 */
export function useLocation() {
    const context = useContext(LocationContext)

    if (!context) throw new Error("useLocation must be used inside LocationProvider")

    return context
}