import Logo from "@/components/common/logo/Logo";
import cnr from "@/utils/class_resolver/cnr";
import FavoriteLocationDropdown from "../dropdowns/favoriteLocation/FavoriteLocation";
import UnitsDropdown from "../dropdowns/units/UnitsDropdown";
import IpLookUp from "./ipLookUp/IpLookUp";
import styles from "./Toolbar.module.css";

export default function Toolbar() {
  return (
    <header className={styles.toolbar}>
      <Logo />
      <div
        className={cnr(
          "flex",
          "gap-1rem",
          "flexcenter",
          styles.toolbar_right_container,
        )}
      >
        <FavoriteLocationDropdown />
        <IpLookUp />
        <UnitsDropdown />
      </div>
    </header>
  );
}
