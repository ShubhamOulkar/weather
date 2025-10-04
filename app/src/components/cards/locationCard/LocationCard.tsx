import cnr from "../../../utils/class_resolver/cnr"
import styles from "./LocationCard.module.css"
import ErrorCard from "../../common/errors/card/ErrorCard"
import { useLocation } from "../../../context/location/Location"
import LocationCardDetails from "./LocationCardDetails"

export default function LocationCard() {
    const { isLoading, isIpError, isWeatherError, error, refetch } = useLocation()
    const isError = isIpError || isWeatherError

    return <div className={cnr('flexcol', styles.location)}>
        <picture className={styles.location_bg}>
            <source srcSet="/bg-today-large.svg" media="(min-width: 768px)" />
            <img src="/bg-today-small.svg" aria-hidden="true" />
        </picture>
        {isError ? <ErrorCard error={error} retry={true} onRetry={refetch} isLoading={isLoading} /> : <LocationCardDetails />}
    </div>
}