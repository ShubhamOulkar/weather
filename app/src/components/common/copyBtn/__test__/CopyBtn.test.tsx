import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import CopyBtn from "../CopyBtn";

// ---- Mocks ----

// Mock useToast
vi.mock("@/context/toast/ToastContext", () => ({
  useToast: () => ({
    addToast: vi.fn(),
  }),
}));

// Mock useShareUrl
vi.mock("@/hooks/useShareUrl/useShareUrl", () => ({
  useShareUrl: () => ({
    title: "Today's weather at Hupari is 30°C.",
    urlToShare: "https://example.com/test",
    place: "Hupari",
  }),
}));

// Mock SVG (handled globally, but safe fallback)
vi.mock("@/assets/images/icon-copy.svg?react", () => ({
  default: () => <svg data-testid="copy-icon" />,
}));

// Mock class_resolver
vi.mock("@/utils/class_resolver/cnr", () => ({
  __esModule: true,
  default: (...classes: string[]) => classes.join(" "),
}));

// Mock CSS module
vi.mock("../CopyBtn.module.css", () => ({
  default: {
    copied: "copied",
    failed: "failed",
  },
}));

describe("CopyBtn", () => {
  let writeTextMock: ReturnType<typeof vi.fn>;
  let addToastMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.useFakeTimers();

    writeTextMock = vi.fn();
    addToastMock = vi.fn();

    // Override the toast mock dynamically to expose addToastMock
    vi.doMock("@/context/toast/ToastContext", () => ({
      useToast: () => ({ addToast: addToastMock }),
    }));

    // Mock clipboard API
    Object.assign(navigator, {
      clipboard: { writeText: writeTextMock },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it("renders the button correctly", () => {
    render(<CopyBtn />);
    const button = screen.getByRole("button", { name: /copy url/i });
    expect(button).toBeInTheDocument();
    expect(screen.getByTestId("copy-icon")).toBeInTheDocument();
  });

  it("copies the URL successfully and shows success toast", async () => {
    writeTextMock.mockResolvedValueOnce(null);

    render(<CopyBtn />);
    const button = screen.getByRole("button", { name: /copy url/i });

    // Click the button
    fireEvent.click(button);

    // Clipboard called
    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalledWith("https://example.com/test");
    });

    // Toast shown
    expect(addToastMock).toHaveBeenCalledWith("Url copied!", "success");

    // Button updates class to copied
    expect(button.className).toContain("copied");

    // Advance timers to trigger reset
    vi.advanceTimersByTime(3000);
    await Promise.resolve(); // flush microtasks

    expect(button.className).toContain("default");
  });

  it("handles clipboard failure and shows error toast", async () => {
    writeTextMock.mockRejectedValueOnce(new Error("copy failed"));

    render(<CopyBtn />);
    const button = screen.getByRole("button", { name: /copy url/i });

    fireEvent.click(button);

    await waitFor(() => {
      expect(addToastMock).toHaveBeenCalledWith("Failed to copy url.", "error");
    });

    expect(button.className).toContain("failed");
  });
});
