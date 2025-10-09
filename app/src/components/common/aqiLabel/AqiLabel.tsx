import cnr from "../../../utils/class_resolver/cnr";
import styles from "./AqiLabel.module.css";

interface AQIProp {
  index: {
    label: string;
    value: number;
  } | null;
}

export default function AQILabel({ index }: AQIProp) {
  return (
    <span
      title={index?.label}
      className={cnr(styles.aqi, index && styles[index.label], styles.pulse)}
    >
      {index?.label}
    </span>
  );
}
