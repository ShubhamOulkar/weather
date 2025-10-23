import IconErr from "@/assets/images/icon-error.svg?react";
import LoaderWrapper from "@/components/common/LoderWrapper/LoaderWrapper";
import FavoriteLocationDropdown from "@/components/dropdowns/favoriteLocation/FavoriteLocation";
import UnitsDropdown from "@/components/dropdowns/units/UnitsDropdown";
import { useLocation } from "@/context/location/Location";
import cnr from "@/utils/class_resolver/cnr";
import styles from "./ToolbarRight.module.css";

export function ToolbarRight() {
  const { data, ipData, ipLoading, isIpError } = useLocation();
  const { date } = data;

  const checker = () => {
    if (isIpError) return "Error in Ip fetching";
    return ipData?.country;
  };

  return (
    <div
      className={cnr(
        "flex",
        "gap-1rem",
        "flexcenter",
        styles.toolbar_right_container,
      )}
    >
      <FavoriteLocationDropdown />
      <p
        title={checker()}
        className={cnr(
          "flex",
          "flexcenter",
          "gap-0_3",
          styles.user_time_country,
        )}
      >
        <LoaderWrapper isLoading={ipLoading} loaderClass="loader-sm">
          <time
            dateTime={date.date.toISOString()}
            aria-label={`${date.time} in ${ipData?.country}`}
          >
            {date.time} |{" "}
          </time>
          {isIpError ? (
            <IconErr aria-label={checker()} />
          ) : (
            <span aria-label={`${ipData?.country} (${ipData?.country_code})`}>
              {ipData?.country_icon}
            </span>
          )}
        </LoaderWrapper>
      </p>
      <UnitsDropdown />
    </div>
  );
}
