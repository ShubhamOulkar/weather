import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import type { FavoriteLocation } from "../../types/types";

interface FavoritesContextType {
  favorites: FavoriteLocation[];
  addFavorite: (newLocation: FavoriteLocation) => void;
  removeFavorite: (lat: number, lon: number) => void;
  hydrated: boolean;
}

const FAVORITES_STORAGE_KEY =
  import.meta.env.VITE_FAVORITES_STORAGE_KEY || "weaAppFav";

if (FAVORITES_STORAGE_KEY === "weaAppFav") {
  console.warn(
    "VITE_FAVORITES_STORAGE_KEY environment variable not set, using default key."
  );
}

// guard against SSR access
const safeLocalStorage = {
  getItem(key: string): string | null {
    if (typeof window === "undefined") return null;
    try {
      return localStorage.getItem(key);
    } catch (err) {
      console.error("Error reading from localStorage:", err);
      return null;
    }
  },
  setItem(key: string, value: string) {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(key, value);
    } catch (err) {
      console.error("Error writing to localStorage:", err);
    }
  },
};

const getInitialFavorites = (): FavoriteLocation[] => {
  const item = safeLocalStorage.getItem(FAVORITES_STORAGE_KEY);
  return item ? JSON.parse(item) : [];
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteLocation[]>(() =>
    typeof window === "undefined" ? [] : getInitialFavorites()
  );

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = getInitialFavorites();
    if (stored.length > 0) {
      setFavorites(stored);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    safeLocalStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = useCallback((newLocation: FavoriteLocation) => {
    setFavorites((prev) => {
      const isDuplicate = prev.some(
        (loc) => loc.lat === newLocation.lat && loc.lon === newLocation.lon
      );
      if (isDuplicate) return prev;
      return [newLocation, ...prev];
    });
  }, []);

  const removeFavorite = useCallback((lat: number, lon: number) => {
    setFavorites((prev) =>
      prev.filter((loc) => !(loc.lat === lat && loc.lon === lon))
    );
  }, []);

  const contextValue = useMemo(
    () => ({
      favorites,
      addFavorite,
      removeFavorite,
      hydrated
    }),
    [favorites, addFavorite, removeFavorite]
  );

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
}

/**
 * Hook to use the Favorites context
 * @returns FavoritesContextType
 */
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
