// src/types/web-speech.d.ts

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;

  onaudiostart?: (this: SpeechRecognition, ev: Event) => any;
  onsoundstart?: (this: SpeechRecognition, ev: Event) => any;
  onspeechstart?: (this: SpeechRecognition, ev: Event) => any;
  onspeechend?: (this: SpeechRecognition, ev: Event) => any;
  onsoundend?: (this: SpeechRecognition, ev: Event) => any;
  onaudioend?: (this: SpeechRecognition, ev: Event) => any;
  onresult?: (this: SpeechRecognition, ev: SpeechRecognitionEvent) => any;
  onnomatch?: (this: SpeechRecognition, ev: SpeechRecognitionEvent) => any;
  onerror?: (this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any;
  onstart?: (this: SpeechRecognition, ev: Event) => any;
  onend?: (this: SpeechRecognition, ev: Event) => any;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultList {
  length: number;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechGrammarList {
  addFromString(string: string, weight?: number): void;
}

interface Window {
  webkitSpeechRecognition: typeof SpeechRecognition;
  webkitSpeechGrammarList: typeof SpeechGrammarList;
}
