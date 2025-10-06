import { useState, useEffect, type ChangeEvent, type FormEvent, type KeyboardEventHandler } from "react"
import IconSearch from "../../assets/images/icon-search.svg?react"
import IconLocation from "../../assets/images/icon-location.svg?react"
import IconError from "../../assets/images/icon-error.svg?react"
import DropdownSearch from "../dropdowns/search/DropdownSearch"
import cnr from "../../utils/class_resolver/cnr"
import { useDismissalOutside } from "../../hooks/useDismissalOutside/useDismissalOutside"
import styles from "./Search.module.css"
import { useLocation } from "../../context/location/Location"
import { SearchSchema } from "../../validation/searchValidation"
import { useGpsLocation } from "../../hooks/useGpsLocation/useGpsLocation"
import { useLiveSearch } from "../../hooks/useLiveSearch/useLiveSearch"
import type { Cooradinates } from "../../types/types"
import { useToggle } from "../../hooks/useToggle/useToggle"
import SpeechRecognitionMic from "../common/speechrecognition/SpeechRecognitionMic"
import { useToast } from "../../context/toast/ToastContext"

export default function SearchForm() {
    const { addToast } = useToast()
    const { open, setOpen } = useToggle()
    const [search, setSearch] = useState("")
    const [validateSearch, setValidateSearch] = useState("")
    const { setLocation } = useLocation()
    const [error, setError] = useState<string | null>(null)
    const { coord, gpsErr, getLocation } = useGpsLocation()
    // debounce search
    const { data: liveData, isFetching, flush } = useLiveSearch(validateSearch)

    const { nodeRef, userRef } = useDismissalOutside<HTMLDivElement, HTMLDivElement>({
        onDismissalEvent: () => setOpen(false),
    })

    const handlerGpsLocation = () => {
        getLocation()
        setError(null)
    }

    useEffect(() => {
        if (coord) {
            setLocation({ coords: coord })
        }
    }, [coord, setLocation])

    // this error should be set on toast not on search error
    useEffect(() => {
        if (gpsErr) addToast(gpsErr)
    }, [gpsErr])

    const handleSubmit = (e: FormEvent) => {
        console.log("handleSubmit")
        e.preventDefault()
        // get latest debounced value
        flush()
        // clear previous errors 
        setError(null)
        // validate
        const results = SearchSchema.safeParse({ search: search })

        if (!results.success) {
            const errMsg = results.error.issues[0].message
            setError(errMsg)
            return
        }

        // on validation success
        setSearch("")
        setLocation({ city: search })
        setError(null)
        setValidateSearch("")
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        console.log("handleChange", newValue)
        setOpen(true)
        // clear previous errors 
        setError(null)
        // set new value 
        setSearch(newValue)
        // validate
        const results = SearchSchema.safeParse({ search: newValue })

        if (!results.success) {
            const errMsg = results.error.issues[0].message
            setError(errMsg)
            setValidateSearch("")
            return
        }

        setValidateSearch(newValue)
        setError(null)
    }

    // set search field and close drop down
    const handleSelect = (place: string, coords: Cooradinates) => {
        setSearch(place)
        setLocation({
            city: place,
            coords: coords
        })
        setOpen(false)
    }

    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
        // If the Escape key is pressed, close the dropdown
        if (e.key === 'Escape') {
            setOpen(false)
            e.preventDefault()
        }

        // if the enter key pressed open the dropdown if it is closed
        if (e.key === 'Enter' && !open) setOpen(true)
    }

    return <search className={styles.form_container}>
        <form onSubmit={handleSubmit}
            className={cnr('flexcol', styles.search_form)} >
            <div title="search"
                className={cnr(styles.search_container, error && styles.input_error)}>
                {error && (
                    <p
                        className={cnr('flex', 'flexcenter', 'gap-0_3', styles.error)}
                        aria-label={`${error}`}
                        role="alert"
                        aria-live="polite"
                        title="error"
                    >
                        <IconError
                            aria-hidden="true"
                            width={12} height={12}
                            fill="white" />
                        {error}
                    </p>
                )}
                <div ref={userRef}
                    className={cnr('flex', styles.input_container)} >
                    <label htmlFor="search">
                        <IconSearch aria-hidden="true" />
                        <span className="sr_only">Search for a place</span>
                    </label>

                    <input
                        type="search"
                        id="search"
                        name="search"
                        value={search}
                        placeholder="Search for place..."
                        onFocus={() => setOpen(true)}
                        onKeyDown={handleKeyDown}
                        onChange={handleChange}
                        role="combobox"
                        aria-autocomplete="list"
                        aria-haspopup="listbox"
                        aria-expanded={open}
                        aria-controls="searchDropdown"
                        autoComplete="off" />

                    <SpeechRecognitionMic
                        setOpen={setOpen}
                        setSearch={setSearch}
                        setValidateSearch={setValidateSearch} />
                </div>
                <DropdownSearch id="searchDropdown"
                    dismissRef={nodeRef}
                    dropdown={open}
                    searchData={liveData}
                    isLoading={isFetching}
                    onSelect={handleSelect} />
            </div>
            <div className={cnr('flex', 'gap-1rem', styles.form_btn_container)}>
                <button type="submit" title="search location">Search</button>
                <button type="button"
                    className="flex flexcenter"
                    onClick={handlerGpsLocation}
                    title="use my location"
                    aria-label="use GPS location">
                    <IconLocation /> Locate me
                </button>
            </div>
        </form>
    </search>
}