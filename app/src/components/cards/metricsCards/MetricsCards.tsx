import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { useLocation } from "../../../context/location/Location";
import { useUnits } from "../../../context/unitsSystem/UnitsSystem";
import cnr from "../../../utils/class_resolver/cnr";
import ErrorCard from "../../common/errors/card/ErrorCard";
import { ErrorBoundary } from "../../common/errors/ErrorBoundary/ErrorBoundary";
import AQICard from "./cards/AQI";
import CommonMetric from "./cards/Comman";
import styles from "./MetricsCard.module.css";

export default function MetricsCards() {
  const { data, isLoading, isIpError, isWeatherError } = useLocation();
  const { getTemp, getPrecipitation, getWind } = useUnits();
  const isError = isIpError || isWeatherError;

  return (
    <div className={cnr("grid_container", styles.metrics_container)}>
      <CommonMetric
        heading={data.metrics[0].key}
        value={getTemp(data.metrics[0].value)}
        classname={styles.metric_card}
        isLoading={isLoading}
        isError={isError}
      />
      <CommonMetric
        heading={data.metrics[1].key}
        value={`${data.metrics[1].value} %`}
        classname={styles.metric_card}
        isLoading={isLoading}
        isError={isError}
      />
      <CommonMetric
        heading={data.metrics[2].key}
        value={getWind(data.metrics[2].value)}
        classname={styles.metric_card}
        isLoading={isLoading}
        isError={isError}
      />
      <CommonMetric
        heading={data.metrics[3].key}
        value={getPrecipitation(data.metrics[3].value)}
        classname={styles.metric_card}
        isLoading={isLoading}
        isError={isError}
      />
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary reset={reset} fallback={<ErrorCard retry={true} />}>
            <AQICard
              latitude={data.latitude}
              longitude={data.longitude}
              classname={styles.metric_card}
            />
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </div>
  );
}
