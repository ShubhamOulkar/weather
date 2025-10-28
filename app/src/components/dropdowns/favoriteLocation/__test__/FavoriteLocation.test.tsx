import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";
import AllProvider from "@/provider/AllProvider";
import FavoriteLocationDropdown from "../FavoriteLocation";

// Note:- Add place into favorites and delete place from favorites behaviour is tested in e2e test

const renderComponent = (children: ReactNode) => {
  return render(<AllProvider>{children}</AllProvider>);
};

describe("Favorite locations dropdown Integration Test", () => {
  it("renders correctly in its initial state", () => {
    renderComponent(<FavoriteLocationDropdown />);
    const button = screen.getByRole("combobox", {
      name: /Favorite Locations. Currently 0 saved./i,
    });
    const favListBox = screen.getByLabelText(/list of favorite places/i);
    expect(button).toBeInTheDocument();
    expect(favListBox).toBeInTheDocument();
    expect(favListBox).not.toBeVisible();
    expect(button.ariaExpanded).toEqual("false");
    expect(button.querySelector("svg")).toBeInTheDocument();
    expect(button.querySelector("span")?.textContent).toEqual("0");
  });

  it("Should toggle favorites dropdown", () => {
    renderComponent(<FavoriteLocationDropdown />);
    const button = screen.getByRole("combobox", {
      name: /Favorite Locations. Currently 0 saved./i,
    });
    const favListBox = screen.getByLabelText(/list of favorite places/i);
    expect(favListBox).not.toBeVisible();
    expect(button.ariaExpanded).toEqual("false");
    fireEvent.click(button);
    expect(favListBox).toBeVisible();
    expect(favListBox.textContent).toEqual("No favorites saved.");
    expect(button.ariaExpanded).toEqual("true");
    expect(favListBox.ariaHidden).toEqual("false");
  });
});
