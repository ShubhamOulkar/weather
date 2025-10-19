import IconDelete from "../../../assets/images/icon-delete.svg?react";
import IconFavorite from "../../../assets/images/icon-favorite.svg?react";
import { useFavorites } from "../../../context/favoritesLocation/FavoritesContext";
import { useLocation } from "../../../context/location/Location";
import { useDismissalOutside } from "../../../hooks/useDismissalOutside/useDismissalOutside";
import { useToggle } from "../../../hooks/useToggle/useToggle";
import type { FavoriteLocation } from "../../../types/types";
import cnr from "../../../utils/class_resolver/cnr";
import DropBtn from "../../common/dropButton/DropBtn";
import style from "./FavoriteLocation.module.css";

export default function FavoriteLocationDropdown() {
  const { open, setOpen, toggle } = useToggle();
  const { favorites, removeFavorite } = useFavorites();
  const { data: currentLocation, setLocation } = useLocation();

  const { nodeRef, userRef } = useDismissalOutside<
    HTMLDivElement,
    HTMLButtonElement
  >({
    onDismissalEvent: () => setOpen(false),
  });

  const handleSelectFavorite = (location: FavoriteLocation) => {
    setLocation({
      city: location.name,
      coords: { latitude: location.lat, longitude: location.lon },
    });
  };

  const handleRemoveFavorite = (
    e: React.MouseEvent,
    lat: number,
    lon: number,
  ) => {
    e.stopPropagation();
    removeFavorite(lat, lon);
  };

  const hasFavorites = favorites.length > 0;
  const favoriteCount = favorites.length;

  const isLocationSelected = (loc: FavoriteLocation) => {
    return (
      currentLocation.latitude === loc.lat &&
      currentLocation.longitude === loc.lon
    );
  };

  return (
    <div className={style.fav_container}>
      <button
        role="combobox"
        aria-autocomplete="list"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="favoriteDropdown"
        aria-label={`Favorite Locations. Currently ${favoriteCount} saved.`}
        className="flex flexcenter share_fav_btn"
        type="button"
        ref={userRef}
        onClick={toggle}
      >
        <IconFavorite />

        <span
          className={cnr("flex", "flexcenter", style.fav_count_badge)}
          aria-hidden="true"
          title={`${favoriteCount} favorites saved`}
        >
          {favoriteCount}
        </span>
      </button>

      <div
        id="favoriteDropdown"
        role="listbox"
        aria-label="list of places"
        aria-hidden={!open}
        aria-live="polite"
        className={cnr(open ? "show" : "hidden", style.fav_loc_drop)}
        ref={nodeRef}
      >
        <ul>
          {hasFavorites ? (
            favorites.map((loc) => (
              <li
                key={`${loc.lat}-${loc.lon}`}
                role="option"
                className="flex"
                onClick={() => handleSelectFavorite(loc)}
              >
                <DropBtn
                  btnTitle={loc.name}
                  onClick={() => handleSelectFavorite(loc)}
                  showCheck={isLocationSelected(loc)}
                  classname={style.favorite_dropdown_btn}
                />
                <button
                  type="button"
                  title={`Remove ${loc.name} from favorites`}
                  aria-label={`Remove ${loc.name} from favorites`}
                  className={style.remove_btn}
                  onClick={(e) => handleRemoveFavorite(e, loc.lat, loc.lon)}
                >
                  <IconDelete />
                </button>
              </li>
            ))
          ) : (
            <li role="status" className={style.empty_msg}>
              No favorites saved.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
