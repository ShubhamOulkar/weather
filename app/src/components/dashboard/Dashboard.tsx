import LocationCard from "../cards/locationCard/LocationCard"
import MetricsCards from "../cards/metricsCards/MetricsCards"
import DailyForcastCards from "../cards/dailyForcastCards/ForcastCards"
import HourlyCard from "../cards/hourlyForcastCard/HourlyCard"
import cnr from "../../utils/cnr"
import styles from "./Dashboard.module.css"

export function Dashboard() {

    return <div className={styles.dashboard}>
        <div className="flexcol gap-1rem">
            <div className="flexcol">
                <LocationCard />
                <MetricsCards />
            </div>
            <DailyForcastCards />
        </div>
        <div className={cnr('flexcol', 'gap-1rem', styles.hourly_forcast_container, 'card_design')}>
            <div className="flex">
                <h4>Hourly forecast</h4>
                <select name="" id="" defaultValue={"Tue"}>
                    <option value="Tue">Tuesday</option>
                </select>
            </div>
            <HourlyCard />
        </div>
    </div>
}