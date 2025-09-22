import styles from "./UnitsDropdown.module.css"
import cnr from "../../../utils/class_resolver/cnr";
import type { Ref } from "react";
import DropBtn from "../../common/dropButton/DropBtn";

interface CompArg {
    id: string;
    dismissRef: Ref<HTMLDivElement>;
    open: boolean;
}

export default function UnitsDropdown({ id, dismissRef, open }: CompArg) {

    return <div ref={dismissRef}
        id={id}
        role="listbox"
        className={cnr(open ? 'show' : 'hidden', styles.units_dropdown)}
        aria-hidden={!open}
        aria-live="polite">
        <ul className={styles.unit_sections}>
            <li><button className={styles.unit_btn} type="button">Switch to imperial</button></li>
            <UnitsSections title="Temperature" unit1="Celsius (°C)" unit2="Fahrenheit (°F)" />
            <UnitsSections title="Wind Speed" unit1="km/h" unit2="mph" />
            <UnitsSections title="Precipitation" unit1="Millimeters (mm)" unit2="Inches (in)" />
        </ul>
    </div>
}

interface UnitsSectionsArg {
    title: string;
    unit1: string;
    unit2: string;
}

function UnitsSections({ title, unit1, unit2 }: UnitsSectionsArg) {
    return <ul className={styles.unit_sections}>
        <li><p className={styles.unit_title}>{title}</p></li>
        <li><DropBtn btnTitle={unit1}/></li>
        <li><DropBtn btnTitle={unit2}/></li>
    </ul>
}