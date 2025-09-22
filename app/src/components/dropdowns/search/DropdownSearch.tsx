import type { Ref } from "react";
import cnr from "../../../utils/class_resolver/cnr"
import DropBtn from "../../common/dropButton/DropBtn";
import styles from "./DropdownSearch.module.css"

interface CompArg {
    id: string;
    dismissRef: Ref<HTMLDivElement>;
    dropdown: boolean;
}

export default function DropdownSearch({ id, dismissRef, dropdown }: CompArg) {
    // TODO: close the drop down if place is selected by user, outside dismissal stops closing 
    return <div id={id}
        ref={dismissRef}
        role="listbox"
        aria-label="list of places"
        aria-hidden={!dropdown}
        aria-live="polite"
        className={cnr('scroll', styles.drop_places, dropdown ? 'show' : 'hidden')}>
        <ul role="list">
            <li><DropBtn btnTitle="City name"/></li>
            <li><DropBtn btnTitle="City name"/></li>
        </ul>
    </div>
}