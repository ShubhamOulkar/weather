import IconUnits from "../../../assets/images/icon-units.svg?react"
import DropIcon from "../../../assets/images/icon-dropdown.svg?react"
import classes from "./ToolbarRight.module.css"

export function ToolbarRight() {
    return <div className={classes.toolbar_right_container} >
        <button type="button" className={classes.tool_unitsbtn}>
            <IconUnits />
            Units
            <DropIcon />
        </button>
    </div>
}