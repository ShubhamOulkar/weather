import classes from "./Toolbar.module.css";
import { ToolbarRight } from "./toolbarRight/ToolbarRight";

export default function Toolbar() {
  return (
    <header className={classes.toolbar}>
      <picture title="Weather now logo">
        <source srcSet="/logo.svg" media="(min-width: 768px)" />
        <img src="/logo-small.svg" alt="Weather Now" />
      </picture>
      <ToolbarRight />
    </header>
  );
}
