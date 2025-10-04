import getAqiIndex from "../../../../utils/getAqiIndex/getAqiIndex"
import { useAQI } from "../../../../hooks/useAQI/useAQI";
import cnr from "../../../../utils/class_resolver/cnr";
import LoaderWrapper from "../../../common/LoderWrapper/LoaderWrapper";
import AQILabel from "../../../common/aqiLabel/AqiLabel";

interface AQIProp {
    latitude: number;
    longitude: number;
    classname: string;
}

export default function AQICard({ latitude, longitude, classname }: AQIProp) {
    const { data: aqi, isFetching: isAqiLoading } = useAQI({ latitude: latitude, longitude: longitude });
    const index = getAqiIndex(aqi)
    return <div className={cnr('flexcol', classname, 'card_design')}>
        <h3 className="flex flex-bet">
            AQI
            <LoaderWrapper isLoading={isAqiLoading} loaderClass="loader-xs">
                <AQILabel index={index!} />
            </LoaderWrapper>
        </h3>
        <p>
            <LoaderWrapper isLoading={isAqiLoading} loaderClass="loader-xs">
                {index?.value || 'N/A'}
            </LoaderWrapper>
        </p>
    </div>
}