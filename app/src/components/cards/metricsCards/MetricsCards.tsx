import styles from "./MetricsCard.module.css"
import cnr from "../../../utils/class_resolver/cnr"
import { useLocation } from "../../../context/location/Location";
import AQICard from "./cards/AQI";
import { useUnits } from "../../../context/unitsSystem/UnitsSystem";
import CommonMetric from "./cards/Comman";

export default function MetricsCards() {
    const { data, isLoading } = useLocation()
    const { getTemp, getPrecipitation, getWind } = useUnits()

    return <div className={cnr('grid_container', styles.metrics_container)}>
        <CommonMetric
            heading={data.metrics[0].key}
            value={getTemp(data.metrics[0].value)}
            classname={styles.metric_card}
            isLoading={isLoading} />
        <CommonMetric
            heading={data.metrics[1].key}
            value={`${data.metrics[1].value} %`}
            classname={styles.metric_card}
            isLoading={isLoading} />
        <CommonMetric
            heading={data.metrics[2].key}
            value={getWind(data.metrics[2].value)}
            classname={styles.metric_card}
            isLoading={isLoading} />
        <CommonMetric
            heading={data.metrics[3].key}
            value={getPrecipitation(data.metrics[3].value)}
            classname={styles.metric_card}
            isLoading={isLoading} />
        <AQICard latitude={data.latitude} longitude={data.longitude} classname={styles.metric_card} />
    </div>
}