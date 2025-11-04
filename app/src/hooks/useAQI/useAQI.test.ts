import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { mockFetchCurrentAqi } from "@/test/apiFunction.mock";
import { createWrapper } from "@/test/testQueryUtils";
import type { Cooradinates } from "@/types/types";
import { useAQI } from "./useAQI";

const mockCoords: Cooradinates = { latitude: 34.0522, longitude: -118.2437 };
const mockAqiData = 45;

describe("useAQI", () => {
  it("should successfully fetch and return AQI data", async () => {
    mockFetchCurrentAqi.mockResolvedValueOnce(mockAqiData);

    const { result } = renderHook(() => useAQI(mockCoords), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockAqiData);
    expect(result.current.isLoading).toBe(false);
    expect(mockFetchCurrentAqi).toHaveBeenCalledWith(mockCoords);
    expect(mockFetchCurrentAqi).toHaveBeenCalledOnce();
  });

  it("should not run the query when coordinates are falsy", () => {
    mockFetchCurrentAqi.mockResolvedValue(mockAqiData);

    // Pass null for coords to test the `enabled: !!coords` logic
    const { result } = renderHook(
      () => useAQI(null as unknown as Cooradinates),
      { wrapper: createWrapper() },
    );

    expect(result.current.status).toBe("pending");

    expect(mockFetchCurrentAqi).not.toHaveBeenCalled();
    expect(result.current.data).toBeUndefined();
  });
});
