export interface IpData {
    success: boolean,
    country: string,
    country_code: string,
    timezone: { id: string, current_time: string },
    message: string | null,
    capital: string
}

export interface FormattedDateParts {
    date: Date;
    weekday: string;
    day: string;
    month: string;
    year: string;
    fullDate: string;
    time: string;
}


export interface LookUpReturn {
    capital?: string;
    country?: string;
    date?: FormattedDateParts
}

export interface Cooradinates {
    latitude: number;
    longitude: number
}

export interface LocationInput {
    city?: string;
    coords?: Cooradinates;
}

export interface CityData {
    coords: Cooradinates;
    countryCode: string;
    name: string;
    state?: string;
}

export interface LocQueryResults {
    ipErr: Error | null;
    locErr: Error | null;
    ipLoading: boolean;
    locLoading: boolean;
    latitude?: string | undefined;
    longitude?: string | undefined;
    capital?: string | undefined;
    country?: string | undefined;
    date?: string | undefined;
}

export interface GpsState {
    coord: Cooradinates | undefined;
    gpsErr: string | null;
    gpsLoading: boolean;
}

export interface OwmGeocodingResult {
    name: string;
    lat: number;
    lon: number;
    country: string;
    state?: string;
    local_names?: { [key: string]: string };
}

export type OwmGeocodingResponse = OwmGeocodingResult[];

export interface DailyData {
    weekday: string;
    max_temp: string;
    min_temp: string;
}

export interface HourlyWeather {
    time: Date[];
    temperature_2m: Float32Array<ArrayBufferLike> | null;
    weather_code: Float32Array<ArrayBufferLike> | null;
    timezone: string | null;
}

export interface HourlyEntry {
    time: string;
    temperature: number;
    weather_code: number;
}

interface HourlyWeatherIndex {
    [date: string]: HourlyEntry[];
}

export type HourlyByDay = HourlyWeatherIndex & {
    weekDays: string[];
};