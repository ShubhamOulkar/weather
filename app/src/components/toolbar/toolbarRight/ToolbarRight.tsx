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
import IconErr from "../../../assets/images/icon-error.svg?react"

export function ToolbarRight() {
    const { open, setOpen, toggle } = useToggle()
    const { data, ipData, ipLoading, isIpError } = useLocation()
    const { date } = data!
    const { nodeRef, userRef } = useDismissalOutside<HTMLDivElement, HTMLButtonElement>({
        onDismissalEvent: () => setOpen(false)
    })

    const checker = () => {
        if(isIpError) return 'Error in Ip fetching'
        return ipData?.country
    }

    return <div className={cnr('flex', 'gap-1rem', 'flexcenter', styles.toolbar_right_container)} >
        <FavoriteLocationDropdown />
        <p title={checker()} className={cnr('flex', 'flexcenter', 'gap-0_3', styles.user_time_country)}>
            <LoaderWrapper isLoading={ipLoading} loaderClass="loader-sm">
                <time dateTime={date.date.toISOString()} aria-label={`${date.time} in ${ipData?.country}`}>{date.time} | </time>
                {isIpError ? <IconErr aria-label={checker()}/> : <span aria-label={`${ipData?.country} (${ipData?.country_code})`}>{ipData?.country_icon}</span>}
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