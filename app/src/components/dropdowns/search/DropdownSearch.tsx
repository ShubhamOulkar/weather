import cnr from "../../../utils/cnr"
import styles from "./DropdownSearch.module.css"

interface CompArg {
    dropdown: boolean
}

export default function DropdownSearch({ dropdown }: CompArg) {
    return <div className={cnr('scroll', styles.drop_places, dropdown ? 'show' : 'hidden')}>
        <ul role="list">
            <li>City name</li>
            <li>City name</li>
        </ul>
    </div>
}