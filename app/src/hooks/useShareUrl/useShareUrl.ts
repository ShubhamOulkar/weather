import { useMemo } from "react";
import { useLocation } from "@/context/location/Location";
import { useUnits } from "@/context/unitsSystem/UnitsSystem";
import { convertTemperature } from "@/utils/valueConversion/helpers";

export function useShareUrl() {
  const {
    unitSystem: { temperature: unit },
  } = useUnits();

  const {
    data: { place, temp, wmo, locDate },
  } = useLocation();

  const title = useMemo(
    () =>
      `Today's weather at ${place} is ${convertTemperature(temp, unit).join("")}.`,
    [place, temp, unit],
  );

  const urlToShare = useMemo(() => {
    const href = typeof window !== "undefined" ? window.location.href : "";
    return `${href}api/weather-card?name=${encodeURIComponent(place)}&temp=${temp.toFixed()}&wmo=${wmo}&date=${encodeURIComponent(locDate.fullDate)}&time=${encodeURIComponent(locDate.time)}`;
  }, [place, temp, wmo, locDate.time, locDate.fullDate]);

  return { title, urlToShare, place };
}
