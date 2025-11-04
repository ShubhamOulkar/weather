import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import DailyForcastCards from "@/components/cards/dailyForcastCards/ForcastCards";
import HourlyForcastCard from "@/components/cards/hourlyForcastCard/HourlyCard";
import LocationCard from "@/components/cards/locationCard/LocationCard";
import MetricsCards from "@/components/cards/metricsCards/MetricsCards";
import { ErrorBoundary } from "@/components/common/errors/ErrorBoundary/ErrorBoundary";
import cnr from "@/utils/class_resolver/cnr";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <div className={styles.dashboard}>
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
  );
}
