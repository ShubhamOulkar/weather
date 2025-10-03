import LoaderWrapper from "../loderWrapper/LoaderWrapper";
import { getWeatherIcon } from "../../../utils/getWeatherIcon/getWeatherIcon";

interface WeatherIcon {
    wmo: number;
    isLoading: boolean;
    loaderClass: string;
    iconClass?: string;
}

export default function WeatherIcon({ wmo, isLoading, loaderClass, iconClass }: WeatherIcon) {
    const icon = getWeatherIcon[wmo] || { file: "icon-sunny.webp", alt: "sunny" }

    return <LoaderWrapper isLoading={isLoading} loaderClass={loaderClass}>
        <img className={iconClass}
            src={`/icons/${icon.file}`}
            alt={icon.alt}
            title={icon.alt}
            loading="lazy" />
    </LoaderWrapper>
}