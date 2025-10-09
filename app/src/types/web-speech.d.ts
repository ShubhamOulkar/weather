// --- Web Speech API typings (custom global augmentation) ---
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;

  onaudiostart?: (this: SpeechRecognition, ev: Event) => void;
  onsoundstart?: (this: SpeechRecognition, ev: Event) => void;
  onspeechstart?: (this: SpeechRecognition, ev: Event) => void;
  onspeechend?: (this: SpeechRecognition, ev: Event) => void;
  onsoundend?: (this: SpeechRecognition, ev: Event) => void;
  onaudioend?: (this: SpeechRecognition, ev: Event) => void;
  onresult?: (this: SpeechRecognition, ev: SpeechRecognitionEvent) => void;
  onnomatch?: (this: SpeechRecognition, ev: SpeechRecognitionEvent) => void;
  onerror?: (this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => void;
  onstart?: (this: SpeechRecognition, ev: Event) => void;
  onend?: (this: SpeechRecognition, ev: Event) => void;
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
  addFromString(src: string, weight?: number): void;
}

// --- Constructor types for runtime usage ---
declare var SpeechRecognition: {
  prototype: SpeechRecognition;
  new (): SpeechRecognition;
};

declare var webkitSpeechRecognition: {
  prototype: SpeechRecognition;
  new (): SpeechRecognition;
};

declare var SpeechGrammarList: {
  prototype: SpeechGrammarList;
  new (): SpeechGrammarList;
};

declare var webkitSpeechGrammarList: {
  prototype: SpeechGrammarList;
  new (): SpeechGrammarList;
};

// --- Extend window type ---
interface Window {
  SpeechRecognition?: typeof SpeechRecognition;
  webkitSpeechRecognition?: typeof webkitSpeechRecognition;
  SpeechGrammarList?: typeof SpeechGrammarList;
  webkitSpeechGrammarList?: typeof webkitSpeechGrammarList;
}
