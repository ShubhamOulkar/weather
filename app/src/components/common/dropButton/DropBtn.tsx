import { Activity } from "react";
import IconCheck from "@/assets/images/icon-checkmark.svg?react";
import cnr from "@/utils/class_resolver/cnr";
import styles from "./DropBtn.module.css";

interface DropBtnProps {
  classname?: string;
  btnTitle: string;
  onClick: () => void;
  showCheck: boolean;
}

export default function DropBtn({
  btnTitle,
  onClick,
  showCheck,
  classname,
}: DropBtnProps) {
  return (
    <button
      className={cnr(styles.drop_btn, classname)}
      type="button"
      onClick={onClick}
    >
      {btnTitle}
      <Activity mode={showCheck ? "visible" : "hidden"}>
        <IconCheck />
      </Activity>
    </button>
  );
}
