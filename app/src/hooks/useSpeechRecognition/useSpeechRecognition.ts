import { useCallback, useEffect, useRef, useState } from "react";

interface UseSpeechRecognitionNativeProps {
  setSearch: (value: string) => void;
  setValidatedSearch: (value: string) => void;
}

/**
 * A custom React hook that provides continuous speech recognition
 * using the **native Web Speech API** (`webkitSpeechRecognition`).
 *
 * This hook manages the entire speech recognition lifecycle —
 * including setup, start/stop control, cleanup, and automatic text updates.
 *
 * ### Features
 * - Uses native browser API (no dependencies)
 * - Continuous listening mode (updates live transcript as you speak)
 * - Safe initialization with feature detection
 * - Automatically cleans up on component unmount
 *
 * ### Browser Support
 * Works in browsers that implement the Web Speech API:
 * - ✅ Chrome (desktop & Android)
 * - ⚠️ Edge (Chromium-based)
 * - ⚠️ Safari (partial, experimental)
 * - ❌ Firefox (not supported)
 *
 * ### Example
 * ```tsx
 * const { startListening, stopListening, listening } = useSpeechRecognitionNative({
 *   setSearch: setQuery,
 *   setValidatedSearch: setFinalQuery,
 * });
 *
 * return (
 *   <button onClick={listening ? stopListening : startListening}>
 *     {listening ? "Stop" : "Start"} Listening
 *   </button>
 * );
 * ```
 *
 * @param {UseSpeechRecognitionNativeProps} props - Callbacks for updating transcript state.
 * @returns {{
 *   startListening: () => void;
 *   stopListening: () => void;
 *   listening: boolean;
 * }} Speech recognition controls and listening state.
 */

export function useSpeechRecognitionNative({
  setSearch,
  setValidatedSearch,
}: UseSpeechRecognitionNativeProps) {
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [listening, setListening] = useState(false);

  // Initialize the SpeechRecognition object
  const initRecognition = useCallback(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("SpeechRecognition API not supported in this browser.");
      return null;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.maxAlternatives = 1;

    return recognition;
  }, []);

  // Start recognition
  const startListening = useCallback(() => {
    let recognition = recognitionRef.current;

    if (!recognition) {
      recognition = initRecognition();
      if (!recognition) return;
      recognitionRef.current = recognition;
    }

    try {
      recognition.start();
      setListening(true);
    } catch (err) {
      console.warn("SpeechRecognition already started or not available:", err);
    }

    recognition.onstart = () => {
      console.log("SpeechRecognition started");
      setListening(true);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("")
        .trim();

      setSearch(transcript);
      setValidatedSearch(transcript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("SpeechRecognition error:", event.error);
      setListening(false);
    };

    recognition.onend = () => {
      console.log("SpeechRecognition ended");
      setListening(false);
    };
  }, [initRecognition, setSearch, setValidatedSearch]);

  // Stop recognition
  const stopListening = useCallback(() => {
    const recognition = recognitionRef.current;
    if (recognition) {
      recognition.stop();
      setListening(false);
    }
  }, []);

  // Cleanup when component unmounts
  useEffect(() => {
    return () => {
      const recognition = recognitionRef.current;
      if (recognition) recognition.stop();
    };
  }, []);

  return { startListening, stopListening, listening };
}
