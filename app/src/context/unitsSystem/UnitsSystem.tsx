import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { UnitSystem, UnitsContextType } from "../../types/types";
import {
  convertPrecipitation,
  convertTemperature,
  convertWindSpeed,
} from "../../utils/valueConversion/helpers";

const UnitsContext = createContext<UnitsContextType | null>(null);

const DEFAULTS = {
  metric: {
    temperature: "celsius" as const,
    wind: "kmh" as const,
    precipitation: "mm" as const,
  },
  imperial: {
    temperature: "fahrenheit" as const,
    wind: "mph" as const,
    precipitation: "inch" as const,
  },
};

export function UnitsProvider({ children }: { children: ReactNode }) {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>({
    system: "metric",
    temperature: DEFAULTS.metric.temperature,
    wind: DEFAULTS.metric.wind,
    precipitation: DEFAULTS.metric.precipitation,
  });

  const setSystem = useCallback((system: UnitSystem["system"]) => {
    setUnitSystem((_prev) => ({
      system,
      temperature: DEFAULTS[system].temperature,
      wind: DEFAULTS[system].wind,
      precipitation: DEFAULTS[system].precipitation,
    }));
  }, []);

  const toggleSystem = useCallback(() => {
    setSystem(unitSystem.system === "metric" ? "imperial" : "metric");
  }, [setSystem, unitSystem.system]);

  const setTemperatureUnit = useCallback((unit: UnitSystem["temperature"]) => {
    setUnitSystem((prev) => ({ ...prev, temperature: unit }));
  }, []);

  const setWindUnit = useCallback((unit: UnitSystem["wind"]) => {
    setUnitSystem((prev) => ({ ...prev, wind: unit }));
  }, []);

  const setPrecipitationUnit = useCallback(
    (unit: UnitSystem["precipitation"]) => {
      setUnitSystem((prev) => ({ ...prev, precipitation: unit }));
    },
    [],
  );

  const getTemp = useCallback(
    (degree: number) => {
      const [value, unit] = convertTemperature(degree, unitSystem.temperature);
      return `${value} ${unit}`;
    },
    [unitSystem.temperature],
  );

  const getWind = useCallback(
    (speed: number) => {
      const [value, unit] = convertWindSpeed(speed, unitSystem.wind);
      return `${value} ${unit}`;
    },
    [unitSystem.wind],
  );

  const getPrecipitation = useCallback(
    (mm: number) => {
      const [value, unit] = convertPrecipitation(mm, unitSystem.precipitation);
      return `${value} ${unit}`;
    },
    [unitSystem.precipitation],
  );

  const value = useMemo(
    () => ({
      unitSystem,
      setSystem,
      toggleSystem,
      setTemperatureUnit,
      setWindUnit,
      setPrecipitationUnit,
      getTemp,
      getWind,
      getPrecipitation,
    }),
    [
      unitSystem,
      setSystem,
      toggleSystem,
      setTemperatureUnit,
      setWindUnit,
      setPrecipitationUnit,
      getTemp,
      getWind,
      getPrecipitation,
    ],
  );

  return (
    <UnitsContext.Provider value={value}>{children}</UnitsContext.Provider>
  );
}

export const useUnits = () => {
  const context = useContext(UnitsContext);
  if (!context) {
    throw new Error("useUnits must be used within a UnitsProvider");
  }
  return context;
};
