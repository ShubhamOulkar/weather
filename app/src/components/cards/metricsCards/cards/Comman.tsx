import cnr from "../../../../utils/class_resolver/cnr"
import LoaderWrapper from "../../../common/loderWrapper/LoaderWrapper";

interface CommonMetricProps {
    classname: string;
    heading: string;
    isLoading: boolean;
    value: string;
}

export default function CommonMetric({ classname, heading, isLoading, value }: CommonMetricProps) {
    return <div className={cnr('flexcol', classname, 'card_design')}>
        <h5>{heading}</h5>
        <p>
            <LoaderWrapper isLoading={isLoading} loaderClass="loader-xs">
                {value}
            </LoaderWrapper>
        </p>
    </div>
}