import { renderHook, waitFor } from "@testing-library/react";
import type { JSX, ReactNode } from "react";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  type Mock,
  vi,
} from "vitest";
import { createQueryWrapper, testQueryClient } from "../../testQueryUtils";
import type { Cooradinates } from "../../types/types";
import { fetchCurrentAqi } from "../../utils/apis/fetchCurrentAqi/fetchCurrentAqi";
import { useAQI } from "./useAQI";

vi.mock("../../utils/apis/fetchCurrentAqi/fetchCurrentAqi", () => ({
  fetchCurrentAqi: vi.fn(),
}));

const mockFetchCurrentAqi = fetchCurrentAqi as Mock;

const mockCoords: Cooradinates = { latitude: 34.0522, longitude: -118.2437 };
const mockAqiData = 45;

describe("useAQI", () => {
  let wrapper: ({ children }: { children: ReactNode }) => JSX.Element;

  beforeEach(() => {
    wrapper = createQueryWrapper();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    mockFetchCurrentAqi.mockClear();
    testQueryClient.clear();
  });

  it("should successfully fetch and return AQI data", async () => {
    mockFetchCurrentAqi.mockResolvedValueOnce(mockAqiData);

    const { result } = renderHook(() => useAQI(mockCoords), { wrapper });

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
      { wrapper },
    );

    expect(result.current.status).toBe("pending");

    expect(mockFetchCurrentAqi).not.toHaveBeenCalled();
    expect(result.current.data).toBeUndefined();
  });
});
