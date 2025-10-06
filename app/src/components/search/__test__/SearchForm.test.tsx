import { vi, describe, it, expect, beforeEach } from "vitest"
import "@testing-library/jest-dom"
import { screen, fireEvent, waitFor, customRender as render, within } from "../../../test/utils/customRender"
import SearchForm from "../Search"
import * as gpsModule from "../../../hooks/useGpsLocation/useGpsLocation"

vi.mock("../../../hooks/useGpsLocation/useGpsLocation", () => ({
    useGpsLocation: vi.fn(() => ({
        coord: undefined,
        gpsErr: null,
        getLocation: vi.fn(),
        gpsLoading: false,
    })),
}))

vi.mock("../../../hooks/useLiveSearch/useLiveSearch", () => ({
    useLiveSearch: vi.fn((search: string) => ({
        data: search ? [{ place: search, coords: { latitude: 0, longitude: 0 } }] : [],
        isFetching: false,
        flush: vi.fn(),
    })),
}))

vi.mock("../../../context/toast/ToastContext", async (importOriginal) => {
    const actual = await importOriginal<typeof import("../../../context/toast/ToastContext")>()
    return {
        ...actual,
        useToast: vi.fn(() => ({ addToast: vi.fn() })),
    }
})

vi.mock("../../../components/dropdowns/search/DropdownSearch", () => ({
    default: (props: any) => {
        if (!props.dropdown) return null
        return (
            <div data-testid="dropdown">
                <button onClick={() => props.onSelect("London", { latitude: 51.5, longitude: -0.1 })}>
                    London
                </button>
            </div>
        )
    },
}))


vi.mock("../../../components/common/speechrecognition/SpeechRecognitionMic", () => ({
    default: vi.fn(({ setSearch }) => (
        <button
            type="button"
            data-testid="mic-button"
            onClick={() => setSearch("voice result")}
        >
            mocked-mic
        </button>
    )),
}))

describe("SearchForm", () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it("renders search input, buttons, and mic button", () => {
        render(<SearchForm />)

        expect(screen.getByRole("searchbox", { name: /search for a place/i })).toBeInTheDocument()
        expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument()
        expect(screen.getByRole("button", { name: /locate me/i })).toBeInTheDocument()
        expect(screen.getByTestId("mic-button")).toBeInTheDocument()
    })

    it("updates input value on typing and shows dropdown", async () => {
        render(<SearchForm />)

        const input = screen.getByRole("searchbox", { name: /search for a place/i })
        fireEvent.change(input, { target: { value: "Paris" } })

        expect(input).toHaveValue("Paris")

        await waitFor(() =>
            expect(screen.getByTestId("dropdown")).toBeInTheDocument()
        )
    })

    it("shows validation error when submitting empty input", async () => {
        render(<SearchForm />)
        const searchButton = screen.getByRole("button", { name: /search/i })
        fireEvent.click(searchButton)

        const alert = await screen.findByRole("alert")
        expect(alert).toBeInTheDocument()
        expect(alert).toHaveTextContent("The place name cannot be empty.")
    })

    it("handles voice input through mic button", async () => {
        render(<SearchForm />)
        const mic = screen.getByTestId("mic-button")
        fireEvent.click(mic)

        const input = screen.getByRole("searchbox", { name: /search for a place/i })
        expect(input).toHaveValue("voice result")
    })

    it("calls getLocation when GPS button clicked", () => {
        const mockGetLocation = vi.fn()
        vi.mocked(gpsModule.useGpsLocation).mockReturnValue({
            coord: { latitude: 51.5, longitude: -0.1 },
            gpsErr: null,
            getLocation: mockGetLocation,
            gpsLoading: false,
        })

        render(<SearchForm />)
        const locateBtn = screen.getByRole("button", { name: /locate me/i })
        fireEvent.click(locateBtn)

        expect(mockGetLocation).toHaveBeenCalled()
    })

    it("closes dropdown when Escape key is pressed", async () => {
        render(<SearchForm />)
        const input = screen.getByRole("searchbox", { name: /search for a place/i })
        fireEvent.change(input, { target: { value: "Paris" } })

        // Dropdown opens
        await waitFor(() => expect(screen.getByTestId("dropdown")).toBeInTheDocument())

        // Press Escape
        fireEvent.keyDown(input, { key: "Escape" })

        await waitFor(() =>
            expect(screen.queryByTestId("dropdown")).not.toBeInTheDocument()
        )

        expect(input).toHaveValue("Paris")
    })

    it("closes dropdown and updates input when an item is selected", async () => {
        render(<SearchForm />)
        const input = screen.getByRole("searchbox", { name: /search for a place/i })
        fireEvent.change(input, { target: { value: "London" } })

        // Get dropdown container
        const dropdown = await screen.findByTestId("dropdown")

        // Get the option inside the dropdown
        const option = within(dropdown).getByText("London")
        fireEvent.click(option)

        // Dropdown should close
        await waitFor(() =>
            expect(screen.queryByTestId("dropdown")).not.toBeInTheDocument()
        )

        expect(input).toHaveValue('')
    })
})
