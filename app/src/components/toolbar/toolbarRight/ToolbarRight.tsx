import IconUnits from "../../../assets/images/icon-units.svg?react"
import Button from "../../common/button/Button"
import UnitsDropdown from "../../dropdowns/units/UnitsDropdown"
import classes from "./ToolbarRight.module.css"
import { useState } from "react"
import { useDismissalOutside } from "../../../hooks/useDismissalOutside"

export function ToolbarRight() {
    const [open, setOpen] = useState(false)

    const showDropdown = () => setOpen(!open)

    const { nodeRef, userRef } = useDismissalOutside<HTMLDivElement, HTMLButtonElement>({
        onDismissalEvent: () => setOpen(false)
    })

    return <div className={classes.toolbar_right_container} >
        <Button
            btnTitle="Units"
            BtnIcon={IconUnits}
            userRef={userRef}
            onClickHandler={showDropdown}
            state={open}
            ariaControls="unitsList" 
            styleType="unit"/>
        <UnitsDropdown id="unitsList" dismissRef={nodeRef} open={open} />
    </div>
}