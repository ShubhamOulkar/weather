import IconCopy from "@/assets/images/icon-copy.svg?react";
import { useToast } from "@/context/toast/ToastContext";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard/useCopyToClipboard";
import { useShareUrl } from "@/hooks/useShareUrl/useShareUrl";
import cnr from "@/utils/class_resolver/cnr";
import style from "./CopyBtn.module.css";

export default function CopyBtn() {
  const { urlToShare } = useShareUrl();
  const { addToast } = useToast();

  const { copied, copyText } = useCopyToClipboard({
    onSuccess: () => addToast("URL copied!", "success"),
    onError: () => addToast("Failed to copy URL.", "error"),
  });

  const handleClick = () => {
    copyText(urlToShare);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cnr("flex flexcenter share_fav_btn pad-0", style[copied])}
      title="Copy URL"
      aria-label="Copy URL"
    >
      <IconCopy />
    </button>
  );
}
