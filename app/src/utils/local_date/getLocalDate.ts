import type { FormattedDateParts } from "../../types/types";

/**
 * Parses a date string or Date and returns formatted components, including time.
 * Defaults to the current date if no valid value is provided.
 */
export function getLocalDate(
    dateStr?: string | Date,
    format?: Intl.DateTimeFormatOptions,
    locale: string | string[] = "en-US",
    timezone: string = Intl.DateTimeFormat().resolvedOptions().timeZone
): FormattedDateParts {
    let date: Date;

    if (!dateStr) {
        date = new Date();
    } else {
        date = new Date(dateStr);
        if (isNaN(date.getTime())) {
            console.error(
                `getLocalDate received an invalid date string: ${dateStr}. Falling back to current date.`
            );
            date = new Date();
        }
    }

    const baseOptions: Intl.DateTimeFormatOptions = { timeZone: timezone, ...format };

    // Helper to format a specific part cleanly
    const formatter = (opts: Intl.DateTimeFormatOptions): string =>
        new Intl.DateTimeFormat(locale, { ...baseOptions, ...opts }).format(date);

    const fullOptions: Intl.DateTimeFormatOptions = {
        weekday: format?.weekday || "long",
        month: format?.month || "short",
        day: format?.day || "numeric",
        year: format?.year || "numeric",
        timeZone: timezone,
    };

    const time = new Intl.DateTimeFormat(locale, {
        ...baseOptions,
        hour: "2-digit",
        hour12: true,
    }).format(date);

    return {
        date: date,
        weekday: formatter({ weekday: format?.weekday || "long" }),
        day: formatter({ day: format?.day || "numeric" }),
        month: formatter({ month: format?.month || "short" }),
        year: formatter({ year: format?.year || "numeric" }),
        fullDate: new Intl.DateTimeFormat(locale, fullOptions).format(date),
        time,
    };
}
