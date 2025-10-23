import { Activity } from "react";
import {
  LinkedinIcon,
  LinkedinShareButton,
  TwitterShareButton,
  XIcon,
} from "react-share";
import IconShare from "@/assets/images/icon-share.svg?react";
import CopyBtn from "@/components/common/copyBtn/CopyBtn";
import { useDismissalOutside } from "@/hooks/useDismissalOutside/useDismissalOutside";
import { useShareUrl } from "@/hooks/useShareUrl/useShareUrl";
import { useToggle } from "@/hooks/useToggle/useToggle";
import style from "./Share.module.css";

export default function Share() {
  const { open, toggle, setOpen, activityMode } = useToggle();

  const { nodeRef: menuRef, userRef: buttonRef } = useDismissalOutside<
    HTMLDivElement,
    HTMLButtonElement
  >({ onDismissalEvent: () => setOpen(false) });

  const { title, urlToShare, place } = useShareUrl();

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
        title={`share ${place} weather`}
        aria-label={`share ${place} weather`}
      >
        <IconShare />
      </button>
      <Activity mode={activityMode}>
        <div
          ref={menuRef}
          id="shareDropdown"
          role="menu"
          className="dropdown right-80"
          aria-hidden={!open}
        >
          <ul className="flex gap-1rem flexcenter pad-0">
            <li role="menuitem">
              <CopyBtn />
            </li>
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
      </Activity>
    </div>
  );
}
