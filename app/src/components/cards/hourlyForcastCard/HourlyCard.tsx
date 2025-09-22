import IconCloudy from "../../../assets/images/icon-partly-cloudy.webp"
import styles from "./HourlyCard.module.css"
import cnr from "../../../utils/class_resolver/cnr"

export default function HourlyCard() {
    const hourly: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    return <div className="flexcol gap-1rem scroll" tabIndex={-1}>
        {
            hourly.map(h => (
                <div className={cnr('flex', styles.hourly_forcast_card)} key={h}>
                    <div className="flex gap-1rem flexcenter">
                        <img className="icon-2rem" src={IconCloudy} alt="cloudy" />
                        <p>3 PM</p>
                    </div>
                    <p>68<sup>o </sup></p>
                </div>
            ))
        }
    </div>
}