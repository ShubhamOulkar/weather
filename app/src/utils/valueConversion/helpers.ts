import type { UnitSystem } from "../../types/types";

const convertTemperature = (celsius: number, unit: UnitSystem["temperature"]): [number, string] => {
    if (unit === "fahrenheit") {
        // C to F: F = C * 1.8 + 32
        return [Math.round(celsius * 1.8 + 32), '°F'];
    }
    return [Math.round(celsius), '°C'];
};

const convertWindSpeed = (kmh: number, unit: UnitSystem["wind"]): [number, string] => {
    if (unit === 'mph') {
        // km/h to mph: mph = kmh / 1.60934
        return [Math.round(kmh / 1.60934), 'mph'];
    }
    return [Math.round(kmh), 'km/h'];
};

const convertPrecipitation = (mm: number, unit: UnitSystem["precipitation"]): [number, string] => {
    if (unit === 'inch') {
        // mm to inches: in = mm / 25.4
        return [Math.round(mm / 25.4), 'in'];
    }
    return [Math.round(mm), 'mm'];
};

export {
    convertTemperature,
    convertWindSpeed,
    convertPrecipitation,
}