/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />


interface ImportMetaEnv {
  // Weather API Keys/IDs
  readonly VITE_OPEN_WEATHER_MAP_ID: string;

  // API Endpoints/URLs
  readonly VITE_REVESE_GEOCODING: string;
  readonly VITE_GEOCODING_NAME: string;
  readonly VITE_IP_LOOKUP: string;
  readonly VITE_OPEN_METEO_WEATHER: string;
  readonly VITE_OPEN_METEO_AQI: string;
  readonly VITE_OPEN_METEO_DAILY: string;
  readonly VITE_OPEN_METEO_HOURLY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}