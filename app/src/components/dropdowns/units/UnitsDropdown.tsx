import { Activity } from "react";
import IconUnits from "@/assets/images/icon-units.svg?react";
import Button from "@/components/common/button/Button";
import { useUnits } from "@/context/unitsSystem/UnitsSystem";
import { useDismissalOutside } from "@/hooks/useDismissalOutside/useDismissalOutside";
import { useToggle } from "@/hooks/useToggle/useToggle";
import { SubUnitSections } from "./UnitSections";
import styles from "./UnitsDropdown.module.css";

export default function UnitsDropdown() {
  const { open, setOpen, toggle, activityMode } = useToggle();

  const { nodeRef, userRef } = useDismissalOutside<
    HTMLDivElement,
    HTMLButtonElement
  >({
    onDismissalEvent: () => setOpen(false),
  });

  const {
    unitSystem,
    toggleSystem,
    setPrecipitationUnit,
    setTemperatureUnit,
    setWindUnit,
  } = useUnits();

  const isCelsius = unitSystem.temperature === "celsius";
  const setTemp = () =>
    isCelsius
      ? setTemperatureUnit("fahrenheit")
      : setTemperatureUnit("celsius");

  const isKmh = unitSystem.wind === "kmh";
  const setWind = () => (isKmh ? setWindUnit("mph") : setWindUnit("kmh"));

  const isMM = unitSystem.precipitation === "mm";
  const setPrec = () =>
    isMM ? setPrecipitationUnit("inch") : setPrecipitationUnit("mm");

  return (
    <>
      <Button
        btnTitle="Units"
        BtnIcon={IconUnits}
        userRef={userRef}
        onClickHandler={toggle}
        state={open}
        ariaControls="unitsList"
        styleType="unit"
      />

      <Activity mode={activityMode}>
        <div
          ref={nodeRef}
          id="unitsList"
          role="listbox"
          className="dropdown right-0"
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
                Switch to{" "}
                {unitSystem.system === "metric" ? "Imperial" : "Metric"}
              </button>
            </li>

            <SubUnitSections
              title="Temperature"
              unit1="Celsius (°C)"
              unit2="Fahrenheit (°F)"
              setUnit={setTemp}
              showCheck={isCelsius}
            />

            <SubUnitSections
              title="Wind Speed"
              unit1="km/h"
              unit2="mph"
              setUnit={setWind}
              showCheck={isKmh}
            />

            <SubUnitSections
              title="Precipitation"
              unit1="Millimeters (mm)"
              unit2="Inches (in)"
              setUnit={setPrec}
              showCheck={isMM}
            />
          </ul>
        </div>
      </Activity>
    </>
  );
}
