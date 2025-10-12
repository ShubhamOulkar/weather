import type { Ref } from "react";
import { useCallback } from "react";
import { useUnits } from "../../../context/unitsSystem/UnitsSystem";
import cnr from "../../../utils/class_resolver/cnr";
import { SubUnitSections } from "./UnitSections";
import styles from "./UnitsDropdown.module.css";

interface CompArg {
  id: string;
  dismissRef: Ref<HTMLDivElement>;
  open: boolean;
}

export default function UnitsDropdown({ id, dismissRef, open }: CompArg) {
  const {
    unitSystem,
    toggleSystem,
    setPrecipitationUnit,
    setTemperatureUnit,
    setWindUnit,
  } = useUnits();

  const setTempC = useCallback(
    () => setTemperatureUnit("celsius"),
    [setTemperatureUnit],
  );
  const setTempF = useCallback(
    () => setTemperatureUnit("fahrenheit"),
    [setTemperatureUnit],
  );

  const setWindKmh = useCallback(() => setWindUnit("kmh"), [setWindUnit]);
  const setWindMph = useCallback(() => setWindUnit("mph"), [setWindUnit]);

  const setPrecMm = useCallback(
    () => setPrecipitationUnit("mm"),
    [setPrecipitationUnit],
  );
  const setPrecIn = useCallback(
    () => setPrecipitationUnit("inch"),
    [setPrecipitationUnit],
  );

  return (
    <div
      ref={dismissRef}
      id={id}
      role="listbox"
      className={cnr(open ? "show" : "hidden", "dropdown", "right-0")}
      aria-hidden={!open}
      aria-live="polite"
    >
      <ul className={styles.unit_sections}>
        <li>
          <button
            className={styles.unit_btn}
            type="button"
            onClick={toggleSystem}
          >
            Switch to {unitSystem.system === "metric" ? "Imperial" : "Metric"}
          </button>
        </li>

        <SubUnitSections
          title="Temperature"
          unit1="Celsius (°C)"
          unit2="Fahrenheit (°F)"
          unit1Setter={setTempC}
          unit2Setter={setTempF}
          showCheck={unitSystem.temperature === "celsius"}
        />

        <SubUnitSections
          title="Wind Speed"
          unit1="km/h"
          unit2="mph"
          unit1Setter={setWindKmh}
          unit2Setter={setWindMph}
          showCheck={unitSystem.wind === "kmh"}
        />

        <SubUnitSections
          title="Precipitation"
          unit1="Millimeters (mm)"
          unit2="Inches (in)"
          unit1Setter={setPrecMm}
          unit2Setter={setPrecIn}
          showCheck={unitSystem.precipitation === "mm"}
        />
      </ul>
    </div>
  );
}
