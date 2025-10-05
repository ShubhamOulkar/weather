import { useEffect, useRef } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { SearchSchema } from "../../../validation/searchValidation";
import styles from "./SpeechRecognition.module.css";
import IconMic from "../../../assets/images/icon-mic-on.svg?react";
import IconMicOff from "../../../assets/images/icon-mic-off.svg?react";
import { useToast } from "../../../context/toast/ToastContext";

interface SpeechRecognitionMicProps {
    setOpen: (value: boolean) => void;
    setSearch: (value: string) => void;
    setError: (value: string | null) => void;
    setValidateSearch: (value: string) => void;
}

export default function SpeechRecognitionMic({
    setOpen,
    setSearch,
    setError,
    setValidateSearch,
}: SpeechRecognitionMicProps) {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
        isMicrophoneAvailable,
    } = useSpeechRecognition();

    const { addToast } = useToast();
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        if (listening) {
            setSearch(transcript);
            const result = SearchSchema.safeParse({ search: transcript });
            if (!result.success) {
                const errMsg = result.error.issues[0].message;
                setError(errMsg);
                setValidateSearch("");
                setOpen(false);
                resetTranscript();
                return;
            }
            setOpen(true)
            setValidateSearch(result.data.search)
        }
    }, [listening, transcript]);


    const startListening = () => {
        if (!browserSupportsSpeechRecognition) {
            addToast("Speech recognition is not supported in this browser.", "error");
            return;
        }

        if (!isMicrophoneAvailable) {
            addToast("Microphone is not available or permission denied.", "error");
            return;
        }

        addToast("Listening....", "info");
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true, language: "en-US" });

        // Auto stop after 10 seconds
        timeoutRef.current = setTimeout(() => {
            SpeechRecognition.stopListening()
        }, 10000); // 10 seconds
    };


    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <div className={styles.micContainer}>
            <button
                type="button"
                onClick={startListening}
                disabled={listening}
                className="flex flexcenter"
                aria-live="polite"
                aria-label={listening ? "Disabled can not use" : "Start speech recognition"}
                title={listening ? "Disabled" : "Start Speech Recognition"}
            >
                {listening ? <IconMicOff width={20} height={20} /> : <IconMic width={20} height={20} />}
            </button>
        </div>
    );
}
