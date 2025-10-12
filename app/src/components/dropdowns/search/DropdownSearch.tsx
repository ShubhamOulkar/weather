import type { Ref } from "react";
import { useState } from "react";
import IconError from "../../../assets/images/icon-error.svg?react";
import IconLoading from "../../../assets/images/icon-loading.svg?react";
import type { CityData, Cooradinates } from "../../../types/types";
import cnr from "../../../utils/class_resolver/cnr";
import formatBtnTitle from "../../../utils/formatBtnTitle/formatBtnTitle";
import DropBtn from "../../common/dropButton/DropBtn";
import styles from "./DropdownSearch.module.css";

export interface DropdownSearchProps {
  id: string;
  dismissRef: Ref<HTMLDivElement>;
  dropdown: boolean;
  searchData?: CityData[];
  isLoading: boolean;
  onSelect: (place: string, coords: Cooradinates) => void;
}

export default function DropdownSearch({
  id,
  dismissRef,
  dropdown,
  searchData,
  isLoading,
  onSelect,
}: DropdownSearchProps) {
  const [selectedPlace, setSelectedPlace] = useState<number | null>(null);
  const handleClick = (title: string, coords: Cooradinates, i: number) => {
    onSelect(title, coords);
    setSelectedPlace(i);
  };
  return (
    <div
      id={id}
      ref={dismissRef}
      role="listbox"
      aria-label="list of places"
      aria-hidden={!dropdown}
      aria-live="polite"
      className={cnr(
        "scroll",
        "dropdown", "left-0",
        dropdown ? "show" : "hidden",
      )}
    >
      <ul>
        {!isLoading && searchData === undefined && (
          <li className={cnr(styles.message)} role="status">
            Search format e.g. Mumbai, MH, IN
          </li>
        )}

        {isLoading && (
          <li className={cnr(styles.message)} role="status">
            <span className={styles.loading_spinner}>
              <IconLoading aria-hidden="true" />
            </span>
            Finding...
          </li>
        )}

        {!isLoading && searchData?.length === 0 && (
          <li className={cnr(styles.message, styles.alert)} role="alert">
            <IconError width={12} fill="currentColor" /> Place not found
          </li>
        )}

        {!isLoading &&
          searchData?.map((btn, i) => {
            const title = formatBtnTitle(btn);
            return (
              <li key={`${btn.name}-${i}`} role="option">
                <DropBtn
                  classname={styles.search_btn}
                  btnTitle={title}
                  onClick={() => handleClick(title, btn.coords, i)}
                  showCheck={selectedPlace === i}
                />
              </li>
            );
          })}
      </ul>
    </div>
  );
}
