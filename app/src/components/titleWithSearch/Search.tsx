import { useState, type FormEvent } from "react"
import IconSearch from "../../assets/images/icon-search.svg?react"
import DropdownSearch from "../dropdowns/search/DropdownSearch"
import cnr from "../../utils/cnr"
import styles from "./Search.module.css"

export default function SearchForm() {
    const [dropdown, setShowDropDown] = useState(false)
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
    }

    const showDropdown = () => setShowDropDown(!dropdown)

    return <div className={styles.form_container}>
        <form onSubmit={handleSubmit} className={cnr('flexcol',styles.search_form)}>
            <div className={cnr('flex', styles.input_container)} tabIndex={0} onClick={showDropdown}>
                <label htmlFor="search">
                    <IconSearch aria-hidden="true" />
                    <span className="hidden">Search for a place</span>
                </label>
                <input type="search" id="search" name="search" placeholder="Search for a place..." />
                <DropdownSearch dropdown={dropdown}/>
            </div>
            <button type="submit">Search</button>
        </form>
    </div>
}