import { useMemo } from "react";
import {
  LinkedinIcon,
  LinkedinShareButton,
  TwitterShareButton,
  XIcon,
} from "react-share";
import { useLocation } from "@/context/location/Location";
import { useUnits } from "@/context/unitsSystem/UnitsSystem";
import { useDismissalOutside } from "@/hooks/useDismissalOutside/useDismissalOutside";
import { useToggle } from "@/hooks/useToggle/useToggle";
import cnr from "@/utils/class_resolver/cnr";
import { convertTemperature } from "@/utils/valueConversion/helpers";
import style from "./Share.module.css";

export default function ShareOnTwitter() {
  const { open, toggle, setOpen } = useToggle();
  const { nodeRef: menuRef, userRef: buttonRef } = useDismissalOutside<
    HTMLDivElement,
    HTMLButtonElement
  >({ onDismissalEvent: () => setOpen(false) });
  const {
    unitSystem: { temperature: unit },
  } = useUnits();

  const {
    data: { place, temp, wmo },
  } = useLocation();

  const title = useMemo(
    () =>
      `Today's weather at ${place} is ${convertTemperature(temp, unit).join("")}.`,
    [place, temp, unit],
  );

  const urlToShare = useMemo(() => {
    const href = window.location.href;
    return `${href}api/weather-card?name=${encodeURIComponent(place)}&temp=${temp.toFixed()}&wmo=${wmo}`;
  }, [place, temp, wmo]);

  const handleShareClick = () => setOpen(false);

  return (
    <div className={style.share_container}>
      <button
        type="button"
        ref={buttonRef}
        onClick={toggle}
        className="btn"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="shareDropdown"
      >
        Share
      </button>

      <div
        ref={menuRef}
        id="shareDropdown"
        role="menu"
        className={cnr(open ? "show" : "hidden", "dropdown", "left-0")}
        aria-hidden={!open}
      >
        <ul className="flex gap-1rem flexcenter pad-0">
          <li role="menuitem">
            <TwitterShareButton
              title={title}
              url={urlToShare}
              className="flex flexcenter"
              htmlTitle="Share on X"
              aria-label="Share on X"
              onClick={handleShareClick}
            >
              <XIcon size={32} borderRadius={16} />
            </TwitterShareButton>
          </li>
          <li role="menuitem">
            <LinkedinShareButton
              title={title}
              url={urlToShare}
              htmlTitle="Share on LinkedIn"
              className="flex flexcenter"
              aria-label="Share on LinkedIn"
              onClick={handleShareClick}
            >
              <LinkedinIcon size={32} borderRadius={16} />
            </LinkedinShareButton>
          </li>
        </ul>
      </div>
    </div>
  );
}
