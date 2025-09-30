import styles from "./MetricsCard.module.css"
import cnr from "../../../utils/class_resolver/cnr"
import LoaderWrapper from "../../common/LoderWrapper/LoaderWrapper";
import { useLocation } from "../../../context/location/Location";
import { useAQI } from "../../../hooks/useAQI/useAQI";
import getAqiIndex from "../../../utils/getAqiIndex/getAqiIndex";
import AQILabel from "../../common/aqiLabel/AqiLabel";

export default function MetricsCards() {
    const { data, isLoading } = useLocation()
    const { data: aqi, isFetching: isAqiLoading } = useAQI({ latitude: data.latitude, longitude: data.longitude });

    // Combine weather metrics and AQI
    const allMetrics = [
        ...data.metrics,
        { key: "AQI", value: aqi }
    ];

    return <div className={cnr('grid_container', styles.metrics_container)}>
        {
            allMetrics.map((m, i) => {
                if (m?.key === 'AQI') {
                    const index = getAqiIndex(m.value)
                    return (
                        <div className={cnr('flexcol', styles.metric_card, 'card_design')} key={`${m.key}-${i}`}>
                            <h5 className="flex flex-bet">{m.key}
                                <LoaderWrapper isLoading={isAqiLoading} loaderClass="loader-xs">
                                    <AQILabel index={index!} />
                                </LoaderWrapper>
                            </h5>
                            <p>
                                <LoaderWrapper isLoading={isAqiLoading} loaderClass="loader-xs">
                                    {index?.value || 'N/A'} ppm
                                </LoaderWrapper>
                            </p>
                        </div>
                    )
                } else {
                    return (
                        <div className={cnr('flexcol', styles.metric_card, 'card_design')} key={`${m.key}-${i}`}>
                            <h5>{m.key}</h5>
                            <p>
                                <LoaderWrapper isLoading={isLoading} loaderClass="loader-xs">
                                    {m.value || "N/A"}
                                </LoaderWrapper>
                            </p>
                        </div>
                    );
                }
            })
        }
    </div>
}