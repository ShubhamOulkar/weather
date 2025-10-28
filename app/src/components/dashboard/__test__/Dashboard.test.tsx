import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";
import AllProvider from "@/provider/AllProvider";
import Dashboard from "../Dashboard";

const renderComponent = (children: ReactNode) => {
  return render(<AllProvider>{children}</AllProvider>);
};

describe("Test Dashboard", () => {
  it("renders correctly in its initial state", () => {
    renderComponent(<Dashboard />);
    // test location card
    // test metric cards
    const metricCards = screen.getByRole("gridcell");
    expect(metricCards).toBeInTheDocument();
    expect(metricCards.children.length).toEqual(5);
    // Test daily cards
    const dailyCard = screen.getByRole("grid");
    expect(dailyCard).toBeInTheDocument();
    expect(dailyCard.children.length).toEqual(7);
    expect(screen.getByText("Daily forecast")).toBeInTheDocument();
    // test hourly cards
    expect(screen.getByText("Hourly forecast")).toBeInTheDocument();
  });
});
