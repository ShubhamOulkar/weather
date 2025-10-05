import IconUnits from "../../../assets/images/icon-units.svg?react"
import Button from "../../common/button/Button"
import UnitsDropdown from "../../dropdowns/units/UnitsDropdown"
import styles from "./ToolbarRight.module.css"
import { useDismissalOutside } from "../../../hooks/useDismissalOutside/useDismissalOutside"
import { useLocation } from "../../../context/location/Location"
import cnr from "../../../utils/class_resolver/cnr"
import LoaderWrapper from "../../common/LoderWrapper/LoaderWrapper"
import FavoriteLocationDropdown from "../../dropdowns/favoriteLocation/FavoriteLocation"
import { useToggle } from "../../../hooks/useToggle/useToggle"
import { useEffect, useState } from "react"

export function ToolbarRight() {
    const { open, setOpen, toggle } = useToggle()
    const { data, ipData, ipLoading } = useLocation()
    const { nodeRef, userRef } = useDismissalOutside<HTMLDivElement, HTMLButtonElement>({
        onDismissalEvent: () => setOpen(false)
    })

    const [hydrated, setHydrated] = useState(false);
    useEffect(() => setHydrated(true), []);

    return <div className={cnr('flex', 'gap-1rem', 'flexcenter', styles.toolbar_right_container)} >
        <FavoriteLocationDropdown />
        <p title={ipData?.country} className={styles.user_time_country}>
            <LoaderWrapper isLoading={ipLoading} loaderClass="loader-sm">
                {hydrated ? (
                    <>
                        <time
                            dateTime={data.date.date.toISOString()}
                            aria-label={`${data.date.time} in ${ipData?.country}`}
                        >
                            {data.date.time} |{" "}
                        </time>
                        <span aria-label={`${ipData?.country} (${ipData?.country_code})`}>
                            {ipData?.country_icon}
                        </span>
                    </>
                ) : (
                    <time aria-hidden="true">--:-- |</time>
                )}
            </LoaderWrapper>
        </p>
        <Button
            btnTitle="Units"
            BtnIcon={IconUnits}
            userRef={userRef}
            onClickHandler={toggle}
            state={open}
            ariaControls="unitsList"
            styleType="unit" />
        <UnitsDropdown id="unitsList" dismissRef={nodeRef} open={open} />
    </div>
}