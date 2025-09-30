import LocationCard from "../cards/locationCard/LocationCard"
import MetricsCards from "../cards/metricsCards/MetricsCards"

export default function LocationAndMetrics() {
    
    return <div className="flexcol">
        <LocationCard />
        <MetricsCards />
    </div>
}