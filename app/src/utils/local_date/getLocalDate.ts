import type { FormattedDateParts } from "../../types/types";

/**
 * Parses a date string and returns separate formatted components, including time.
 * Defaults to the current date if no valid string is provided.
 * 
 * @param dateStr An optional date string (e.g., from an API).
 * @param format Optional Intl.DateTimeFormatOptions for customizing date parts.
 * @param locale The desired locale (default: 'en-US').
 * @param timezone The desired timezone (default: 'UTC').
 * @returns An object containing the formatted date parts and time.
 */
export function getLocalDate(dateStr?: string | Date,
    format?: Intl.DateTimeFormatOptions,
    locale: string | string[] = 'en-US',
    timezone: string = 'UTC'
): FormattedDateParts {
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

    const options: Intl.DateTimeFormatOptions = { timeZone: timezone };

    // format a specific part
    const formatter = (part: Intl.DateTimeFormatOptions): string => {
        return date.toLocaleDateString(locale, { ...options, ...part });
    };

    const fullOptions: Intl.DateTimeFormatOptions = {
        weekday: format?.weekday || 'long',
        month: format?.month || 'short',
        day: format?.day || 'numeric',
        year: format?.year || "numeric",
    };

    const time = date.toLocaleTimeString(locale, {
        ...options,
        hour: '2-digit',
        hour12: true
    });

date.toLocaleTimeString
    return {
        date: date,
        weekday: formatter({ weekday: format?.weekday || 'long' }),
        day: formatter({ day: format?.day || 'numeric' }),
        month: formatter({ month: format?.month || 'short' }),
        year: formatter({ year: format?.year || 'numeric' }),
        fullDate: date.toLocaleDateString(locale, fullOptions),
        time: time,
    };
}
