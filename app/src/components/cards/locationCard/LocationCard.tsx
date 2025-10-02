import cnr from "../../../utils/class_resolver/cnr"
import styles from "./LocationCard.module.css"
import LoaderWrapper from "../../common/LoderWrapper/LoaderWrapper"
import { useLocation } from "../../../context/location/Location"
import WeatherIcon from "../../common/WeatherIcon/WeatherIcon"
import { useUnits } from "../../../context/unitsSystem/UnitsSystem"
import IconFavorite from "../../../assets/images/icon-favorite.svg?react"


export default function LocationCard() {
    const { getTemp } = useUnits()
    const { data: locWeather, isLoading } = useLocation()
    const { date, time, fullDate } = locWeather.locDate

    return <div className={cnr('flexcol', styles.location)}>
        <picture className={styles.location_bg}>
            <source srcSet="/bg-today-large.svg" media="(min-width: 768px)" />
            <img src="/bg-today-small.svg" aria-hidden="true" />
        </picture>
        <div className="flex flex-bet">
            <button className={styles.favorite_btn} type="button" title="favorites" aria-label="Add to location to favorites"><IconFavorite /></button>
            <div title={`Last update at ${time} for ${locWeather.place}`}>
                <LoaderWrapper isLoading={isLoading} loaderClass="loader-xs">
                    <time className={styles.search_time} dateTime={date.toISOString()}
                        aria-label={`Data update at ${time} for ${locWeather.place}`}>
                        {time}
                    </time>
                </LoaderWrapper>
            </div>
        </div>
        <div className={cnr("flex flex-bet margin-block-auto align-items-center", styles.flexcol)}>
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
            <div className="flex gap-4rem">
                <WeatherIcon wmo={locWeather.wmo}
                    isLoading={isLoading}
                    loaderClass="loader-sq"
                    iconClass={styles.location_weather_icon} />

                <p className={styles.location_temp} >
                    <LoaderWrapper isLoading={isLoading} loaderClass="loader-rect">
                        {getTemp(locWeather.temp).replace(" ", "")}
                    </LoaderWrapper>
                </p>
            </div>
        </div>
    </div>
}