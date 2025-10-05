import { useState, useCallback } from 'react';
import IconFavorite from "../../../assets/images/icon-favorite.svg?react"
import styles from "./FavoriteBtn.module.css"
import { useLocation } from "../../../context/location/Location"
import { useFavorites } from "../../../context/favoritesLocation/FavoritesContext"
import cnr from '../../../utils/class_resolver/cnr';

export default function FavoritesBtn() {
    const { data: weatherData } = useLocation()
    const { addFavorite, favorites, hydrated } = useFavorites()

    // State to trigger the animation
    const [isAnimating, setIsAnimating] = useState(false);

    // Check if weatherData has the necessary coordinates and place name
    const isValidLocation = weatherData?.latitude && weatherData?.longitude && weatherData?.place;

    const isAlreadyFavorite = favorites.some(
        fav => (
            fav.lat === weatherData?.latitude &&
            fav.lon === weatherData?.longitude
        )
    )

    const handleAddFavorite = useCallback(() => {
        if (!isValidLocation || isAlreadyFavorite) return;

        addFavorite({
            name: weatherData.place,
            lat: weatherData.latitude,
            lon: weatherData.longitude,
        });

        setIsAnimating(true);
        const timer = setTimeout(() => {
            setIsAnimating(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [addFavorite, weatherData, favorites]);

    const title = isAlreadyFavorite ? "Already in favorites" : "Add current location to favorites"

    return (
        <button
            className={styles.favorite_btn}
            type="button"
            title={title}
            aria-label={title}
            onClick={handleAddFavorite}
            disabled={isAlreadyFavorite || !isValidLocation}>
            <IconFavorite className={cnr(isAlreadyFavorite && styles.itsFav, isAnimating && styles.addingFav)} />
        </button>
    )
}