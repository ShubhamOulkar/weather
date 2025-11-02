import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { createWrapper } from "@/test/testQueryUtils";
import { useIpLookUp } from "./useIpLookUp";

describe("useIpLookUp", () => {
  it("should return loading, then successfully fetch and transform IP data", async () => {
    const { result } = renderHook(() => useIpLookUp(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual({
      capital: "moon",
      country: "universe",
      country_code: "000",
      country_icon: "Un",
    });
  });

  // it("should return an API error if the response body indicates failure", async () => {
  //   const { result } = renderHook(() => useIpLookUp(), {
  //     wrapper: createWrapper(),
  //   });

  //   await waitFor(() => expect(result.current.isError).toBe(true));

  //   expect(result.current.isSuccess).toBe(false);
  //   expect(result.current.error).toBeInstanceOf(Error);
  //   expect((result.current.error as Error).message).toContain(
  //     "API Error: IP Lookup failed.",
  //   );
  // });

  // it("should return an HTTP error if the network request fails", async () => {
  //   const { result } = renderHook(() => useIpLookUp(), {
  //     wrapper: createWrapper(),
  //   });

  //   await waitFor(() => expect(result.current.isError).toBe(true));

  //   expect(result.current.isSuccess).toBe(false);
  //   expect(result.current.error).toBeInstanceOf(Error);
  //   expect((result.current.error as Error).message).toContain(
  //     "Failed to fetch",
  //   );
  // });
});
