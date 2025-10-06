import styles from "./UnitsDropdown.module.css"
import DropBtn from "../../common/dropButton/DropBtn";
import { memo } from "react";

interface UnitsSectionsArg {
    title: string;
    unit1: string;
    unit2: string;
    unit1Setter: () => void;
    unit2Setter: () => void;
    showCheck: boolean;
}

function UnitsSections({ title, unit1, unit2, unit1Setter, unit2Setter, showCheck }: UnitsSectionsArg) {
    return <div className={styles.unit_sections}>
        <li><p className={styles.unit_title}>{title}</p></li>
        <li><DropBtn btnTitle={unit1} onClick={unit1Setter} showCheck={showCheck} /></li>
        <li><DropBtn btnTitle={unit2} onClick={unit2Setter} showCheck={!showCheck} /></li>
    </div>
}

export const SubUnitSections = memo(UnitsSections, (p, n) => {
    return p.showCheck === n.showCheck
})