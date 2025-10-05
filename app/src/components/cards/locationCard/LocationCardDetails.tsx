import cnr from "../../../utils/class_resolver/cnr"
import styles from "./LocationCard.module.css"
import LoaderWrapper from "../../common/LoderWrapper/LoaderWrapper"
import { useLocation } from "../../../context/location/Location"
import WeatherIcon from "../../common/WeatherIcon/WeatherIcon"
import { useUnits } from "../../../context/unitsSystem/UnitsSystem"
import FavoritesBtn from "../../common/favoriteBtn/FavoriteBtn"
import IconUpdate from "../../../assets/images/icon-update.svg?react"
import { getWeatherIcon } from "../../../utils/getWeatherIcon/getWeatherIcon"

export default function LocationCardDetails() {
    const { getTemp } = useUnits()
    const { data: locWeather, isLoading } = useLocation()
    const { date, time, fullDate } = locWeather.locDate
    return <>
        <div className="flex flex-bet">
            <FavoritesBtn />
            <div title={`Last update at ${time} for ${locWeather?.place}`} className={cnr("flex","flexcenter", styles.search_time)}>
                <LoaderWrapper isLoading={isLoading} loaderClass="loader-sm">
                    <p>{getWeatherIcon[locWeather.wmo].alt || 'Clear sky'} |</p>
                    <time className="flex flexcenter gap-0_3" dateTime={date.toISOString()}
                        aria-label={`Data update at ${time} for ${locWeather.place}`}>
                        <IconUpdate /> {time}
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
    </>
}