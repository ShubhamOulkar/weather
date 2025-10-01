import cnr from "../../../utils/class_resolver/cnr"
import styles from "./LocationCard.module.css"
import LoaderWrapper from "../../common/LoderWrapper/LoaderWrapper"
import { useLocation } from "../../../context/location/Location"
import WeatherIcon from "../../common/WeatherIcon/WeatherIcon"
import { useUnits } from "../../../context/unitsSystem/UnitsSystem"


export default function LocationCard() {
    const { getTemp } = useUnits()
    const { data: locWeather, isLoading } = useLocation()
    const { date, time, fullDate } = locWeather.locDate

    return <div className={styles.location}>
        <picture className={styles.location_bg}>
            <source srcSet="/bg-today-large.svg" media="(min-width: 768px)" />
            <img src="/bg-today-small.svg" aria-hidden="true" />
        </picture>
        <div className={cnr('flexcol', 'flexcenter', styles.location_details)}>
            <div className="flexcol gap-1rem">
                <h2 className="txt-no-wrap">
                    <LoaderWrapper isLoading={isLoading} loaderClass="loader-lg">
                        {locWeather.place}
                    </LoaderWrapper>
                </h2>
                <time dateTime={date.toISOString()}>
                    <LoaderWrapper isLoading={isLoading} loaderClass="loader-lg">
                        {fullDate}
                    </LoaderWrapper>
                </time>
            </div>
            <div className="flex">
                <WeatherIcon wmo={locWeather.wmo}
                    isLoading={isLoading}
                    loaderClass="loader-sq"
                    iconClass={styles.location_weather_icon} />

                <p className={cnr('flex', 'flexcol', 'gap-1rem', 'flexcenter', styles.location_temp)} >
                    <LoaderWrapper isLoading={isLoading} loaderClass="loader-xs">
                        <time className={styles.updated_at} dateTime={date.toISOString()}
                            aria-label={`Data update at ${time} for ${locWeather.place}`}>
                            Last update {time}
                        </time>
                    </LoaderWrapper>
                    <LoaderWrapper isLoading={isLoading} loaderClass="loader-sq">
                        {getTemp(locWeather.temp)}
                    </LoaderWrapper>
                </p>
            </div>
        </div>
    </div>
}