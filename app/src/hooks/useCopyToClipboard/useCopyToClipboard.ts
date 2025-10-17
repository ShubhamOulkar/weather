import { useEffect, useRef, useState } from "react";

interface CopyOptions {
  resetAfter?: number; // default 3000ms
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

type CopyStatus = "idle" | "copied" | "failed";

export function useCopyToClipboard({
  resetAfter = 3000,
  onSuccess,
  onError,
}: CopyOptions = {}) {
  const [copied, setCopied] = useState<CopyStatus>("idle");
  const timer = useRef<number | null>(null);

  const copyText = async (text: string | undefined) => {
    if (
      !text ||
      typeof navigator === "undefined" ||
      !navigator.clipboard?.writeText
    ) {
      onError?.("Clipboard not supported or text missing");
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied("copied");
      onSuccess?.();

      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied("idle"), resetAfter);

      return true;
    } catch (error) {
      setCopied("failed");
      onError?.(error);
      return false;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timer.current) {
        window.clearTimeout(timer.current);
        timer.current = null;
      }
    };
  }, []);

  return { copied, copyText };
}
