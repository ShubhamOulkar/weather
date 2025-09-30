import IconCheck from "../../../assets/images/icon-checkmark.svg?react"
import styles from "./DropBtn.module.css"
import cnr from "../../../utils/class_resolver/cnr";

interface DropBtnProps {
    classname?: string;
    btnTitle: string;
    onClick: () => void;
    showCheck: boolean;
}

export default function DropBtn({ btnTitle, onClick, showCheck, classname }: DropBtnProps) {
    return < button
        className={cnr(styles.drop_btn, classname)}
        type="button"
        onClick={onClick} >
        {btnTitle}
        <IconCheck className={showCheck ? 'show' : 'hidden'} />
    </button >
}