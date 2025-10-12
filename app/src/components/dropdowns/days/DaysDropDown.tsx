import type { Dispatch, SetStateAction } from "react";
import { useDismissalOutside } from "../../../hooks/useDismissalOutside/useDismissalOutside";
import { useToggle } from "../../../hooks/useToggle/useToggle";
import cnr from "../../../utils/class_resolver/cnr";
import Button from "../../common/button/Button";
import DropBtn from "../../common/dropButton/DropBtn";
import styles from "./DaysDropDown.module.css";

interface DaysDropDown {
  weekDays: string[];
  today: number;
  setToday: Dispatch<SetStateAction<number>>;
}

export default function DaysDropDown({
  weekDays,
  today,
  setToday,
}: DaysDropDown) {
  const { open, setOpen, toggle } = useToggle();

  const { nodeRef, userRef } = useDismissalOutside<
    HTMLDivElement,
    HTMLButtonElement
  >({
    onDismissalEvent: () => {
      setOpen(false);
    },
  });

  return (
    <div className={cnr("flex", styles.day_drop_down)}>
      <h4>Hourly forecast</h4>
      <Button
        btnTitle={weekDays[today]}
        userRef={userRef}
        onClickHandler={toggle}
        state={open}
        ariaControls="daysList"
        styleType="day"
      />

      <div
        ref={nodeRef}
        id="daysList"
        role="listbox"
        className={cnr(open ? "show" : "hidden", "dropdown", "right-0")}
        aria-hidden={!open}
        aria-live="polite"
      >
        <ul className="pad-0">
          {weekDays.map((d, i) => (
            <li key={d}>
              <DropBtn
                btnTitle={d}
                onClick={() => setToday(i)}
                showCheck={today === i}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
