import { useLocation } from "../../../context/location/Location";
import { useUnits } from "../../../context/unitsSystem/UnitsSystem";
import { useDailyData } from "../../../hooks/useDailyData/useDailyData";
import cnr from "../../../utils/class_resolver/cnr";
import { getLocalDate } from "../../../utils/local_date/getLocalDate";
import LoaderWrapper from "../../common/LoderWrapper/LoaderWrapper";
import WeatherIcon from "../../common/WeatherIcon/WeatherIcon";
import styles from "./ForcastCards.module.css";

export default function DailyForcastCards() {
  const { data: currData } = useLocation();
  const {
    data: dailyData,
    isLoading,
    isFetching,
  } = useDailyData({
    latitude: currData.latitude,
    longitude: currData.longitude,
  });
  const { unitSystem, getTemp } = useUnits();
  const isBusy = isLoading || isFetching;
  const days = dailyData?.time ?? Array.from({ length: 7 }); // fallback
  const cleanTemp = (temp: number): string => {
    const str = getTemp(temp);
    if (unitSystem.temperature === "fahrenheit") return str.replace("F", "");
    return str.replace("C", "");
  };
  return (
    <div className={cnr("grid_container", styles.forcast_container)}>
      {days.map((d, i) => {
        const weekday = dailyData
          ? getLocalDate(d, { weekday: "short" }).weekday
          : getLocalDate(undefined, { weekday: "short" }).weekday;
        const maxtemp = dailyData?.temperature_2m_max?.[i] ?? 20;
        const mintemp = dailyData?.temperature_2m_min?.[i] ?? 10;
        const wmo = dailyData?.weather_code?.[i] ?? 80;

        return (
          <div
            className={cnr(
              "flexcol",
              "gap-1rem",
              styles.daily_forcast_card,
              "card_design",
            )}
            key={weekday + i}
          >
            <LoaderWrapper isLoading={isBusy} loaderClass="loader-xs">
              <p>{weekday}</p>
            </LoaderWrapper>

            <WeatherIcon
              wmo={wmo}
              isLoading={isBusy}
              loaderClass="loader-xs"
              iconClass={styles.daily_icon}
            />

            <div className="flex">
              <LoaderWrapper isLoading={isBusy} loaderClass="loader-xs">
                <p>{cleanTemp(mintemp)}</p>
              </LoaderWrapper>
              <LoaderWrapper isLoading={isBusy} loaderClass="loader-xs">
                <p>{cleanTemp(maxtemp)}</p>
              </LoaderWrapper>
            </div>
          </div>
        );
      })}
    </div>
  );
}
