import DailyForcastCards from "../cards/dailyForcastCards/ForcastCards"
import HourlyForcastCard from "../cards/hourlyForcastCard/HourlyCard"
import LocationCard from "../cards/locationCard/LocationCard"
import MetricsCards from "../cards/metricsCards/MetricsCards"
import cnr from "../../utils/class_resolver/cnr"
import styles from "./Dashboard.module.css"

export default function Dashboard() {

    return <div className={styles.dashboard}>
        <div className={cnr("flexcol", " gap-1rem", styles.left_dashboard)}>
            <div className="flexcol">
                <LocationCard />
                <MetricsCards />
            </div>
            <DailyForcastCards />
        </div>
        <HourlyForcastCard />
    </div>
}
