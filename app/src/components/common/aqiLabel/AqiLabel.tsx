import styles from "./AqiLabel.module.css"
import cnr from "../../../utils/class_resolver/cnr"

interface AQIProp {
    index: {
        label: string;
        value: number;
    }
}

export default function AQILabel({ index }: AQIProp) {
    return <span title={index?.label}
        className={cnr(styles.aqi, styles[index?.label!], styles.pulse)}
    >{index?.label}
    </span>
}