import LocationCard from "../cards/locationCard/LocationCard"
import MetricsCards from "../cards/metricsCards/MetricsCards"
import DailyForcastCards from "../cards/dailyForcastCards/ForcastCards"
import HourlyCard from "../cards/hourlyForcastCard/HourlyCard"
import DaysDropDown from "../dropdowns/days/DaysDropDown"
import cnr from "../../utils/class_resolver/cnr"
import styles from "./Dashboard.module.css"

export default function Dashboard() {

    return <div className={cnr('flex', 'gap-2rem', styles.dashboard, 'wd-100')}>
        <div className="flexcol gap-1rem wd-100">
            <div className="flexcol">
                <LocationCard />
                <MetricsCards />
            </div>
            <DailyForcastCards />
        </div>
        <div className={cnr('flexcol', 'gap-1rem', styles.hourly_forcast_container, 'card_design', 'wd-100')}>
            <DaysDropDown />
            <HourlyCard />
        </div>
    </div>
}
