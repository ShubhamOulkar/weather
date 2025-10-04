import DailyForcastCards from "../cards/dailyForcastCards/ForcastCards"
import HourlyForcastCard from "../cards/hourlyForcastCard/HourlyCard"
import LocationCard from "../cards/locationCard/LocationCard"
import MetricsCards from "../cards/metricsCards/MetricsCards"
import cnr from "../../utils/class_resolver/cnr"
import styles from "./Dashboard.module.css"
import { ErrorBoundary } from "../common/errors/ErrorBoundary/ErrorBoundary"
import { useQueryErrorResetBoundary } from "@tanstack/react-query"

export default function Dashboard() {
    const { reset } = useQueryErrorResetBoundary()
    return <div className={styles.dashboard}>
        <div className={cnr("flexcol", " gap-1rem", styles.left_dashboard)}>
            <div className="flexcol">
                <LocationCard />
                <MetricsCards />
            </div>
            <div className="flexcol margin-top">
                <h4>Daily forecast</h4>
                <ErrorBoundary reset={reset}>
                    <DailyForcastCards />
                </ErrorBoundary>
            </div>
        </div>
        <ErrorBoundary reset={reset}>
            <HourlyForcastCard />
        </ErrorBoundary>
    </div>
}
