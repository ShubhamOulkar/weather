import IconMicOff from "../../../assets/images/icon-mic-off.svg?react";
import IconMic from "../../../assets/images/icon-mic-on.svg?react";
import { useToast } from "../../../context/toast/ToastContext";
import { useSpeechRecognitionNative } from "../../../hooks/useSpeechRecognition/useSpeechRecognition";
import styles from "./SpeechRecognition.module.css";

interface SpeechRecognitionMicProps {
  setOpen: (value: boolean) => void;
  setSearch: (value: string) => void;
  setValidateSearch: (value: string) => void;
}

export default function SpeechRecognitionMic({
  setOpen,
  setSearch,
  setValidateSearch,
}: SpeechRecognitionMicProps) {
  const { addToast } = useToast();

  const { startListening, stopListening, listening } =
    useSpeechRecognitionNative({
      setSearch,
      setValidatedSearch: setValidateSearch,
    });

  const handleClick = () => {
    if (
      !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      addToast("Speech recognition not supported in this browser.", "error");
      return;
    }

    if (listening) {
      stopListening();
      addToast("Stopped listening.", "info");
    } else {
      setOpen(true);
      addToast("Listening...", "info");
      startListening();
    }
  };

  return (
    <div className={styles.micContainer}>
      <button
        type="button"
        onClick={handleClick}
        className="flex flexcenter"
        aria-live="polite"
        aria-label={
          listening ? "Stop speech recognition" : "Start speech recognition"
        }
        title={
          listening ? "Stop Speech Recognition" : "Start Speech Recognition"
        }
      >
        {listening ? (
          <IconMicOff width={20} height={20} />
        ) : (
          <IconMic width={20} height={20} />
        )}
      </button>
    </div>
  );
}
