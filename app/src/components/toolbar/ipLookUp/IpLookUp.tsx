import { useEffect, useEffectEvent } from "react";
import IconErr from "@/assets/images/icon-error.svg?react";
import LoaderWrapper from "@/components/common/LoderWrapper/LoaderWrapper";
import { useLocation } from "@/context/location/Location";
import { useToast } from "@/context/toast/ToastContext";
import { useIpLookUp } from "@/hooks/useIpLookUp/useIpLookUp";
import cnr from "@/utils/class_resolver/cnr";
import { getLocalDate } from "@/utils/local_date/getLocalDate";
import { logger } from "@/utils/logger/logger";
import styles from "./IpLookUp.module.css";

export default function IpLookUp() {
  const { storeIpData } = useLocation();
  const { addToast } = useToast();
  const noteToast = useEffectEvent(() => {
    addToast("Error: Ip look up 👻", "error");
  });
  const date = getLocalDate(undefined, { minute: "2-digit" });
  const {
    data: ipData,
    isSuccess,
    isLoading: ipLoading,
    isError: isIpError,
    error: ipError,
  } = useIpLookUp();

  useEffect(() => {
    if (isSuccess) storeIpData(ipData);
  }, [isSuccess, ipData, storeIpData]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: noteToast is a stable useEffectEvent
  useEffect(() => {
    if (isIpError && ipError) {
      logger.error("IP lookup failed", {
        context: "query useIpLookup hook",
        error: ipError,
      });
      noteToast();
    }
  }, [isIpError, ipError]);

  const checker = () => {
    if (isIpError) return "Error in Ip fetching";
    return `${ipData?.country}, ${ipData?.country_code}`;
  };

  return (
    <p
      title={checker()}
      className={cnr("flex", "flexcenter", "gap-0_3", styles.user_time_country)}
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
  );
}
