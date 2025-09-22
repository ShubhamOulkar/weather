import IconCheck from "../../../assets/images/icon-checkmark.svg?react"
import styles from "./DropBtn.module.css"

interface DropBtnProps {
    btnTitle: string;
}

export default function DropBtn({btnTitle}: DropBtnProps) {
    return < button
        className={styles.drop_btn}
        type="button" >
        {btnTitle}
        < IconCheck />
    </button >
}