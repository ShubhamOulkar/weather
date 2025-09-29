import type { FormattedDateParts } from "../../types/types";

/**
 * Parses a date string and returns separate formatted components.
 * Defaults to the current date if no valid string is provided.
 * 
 * @param dateStr An optional date string (e.g., from an API).
 * @param locale The desired locale (e.g., 'fr-FR', 'en-US'). Defaults to user's system locale.
 * @returns An object containing the formatted date parts.
 */
export function getLocalDate(dateStr?: string, format?: Intl.DateTimeFormatOptions, locale: string | string[] = 'en-US'): FormattedDateParts {
    let date: Date;

    if (!dateStr) {
        date = new Date();
    } else {
        date = new Date(dateStr);

        if (isNaN(date.getTime())) {
            console.error(`getLocalDate received an invalid date string: ${dateStr}. Falling back to current date.`);
            date = new Date();
        }
    }

    const options: Intl.DateTimeFormatOptions = { timeZone: 'UTC' };

    // format a specific part
    const formatter = (part: Intl.DateTimeFormatOptions): string => {
        return date.toLocaleDateString(locale, { ...options, ...part });
    };

    const fullOptions: Intl.DateTimeFormatOptions = {
        weekday: format?.weekday || 'long',
        month: format?.month || 'short',
        day: format?.day || 'numeric',
        year: format?.year || "numeric"
    };


    return {
        date: date,
        weekday: formatter({ weekday: format?.weekday || 'long' }),
        day: formatter({ day: format?.day || 'numeric' }),
        month: formatter({ month: format?.month || 'short' }),
        year: formatter({ year: format?.year || 'numeric' }),
        fullDate: date.toLocaleDateString(locale, fullOptions),
    };
}
