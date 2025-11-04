import { fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, it, vi } from "vitest";
import { renderWithClient } from "@/test/testQueryUtils";
import { getLocalDate } from "@/utils/local_date/getLocalDate";
import CopyBtn from "../CopyBtn";

describe("CopyBtn Integration Test", () => {
  it("renders correctly in its initial state", () => {
    renderWithClient(<CopyBtn />);
    const button = screen.getByRole("button", { name: /copy url/i });
    expect(button).toBeInTheDocument();
    expect(button.querySelector("svg")).toBeInTheDocument();
  });

  it("copies the URL successfully and show toast", async () => {
    const mockWriteText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: { writeText: mockWriteText },
    });

    renderWithClient(<CopyBtn />);

    const button = screen.getByRole("button", { name: /copy url/i });
    fireEvent.click(button);

    const fullDate = encodeURIComponent(getLocalDate().fullDate);
    const time = encodeURIComponent(
      getLocalDate(undefined, { minute: "2-digit" }).time,
    );

    await waitFor(() => {
      expect(mockWriteText).toHaveBeenCalled();
      const copiedText = mockWriteText.mock.calls[0][0];
      // Expect full correct URL now
      expect(copiedText).toMatch(
        `https://example.com/api/weather-card?name=Hupari%2C%20MH%2C%20IN&temp=20&wmo=96&date=${fullDate}&time=${time}`,
      );
      // toast notification
      expect(screen.getByText(/url copied!/i)).toBeInTheDocument();
    });
  });

  it("handles clipboard write error gracefully", async () => {
    const mockWriteText = vi.fn().mockRejectedValue(new Error("Copy failed"));
    Object.assign(navigator, {
      clipboard: { writeText: mockWriteText },
    });

    renderWithClient(<CopyBtn />);
    const button = screen.getByRole("button", { name: /copy url/i });

    fireEvent.click(button);

    await waitFor(() => {
      expect(mockWriteText).toHaveBeenCalled();
      const copiedText = mockWriteText.mock.calls[0][0];
      // empty copied url
      expect(copiedText).toMatch("");
      // toast notification
      expect(screen.getByText(/failed to copy url/i)).toBeInTheDocument();
    });
  });
});
