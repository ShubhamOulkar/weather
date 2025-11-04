import { screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";
import { mockFetchCurrentAqi } from "@/test/apiFunction.mock";
import { renderWithClient } from "@/test/testQueryUtils";
import Dashboard from "../Dashboard";

describe("Test Dashboard", () => {
  it("renders correctly in its initial state", () => {
    renderWithClient(<Dashboard />);
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

describe("<Metric /> integration", () => {
  it("renders all metric cards and updates with AQI + weather data", async () => {
    renderWithClient(<Dashboard />);
    const loaders = screen.getAllByLabelText("loader");
    expect(loaders[0]).toBeInTheDocument();

    // Metric labels should always render even during loading
    expect(screen.getByText("Feels Like")).toBeInTheDocument();
    expect(screen.getByText("Humidity")).toBeInTheDocument();
    expect(screen.getByText("Wind")).toBeInTheDocument();
    expect(screen.getByText("Precipitation")).toBeInTheDocument();
    expect(screen.getByText("AQI")).toBeInTheDocument();

    await waitFor(() => {
      // AQI data rendered
      expect(screen.getByText("45")).toBeInTheDocument();
      expect(screen.getByTitle("Good")).toBeInTheDocument();
    });
    expect(mockFetchCurrentAqi).toHaveBeenCalledTimes(1);
  });
});
