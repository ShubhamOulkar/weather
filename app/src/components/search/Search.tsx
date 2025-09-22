import { useState, type FormEvent, type KeyboardEventHandler } from "react"
import IconSearch from "../../assets/images/icon-search.svg?react"
import DropdownSearch from "../dropdowns/search/DropdownSearch"
import cnr from "../../utils/class_resolver/cnr"
import { useDismissalOutside } from "../../hooks/useDismissalOutside"
import styles from "./Search.module.css"

export default function SearchForm() {
    const [dropdown, setShowDropDown] = useState(false)

    const { nodeRef, userRef } = useDismissalOutside<HTMLDivElement, HTMLDivElement>({
        onDismissalEvent: () => setShowDropDown(false),
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
    }

    const showDropDown = () => setShowDropDown(true)

    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
        // If the Escape key is pressed, close the dropdown
        if (e.key === 'Escape' || e.key === ' ') {
            setShowDropDown(false)
            e.preventDefault()
        }

        // if the enter key pressed open the dropdown if it is closed
        if (e.key === 'Enter' && !dropdown) showDropDown()
    }

    return <search className={styles.form_container}>
        <form onSubmit={handleSubmit}
            className={cnr('flexcol', styles.search_form)}
        >
            <div className={styles.search_container}>
                <div ref={userRef}
                    className={cnr('flex', styles.input_container)} >
                    <label htmlFor="search">
                        <IconSearch aria-hidden="true" />
                        <span className="hidden">Search for a place</span>
                    </label>
                    <input
                        type="search"
                        id="search"
                        name="search"
                        placeholder="Search for a place..."
                        onFocus={showDropDown}
                        onKeyDown={handleKeyDown}
                        role="combobox"
                        aria-autocomplete="list"
                        aria-haspopup="listbox"
                        aria-expanded={dropdown}
                        aria-controls="searchDropdown"
                        autoComplete="off" />
                </div>
                <DropdownSearch id="searchDropdown" dismissRef={nodeRef} dropdown={dropdown}/>
            </div>
            <button type="submit">Search</button>
        </form>
    </search>
}