import { useRef, useState } from "react";
import IconCopy from "@/assets/images/icon-copy.svg?react";
import { useToast } from "@/context/toast/ToastContext";
import { useShareUrl } from "@/hooks/useShareUrl/useShareUrl";
import cnr from "@/utils/class_resolver/cnr";
import style from "./CopyBtn.module.css";

type CopyState = "default" | "copied" | "failed";

export default function CopyBtn() {
  const [copied, setCopied] = useState<CopyState>("default");
  const { urlToShare } = useShareUrl();
  const { addToast } = useToast();
  const timer = useRef<NodeJS.Timeout | null>(null);

  const copyUrl = async () => {
    if (timer.current) clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(urlToShare);
      setCopied("copied");
      addToast("Url copied!", "success");
      timer.current = setTimeout(() => setCopied("default"), 3000);
    } catch (error) {
      console.error(error);
      setCopied("failed");
      addToast("Failed to copy url.", "error");
    }
  };

  return (
    <button
      type="button"
      onClick={copyUrl}
      className={cnr("flex flexcenter share_fav_btn pad-0", style[copied])}
      title="copy url"
      aria-label="copy url"
      aria-live="polite"
    >
      <IconCopy />
    </button>
  );
}
