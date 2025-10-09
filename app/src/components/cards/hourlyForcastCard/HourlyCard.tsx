import { useState } from "react";
import { useLocation } from "../../../context/location/Location";
import { useUnits } from "../../../context/unitsSystem/UnitsSystem";
import { useHourlyData } from "../../../hooks/useHourlyData/useHourlyData";
import type { HourlyEntry } from "../../../types/types";
import cnr from "../../../utils/class_resolver/cnr";
import LoaderWrapper from "../../common/LoderWrapper/LoaderWrapper";
import WeatherIcon from "../../common/WeatherIcon/WeatherIcon";
import DaysDropDown from "../../dropdowns/days/DaysDropDown";
import styles from "./HourlyCard.module.css";

export default function HourlyForcastCard() {
  const { data: currLoc } = useLocation();
  const {
    data: hourly,
    isFetching,
    isLoading,
  } = useHourlyData({
    latitude: currLoc.latitude,
    longitude: currLoc.longitude,
  });
  const [today, setToday] = useState(0);
  const { getTemp } = useUnits();

  const isBusy = isLoading || isFetching;

  const days: string[] = hourly?.weekDays ?? [currLoc.date.weekday];

  const currentDayName: string | undefined = days[today];

  const hourlyForecastForSelectedDay: HourlyEntry[] =
    hourly && currentDayName ? (hourly[currentDayName] ?? []) : [];

  const dataToDisplay =
    hourlyForecastForSelectedDay.length > 0
      ? hourlyForecastForSelectedDay
      : Array.from(
          { length: 24 },
          () =>
            ({
              time: "00 AM",
              temperature: 10,
              weather_code: 80,
            }) as HourlyEntry,
        );

  return (
    <div
      className={cnr(
        "flexcol",
        "gap-1rem",
        styles.hourly_forcast_container,
        "card_design",
      )}
    >
      <DaysDropDown weekDays={days} today={today} setToday={setToday} />
      <div className="flexcol gap-1rem scroll" tabIndex={-1}>
        {dataToDisplay.map((hourEntry, i) => {
          const { time, weather_code, temperature } = hourEntry;
          return (
            <div
              className={cnr("flex", styles.hourly_forcast_card)}
              key={`${time}-${i}`}
            >
              <div className="flex gap-1rem flexcenter">
                <WeatherIcon
                  wmo={weather_code}
                  isLoading={isBusy}
                  loaderClass="loader-xs"
                  iconClass={styles.hourly_icon}
                />
                <LoaderWrapper isLoading={isBusy} loaderClass="loader-xs">
                  <p>{time}</p>
                </LoaderWrapper>
              </div>
              <LoaderWrapper isLoading={isBusy} loaderClass="loader-xs">
                <p>{getTemp(temperature)}</p>
              </LoaderWrapper>
            </div>
          );
        })}
        <button
          type="button"
          className={cnr("flex", "pointer", styles.hourly_forcast_card)}
          onClick={() => (today === 6 ? setToday(0) : setToday(today + 1))}
        >
          Go to next day forcast
        </button>
      </div>
    </div>
  );
}
