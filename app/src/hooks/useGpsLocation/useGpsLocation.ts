import { useCallback, useState } from "react";
import type { GpsState } from "../../types/types";

/**
 * Custom hook for manual GPS location fetching.
 * The location lookup is only triggered when the returned getLocation() function is called.
 */
export function useGpsLocation() {
  const [state, setState] = useState<GpsState>({
    coord: undefined,
    gpsErr: null,
    gpsLoading: false,
  });

  const getLocation = useCallback(() => {
    if (!("geolocation" in navigator)) {
      setState((prev) => ({ ...prev, error: "Geolocation not supported" }));
      return;
    }

    // Start loading and reset previous errors/coords
    setState((prev) => ({
      ...prev,
      gpsLoading: true,
      gpsErr: null,
      coord: undefined,
    }));

    const options: PositionOptions = {
      enableHighAccuracy: true, // Test TODO: might use more battery and gps resourses on a mobile
      timeout: 30000, // 30 seconds max time to wait for a fix, mobile needs more time
      maximumAge: 0, // do not use cache position
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Success: Update coordinates and stop loading
        setState({
          coord: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          gpsErr: null,
          gpsLoading: false,
        });
      },
      (error) => {
        // Error: Determine specific error message
        let errorMessage: string;
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "Access denied: Please enable location services for this site.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out (10s limit).";
            break;
          default:
            errorMessage = `An unknown error occurred: ${error.message}`;
        }
        // Update error state and stop loading
        setState((prev) => ({
          ...prev,
          gpsErr: errorMessage,
          gpsLoading: false,
        }));
      },
      options,
    );
  }, []);

  return { ...state, getLocation };
}
