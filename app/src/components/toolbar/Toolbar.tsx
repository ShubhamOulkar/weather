import Logo from "../../assets/images/logo.svg?react"
import { ToolbarRight } from "./toolbarRight/ToolbarRight"
import classes from "./Toolbar.module.css"

export default function Toolbar() {
    return <header className={classes.toolbar}>
        <Logo className={classes.logo} />
        <ToolbarRight />
    </header>
}
