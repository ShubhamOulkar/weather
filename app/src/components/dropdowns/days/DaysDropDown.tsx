import cnr from "../../../utils/class_resolver/cnr"
import Button from "../../common/button/Button"
import DropBtn from "../../common/dropButton/DropBtn"
import { useDismissalOutside } from "../../../hooks/useDismissalOutside"
import styles from "./DaysDropDown.module.css"
import { useState } from "react"

export default function DaysDropDown() {
    const [open, setOpen] = useState(false)
    const days: string[] = ['Monday', 'Tuesday', 'Wednsday', 'Thusday', 'Friday', 'Saturday', 'Sun']
    const { nodeRef, userRef } = useDismissalOutside<HTMLDivElement, HTMLButtonElement>({
        onDismissalEvent: () => {
            setOpen(false)
        }
    })
    const showDropdown = () => setOpen(!open)

    return <div className={cnr('flex', styles.day_drop_down)}>
        <h4>Hourly forecast</h4>
        <Button
            btnTitle="Show today"
            userRef={userRef}
            onClickHandler={showDropdown}
            state={open}
            ariaControls="daysList"
            styleType="day" />

        <div ref={nodeRef}
            id="daysList"
            role="listbox"
            className={cnr(open ? 'show' : 'hidden', styles.listBox)}
            aria-hidden={!open}
            aria-live="polite">
            <ul>
                {
                    days.map(d => (
                        <li key={d}><DropBtn btnTitle={d} /></li>
                    ))
                }
            </ul>
        </div>
    </div>
}