import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";
import AllProvider from "@/provider/AllProvider";
import UnitsDropdown from "../UnitsDropdown";

const renderComponent = (children: ReactNode) => {
  return render(<AllProvider>{children}</AllProvider>);
};

describe("Units dropdown Integration Test", () => {
  it("renders correctly in its initial state", () => {
    renderComponent(<UnitsDropdown />);
    const button = screen.getByRole("combobox", { name: /units/i });
    const unitsListBox = button.nextSibling;
    expect(button).toBeInTheDocument();
    expect(unitsListBox).toBeInTheDocument();
    expect(unitsListBox).not.toBeVisible();
    expect(button.ariaExpanded).toEqual("false");
    const twoSvgIcons = button.querySelectorAll("svg").length;
    expect(twoSvgIcons).toEqual(2);
  });

  it("Should open and close units dropdown", () => {
    renderComponent(<UnitsDropdown />);
    const button = screen.getByRole("combobox", { name: /units/i });
    const unitsListBox = screen.getByLabelText(/change weather units/i);
    expect(button).toBeInTheDocument();
    expect(unitsListBox).toBeInTheDocument();
    expect(button.ariaExpanded).toEqual("false");
    expect(unitsListBox?.ariaHidden).toEqual("true");
    fireEvent.click(button);
    expect(unitsListBox?.ariaHidden).toEqual("false");
    expect(button.ariaExpanded).toEqual("true");
  });

  it("Dropdown should render 7 unit buttons", () => {
    renderComponent(<UnitsDropdown />);
    const button = screen.getByRole("combobox", { name: /units/i });
    fireEvent.click(button);
    const unitsListBox = screen.getByLabelText(/change weather units/i);
    expect(unitsListBox).toBeInTheDocument();
    expect(unitsListBox?.ariaHidden).toEqual("false");
    expect(unitsListBox.querySelectorAll("button").length).toEqual(7);
  });

  it("Test switch to imperial button", () => {
    renderComponent(<UnitsDropdown />);
    const button = screen.getByRole("combobox", { name: /units/i });
    fireEvent.click(button);
    const unitsListBox = screen.getByLabelText(/change weather units/i);
    const switchBtn = unitsListBox.querySelectorAll("button")[0];
    expect(switchBtn).toHaveAccessibleName(/switch to imperial/i);
    fireEvent.click(switchBtn);
    expect(switchBtn).toHaveAccessibleName(/switch to metric/i);
  });

  it("Test temperature units buttons", () => {
    renderComponent(<UnitsDropdown />);
    const button = screen.getByRole("combobox", { name: /units/i });
    fireEvent.click(button);
    const unitsListBox = screen.getByLabelText(/change weather units/i);
    const celciusBtn = unitsListBox.querySelectorAll("button")[1];
    const fahrenheitBtn = unitsListBox.querySelectorAll("button")[2];
    expect(celciusBtn).toHaveAccessibleName("Celsius (°C)");
    expect(celciusBtn.querySelector("svg")).toBeVisible();
    expect(fahrenheitBtn).toHaveAccessibleName("Fahrenheit (°F)");
    expect(fahrenheitBtn.querySelector("svg")).not.toBeVisible();
    fireEvent.click(fahrenheitBtn);
    expect(fahrenheitBtn.querySelector("svg")).toBeVisible();
    expect(celciusBtn.querySelector("svg")).not.toBeVisible();
  });

  it("Test wind units buttons", () => {
    renderComponent(<UnitsDropdown />);
    const button = screen.getByRole("combobox", { name: /units/i });
    fireEvent.click(button);
    const unitsListBox = screen.getByLabelText(/change weather units/i);
    const kmhBtn = unitsListBox.querySelectorAll("button")[3];
    const mphBtn = unitsListBox.querySelectorAll("button")[4];
    expect(kmhBtn).toHaveAccessibleName("km/h");
    expect(kmhBtn.querySelector("svg")).toBeVisible();
    expect(mphBtn).toHaveAccessibleName("mph");
    expect(mphBtn.querySelector("svg")).not.toBeVisible();
    fireEvent.click(mphBtn);
    expect(mphBtn.querySelector("svg")).toBeVisible();
    expect(kmhBtn.querySelector("svg")).not.toBeVisible();
  });

  it("Test precipitation units buttons", () => {
    renderComponent(<UnitsDropdown />);
    const button = screen.getByRole("combobox", { name: /units/i });
    fireEvent.click(button);
    const unitsListBox = screen.getByLabelText(/change weather units/i);
    const mmBtn = unitsListBox.querySelectorAll("button")[5];
    const inBtn = unitsListBox.querySelectorAll("button")[6];
    expect(mmBtn).toHaveAccessibleName("Millimeters (mm)");
    expect(mmBtn.querySelector("svg")).toBeVisible();
    expect(inBtn).toHaveAccessibleName("Inches (in)");
    expect(inBtn.querySelector("svg")).not.toBeVisible();
    fireEvent.click(inBtn);
    expect(inBtn.querySelector("svg")).toBeVisible();
    expect(mmBtn.querySelector("svg")).not.toBeVisible();
  });
});
