import cnr from "../../../../utils/class_resolver/cnr";
import ErrorCard from "../../../common/errors/card/ErrorCard";
import LoaderWrapper from "../../../common/LoderWrapper/LoaderWrapper";

interface CommonMetricProps {
  classname: string;
  heading: string;
  isLoading: boolean;
  value: string;
  isError: boolean;
}

export default function CommonMetric({
  classname,
  heading,
  isLoading,
  value,
  isError,
}: CommonMetricProps) {
  if (isError) return <ErrorCard />;
  return (
    <div className={cnr("flexcol", classname, "card_design")}>
      <h3>{heading}</h3>
      <p>
        <LoaderWrapper isLoading={isLoading} loaderClass="loader-xs">
          {value}
        </LoaderWrapper>
      </p>
    </div>
  );
}
