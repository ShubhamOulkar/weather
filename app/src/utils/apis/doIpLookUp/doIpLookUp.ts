import type { IpData, LookUpReturn } from "../../../types/types";

export const IP_LOOKUP_QUERY_KEY = ["ipLookup"];

/**
 * Fetches and processes IP lookup data for production use.
 * Implements robust error checking for network and API failures.
 * { country, success, message, country_code, capital}
 * @returns A promise that resolves to the structured LookUpReturn data.
 * @throws An Error if the fetch fails (network) or the API reports an error (business logic).
 */
export async function doIpLookUp(): Promise<LookUpReturn> {
    const url: string = import.meta.env.VITE_IP_LOOKUP;

    try {
        const res = await fetch(url, { method: 'GET' });

        // HTTP Status Check
        if (!res.ok) {
            throw new Error(`HTTP Error: Failed to fetch IP data. Status: ${res.status} ${res.statusText}`);
        }

        // Parse JSON Data
        const data: IpData = await res.json();

        // API check
        if (!data.success) {
            const apiMessage = data.message || 'Unknown API failure reported in response body.';
            throw new Error(`API Error: IP Lookup failed. Message: ${apiMessage}`);
        }

        // Data Transformation
        return {
            capital: data.capital,
            country: data.country,
        };

    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error(`An unexpected error occurred during the IP lookup process.`);
    }
}