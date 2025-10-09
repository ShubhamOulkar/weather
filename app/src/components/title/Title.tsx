import classes from "./Title.module.css";

export default function Title() {
  return (
    <h1 className={classes.title}>
      How's the <span>sky looking</span> <span>today?</span>
    </h1>
  );
}
