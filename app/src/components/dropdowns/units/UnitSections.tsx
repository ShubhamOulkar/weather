import { memo } from "react";
import DropBtn from "../../common/dropButton/DropBtn";
import styles from "./UnitsDropdown.module.css";

interface UnitsSectionsArg {
  title: string;
  unit1: string;
  unit2: string;
  setUnit: () => void;
  showCheck: boolean;
}

function UnitsSections({
  title,
  unit1,
  unit2,
  setUnit,
  showCheck,
}: UnitsSectionsArg) {
  return (
    <div className={styles.unit_sections}>
      <li>
        <p className={styles.unit_title}>{title}</p>
      </li>
      <li>
        <DropBtn btnTitle={unit1} onClick={setUnit} showCheck={showCheck} />
      </li>
      <li>
        <DropBtn btnTitle={unit2} onClick={setUnit} showCheck={!showCheck} />
      </li>
    </div>
  );
}

export const SubUnitSections = memo(UnitsSections, (p, n) => {
  return p.showCheck === n.showCheck;
});
