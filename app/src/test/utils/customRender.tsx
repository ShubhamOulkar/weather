import { render } from "@testing-library/react"
import type { ReactElement } from "react"
import AllProvider from "../../provider/AllProvider"

export function customRender(ui: ReactElement, options = {}) {
  return render(
    <AllProvider>{ui}</AllProvider>,
    options
  )
}

export * from "@testing-library/react"
