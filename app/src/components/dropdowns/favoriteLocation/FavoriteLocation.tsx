import { useState } from "react"
import { useDismissalOutside } from "../../../hooks/useDismissalOutside/useDismissalOutside"
import IconFavorite from "../../../assets/images/icon-favorite.svg?react"
import cnr from "../../../utils/class_resolver/cnr"
import style from "./FavoriteLocation.module.css"
import DropBtn from "../../common/dropButton/DropBtn"

export default function FavoriteLocationDropdown() {
    const [open, setOpen] = useState(false)

    const { nodeRef, userRef } = useDismissalOutside<HTMLDivElement, HTMLButtonElement>({
        onDismissalEvent: () => setOpen(false)
    })

    const showFavorites = () => setOpen(!open)
    return <div className={style.fav_container}>
        <button
            role="combobox"
            aria-autocomplete="list"
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls="favoriteDropdown"
            className={cnr('flex', 'flexcenter', style.tool_fav_btn)}
            type="button" ref={userRef}
            onClick={showFavorites}>
            <IconFavorite />
        </button>
        <div
            id="favoriteDropdown"
            role="listbox"
            aria-label="list of places"
            aria-hidden={!open}
            aria-live="polite"
            className={cnr(open ? "show" : "hidden", style.fav_loc_drop)}
            ref={nodeRef}>
            <ul role="list">
                <li role="status">No favorites</li>
            </ul>
        </div>
    </div>
}

