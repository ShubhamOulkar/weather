import LocBackSmall from "../../../assets/images/bg-today-small.svg"
import LocBackLarge from "../../../assets/images/bg-today-large.svg"
import IconRaining from "../../../assets/images/icon-rain.webp"
import cnr from "../../../utils/class_resolver/cnr"
import styles from "./LocationCard.module.css"

export default function LocationCard() {
    return <div className={styles.location}>
        <picture className={styles.location_bg}>
            <source srcSet={LocBackLarge} media="(min-width: 768px)" />
            <img src={LocBackSmall} alt="" aria-hidden="true" />
        </picture>
        <div className={cnr('flexcol', 'flexcenter', styles.location_details)}>
            <div className="flexcol gap-1rem">
                <h2 className="txt-no-wrap">Hupari, India</h2>
                <sub>Sunday, Sept 14, 2025</sub>
            </div>
            <div className="flex">
                <img className={styles.location_weather_icon} src={IconRaining} alt="raining" />
                <p className={styles.location_temp} >20°C</p>
            </div>
        </div>
    </div>
}