import DailyForcastCards from "../cards/dailyForcastCards/ForcastCards"
import HourlyForcastCard from "../cards/hourlyForcastCard/HourlyCard"
import LocationAndMetrics from "./LocationAndMetrics"
import cnr from "../../utils/class_resolver/cnr"
import styles from "./Dashboard.module.css"

export default function Dashboard() {

    return <div className={cnr('flex', 'gap-2rem', styles.dashboard, 'wd-100')}>
        <div className="flexcol gap-1rem wd-100">
            <LocationAndMetrics />
            <DailyForcastCards />
        </div>
        <HourlyForcastCard />
    </div>
}
