import type { Dispatch, SetStateAction } from "react";
import { Activity } from "react";
import Button from "@/components/common/button/Button";
import DropBtn from "@/components/common/dropButton/DropBtn";
import { useDismissalOutside } from "@/hooks/useDismissalOutside/useDismissalOutside";
import { useToggle } from "@/hooks/useToggle/useToggle";
import cnr from "@/utils/class_resolver/cnr";
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
  const { open, setOpen, toggle, activityMode } = useToggle();

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

      <Activity mode={activityMode}>
        <div
          ref={nodeRef}
          id="daysList"
          role="listbox"
          className="dropdown right-0"
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
      </Activity>
    </div>
  );
}
