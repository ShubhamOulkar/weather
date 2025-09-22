import IconSnowing from "../../../assets/images/icon-snow.webp"
import styles from "./ForcastCards.module.css"
import cnr from "../../../utils/class_resolver/cnr"

export default function DailyForcastCards() {
    const days: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    return <div className='flexcol margin-top'>
        <h4>Daily forcast</h4>
        <div className={cnr('grid_container', styles.forcast_container)}>{
            days.map(d => (
                <div className={cnr('flexcol', 'gap-1rem', styles.daily_forcast_card, 'card_design')} key={d}>
                    <p>{d}</p>
                    <img className="icon-3rem" src={IconSnowing} alt="Snowing" />
                    <div className="flex">
                        <p>16<sup>o</sup></p>
                        <p>32<sup>o</sup></p>
                    </div>
                </div>
            ))
        }
        </div>
    </div>
}