import styles from "./MetricsCard.module.css"
import cnr from "../../../utils/cnr"

export default function MetricsCards() {
    const metrics: string[] = ['Feels Like', 'Humidity', 'Wind', 'Precipitation', 'AQI']
    const metricsVal: string[] = ['18', '46%', '60 km/h', '0 mm', 'low']
    
    return <div className={cnr('grid_container', styles.metrics_container)}>
        {
            metrics.map((m, i) => (
                <div className={cnr('flexcol', styles.metric_card, 'card_design')} key={m}>
                    <h5>{m}</h5>
                    <p>{metricsVal[i]}{i === 0 && <sup> o</sup>}</p>
                </div>
            ))
        }
    </div>
}