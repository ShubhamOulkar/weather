import cnr from "../../../utils/class_resolver/cnr"

interface LoaderWrapperProps {
  isLoading?: boolean
  loaderClass?: string
  children?: React.ReactNode
}

export default function LoaderWrapper({
  isLoading,
  loaderClass,
  children
}: LoaderWrapperProps) {

  if(isLoading) {
    return <span className={cnr("loader", loaderClass)} aria-hidden="true" />
  }
  return <>{children}</>
}
