import type { LoggerOptions } from "../../types/types";

export const logger = {
  error: (message: string, options?: LoggerOptions) => {
    const prefix = options?.context
      ? `[Weather Logger: ${options.context}]`
      : "[Weather Logger]";
    options?.error
      ? console.error(`${prefix} ${message}`, options.error.message)
      : console.error(`${prefix} ${message}`);
  },
};
