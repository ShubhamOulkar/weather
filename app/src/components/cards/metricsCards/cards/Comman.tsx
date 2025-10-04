import cnr from "../../../../utils/class_resolver/cnr"
import LoaderWrapper from "../../../common/LoderWrapper/LoaderWrapper";
import ErrorCard from "../../../common/errors/card/ErrorCard";

interface CommonMetricProps {
    classname: string;
    heading: string;
    isLoading: boolean;
    value: string;
    isError: boolean;
}

export default function CommonMetric({ classname, heading, isLoading, value, isError }: CommonMetricProps) {
    if (isError) return <ErrorCard />
    return <div className={cnr('flexcol', classname, 'card_design')}>
        <h5>{heading}</h5>
        <p>
            <LoaderWrapper isLoading={isLoading} loaderClass="loader-xs">
                {value}
            </LoaderWrapper>
        </p>
    </div>
}