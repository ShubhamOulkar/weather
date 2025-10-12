import { useCallback } from "react";
import {
  LinkedinIcon,
  LinkedinShareButton,
  TwitterShareButton,
  XIcon,
} from "react-share";
import { useLocation } from "../../context/location/Location";
import { useDismissalOutside } from "../../hooks/useDismissalOutside/useDismissalOutside";
import { useToggle } from "../../hooks/useToggle/useToggle";
import cnr from "../../utils/class_resolver/cnr";
import style from "./Share.module.css";

export default function ShareOnTwitter() {
  const { open, toggle, setOpen } = useToggle();
  const { nodeRef, userRef } = useDismissalOutside<
    HTMLDivElement,
    HTMLButtonElement
  >({
    onDismissalEvent: () => setOpen(false),
  });
  const {
    data: { place, temp, wmo },
  } = useLocation();

  const title = useCallback(() => {
    const title = encodeURIComponent(`Todays weather at ${place} is ${temp}.`);
    return title;
  }, [place, temp]);

  const urlToShare = useCallback(() => {
    const href = window.location.href;
    return `${href}weather?name=${encodeURIComponent(place)}&temp=${encodeURIComponent(temp.toFixed())}&wmo=${encodeURIComponent(wmo)}`;
  }, [place, temp, wmo]);

  return (
    <div className={style.share_container}>
      <button
        type="button"
        ref={userRef}
        onClick={toggle}
        className="btn"
        role="combobox"
        aria-autocomplete="list"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="shareDropdown"
      >
        Share
      </button>
      <div
        ref={nodeRef}
        id="shareDropdown"
        role="listbox"
        className={cnr(open ? "show" : "hidden", "dropdown", "left-0")}
        aria-hidden={!open}
        aria-live="polite"
      >
        <ul className="flex gap-1rem flexcenter pad-0">
          <li>
            <TwitterShareButton
              title={title()}
              url={urlToShare()}
              className="flex flexcenter"
              htmlTitle="share on X"
              aria-label="share on X"
            >
              <XIcon size="32" borderRadius={16} />
            </TwitterShareButton>
          </li>
          <li>
            <LinkedinShareButton
              title={title()}
              url={urlToShare()}
              htmlTitle="share on linkedIn"
              className="flex flexcenter"
              aria-label="share on linkedIn"
            >
              <LinkedinIcon size="32" borderRadius={16} />
            </LinkedinShareButton>
          </li>
        </ul>
      </div>
    </div>
  );
}
