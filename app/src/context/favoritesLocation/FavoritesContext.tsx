import { createContext, useState, useEffect, useContext, useCallback, useMemo, type ReactNode } from "react";
import type { FavoriteLocation } from "../../types/types";

interface FavoritesContextType {
    favorites: FavoriteLocation[];
    addFavorite: (newLocation: FavoriteLocation) => void;
    removeFavorite: (lat: number, lon: number) => void;
}

const FAVORITES_STORAGE_KEY = import.meta.env.VITE_FAVORITES_STORAGE_KEY || 'weaAppFav';

if (FAVORITES_STORAGE_KEY === 'weaAppFav') {
    console.warn("VITE_FAVORITES_STORAGE_KEY environment variable not set, using default key.");
}


const getInitialFavorites = (): FavoriteLocation[] => {
    try {
        const item = localStorage.getItem(FAVORITES_STORAGE_KEY);
        // Ensure the return is an array, even if localStorage is empty or corrupted
        return item ? JSON.parse(item) : [];
    } catch (error) {
        console.error("Error reading localStorage for favorites:", error);
        return [];
    }
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<FavoriteLocation[]>(getInitialFavorites);

    useEffect(() => {
        try {
            localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
        } catch (error) {
            console.error("Error writing favorites to localStorage:", error);
        }
    }, [favorites]);

    const addFavorite = useCallback((newLocation: FavoriteLocation) => {
        setFavorites(prev => {
            const isDuplicate = prev.some(
                loc => loc.lat === newLocation.lat && loc.lon === newLocation.lon
            );
            if (isDuplicate) {
                return prev;
            }
            return [newLocation, ...prev];
        });
    }, [])

    const removeFavorite = useCallback((lat: number, lon: number) => {
        setFavorites(prev =>
            prev.filter(loc => !(loc.lat === lat && loc.lon === lon))
        );
    }, [])

    const contextValue = useMemo(() => ({
        favorites,
        addFavorite,
        removeFavorite,
    }), [favorites, addFavorite, removeFavorite]);

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