import type { CityData } from "../../types/types";

export default function formatBtnTitle(data: CityData): string {
    if (data.state === undefined) return `${data.name}, ${data.countryCode}`;
    return `${data.name}, ${data.state}, ${data.countryCode}`;
};