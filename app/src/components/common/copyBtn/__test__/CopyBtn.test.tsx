import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AllProvider from "@/provider/AllProvider";
import CopyBtn from "../CopyBtn";

const renderComponent = (children: ReactNode) => {
  return render(<AllProvider>{children}</AllProvider>);
};

describe("CopyBtn Component", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders correctly in its initial state", () => {
    renderComponent(<CopyBtn />);
    const button = screen.getByRole("button", { name: /copy url/i });
    expect(button).toBeInTheDocument();
    expect(button.querySelector("svg")).toBeInTheDocument();
  });

  it("copies the URL successfully and show toast", async () => {
    const mockWriteText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: { writeText: mockWriteText },
    });

    renderComponent(<CopyBtn />);

    const button = screen.getByRole("button", { name: /copy url/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockWriteText).toHaveBeenCalled();
      // toast notification
      expect(screen.getByText(/url copied!/i)).toBeInTheDocument();
    });
  });

  it("handles clipboard write error gracefully", async () => {
    const mockWriteText = vi.fn().mockRejectedValue(new Error("Copy failed"));
    Object.assign(navigator, {
      clipboard: { writeText: mockWriteText },
    });

    renderComponent(<CopyBtn />);
    const button = screen.getByRole("button", { name: /copy url/i });

    fireEvent.click(button);

    await waitFor(() => {
      expect(mockWriteText).toHaveBeenCalled();
      // toast notification
      expect(screen.getByText(/failed to copy url/i)).toBeInTheDocument();
    });
  });
});
