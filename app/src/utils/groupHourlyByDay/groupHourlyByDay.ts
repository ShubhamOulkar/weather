import type { HourlyWeather, HourlyByDay, HourlyEntry } from "../../types/types";
import { getLocalDate } from "../local_date/getLocalDate";

/**
 * Groups raw hourly weather data by day.
 * @param hourlyData Hourly weather data from API
 * @param timezone Optional timezone for formatting times (default: 'UTC')
 * @returns Hourly data grouped by full date
 */
export function groupHourlyByDay(hourlyData: HourlyWeather): HourlyByDay {
    const grouped: HourlyByDay = { weekDays: [] };

    if (!hourlyData.timezone || !hourlyData.temperature_2m || !hourlyData.weather_code) {
        return grouped;
    }

    for (let i = 0; i < hourlyData.time.length; i++) {
        const dateObj = hourlyData.time[i];
        const temp = hourlyData.temperature_2m[i];
        const code = hourlyData.weather_code[i];

        const { weekday, time } = getLocalDate(dateObj, undefined, 'en-US', hourlyData.timezone);

        const hourEntry: HourlyEntry = {
            time,
            temperature: Math.round(temp),
            weather_code: code,
        };

        if (!grouped[weekday]) {
            grouped[weekday] = [];
        }
        
        !grouped.weekDays.includes(weekday) && grouped.weekDays.push(weekday)
        grouped[weekday].push(hourEntry);
    }

    return grouped;
}
