import type { ComponentType, RefObject, SVGProps } from "react";
import DropIcon from "../../../assets/images/icon-dropdown.svg?react";
import cnr from "../../../utils/class_resolver/cnr";
import styles from "./Button.module.css";

interface ButtonProps {
  btnTitle: string;
  BtnIcon?: ComponentType<SVGProps<SVGSVGElement>>;
  userRef: RefObject<HTMLButtonElement | null>;
  onClickHandler: () => void;
  state: boolean;
  ariaControls: string;
  styleType: "unit" | "day";
}

export default function Button({
  btnTitle,
  BtnIcon,
  userRef,
  onClickHandler,
  state,
  ariaControls,
  styleType,
}: ButtonProps) {
  return (
    <button
      ref={userRef}
      type="button"
      className={cnr(styles[styleType], styles.btn)}
      onClick={onClickHandler}
      role="combobox"
      aria-controls={ariaControls}
      aria-haspopup="listbox"
      aria-expanded={state}
      aria-label={btnTitle}
    >
      {BtnIcon && <BtnIcon aria-hidden="true" />}
      {btnTitle}
      <DropIcon aria-hidden="true" />
    </button>
  );
}
