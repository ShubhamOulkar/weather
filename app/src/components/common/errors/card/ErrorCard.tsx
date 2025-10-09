import IconErr from "../../../../assets/images/icon-error.svg?react";
import IconRetry from "../../../../assets/images/icon-retry.svg?react";
import cnr from "../../../../utils/class_resolver/cnr";
import style from "./ErrorCard.module.css";

interface ReusableErrorProps {
  /** Single or multiple error objects */
  error?: Error | (Error | null)[];
  /** Whether to show a retry button */
  retry?: boolean;
  /** Handler for retry/refetch */
  onRetry?: () => void;
  isLoading?: boolean;
}

export default function ErrorCard({
  error,
  retry = false,
  onRetry,
  isLoading,
}: ReusableErrorProps) {
  const errors = Array.isArray(error) ? error : error ? [error] : [];

  const err = errors.length === 0;

  return (
    <div
      role="alert"
      className={cnr(
        err ? "flex" : "flexcol",
        "flexcenter",
        "gap-1rem",
        err && style.error_card,
      )}
    >
      {err && <IconErr width={30} height={30} />}

      {!err &&
        errors.map((err, i) => (
          <p key={i} className="text-center">
            {err?.name}: {err?.message}
          </p>
        ))}

      {retry && (
        <button
          onClick={onRetry}
          className="flex flexcenter retry_btn gap-1rem"
        >
          {isLoading ? "Retrying..." : !err ? "Retry" : ""}{" "}
          <IconRetry aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
