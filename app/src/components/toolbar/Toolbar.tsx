import Logo from "@/components/common/logo/Logo";
import classes from "./Toolbar.module.css";
import { ToolbarRight } from "./toolbarRight/ToolbarRight";

export default function Toolbar() {
  return (
    <header className={classes.toolbar}>
      <Logo />
      <ToolbarRight />
    </header>
  );
}
