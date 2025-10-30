import { screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";
import { mockFetchCurrentAqi } from "@/test/apiFunction.mock";
import { renderWithClient } from "@/test/testQueryUtils";
import type { Cooradinates } from "@/types/types";
import AQICard from "../AQI";

const mockCoords: Cooradinates = { latitude: 34.0522, longitude: -118.2437 };

describe("AQI card", () => {
  it("Should render in initial state", async () => {
    renderWithClient(
      <AQICard
        latitude={mockCoords.latitude}
        longitude={mockCoords.longitude}
      />,
    );
    expect(screen.getByText("AQI")).toBeInTheDocument();
    const [aqiLabelLoader, aqiValueLoader] = screen.getAllByLabelText("loader");
    expect(aqiLabelLoader).toBeInTheDocument();
    expect(aqiValueLoader).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("45")).toBeInTheDocument();
      expect(screen.getByTitle("Good")).toBeInTheDocument();
    });

    expect(mockFetchCurrentAqi).toHaveBeenCalledTimes(1);
  });
});
