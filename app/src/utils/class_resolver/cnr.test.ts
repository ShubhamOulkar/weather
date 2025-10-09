import { describe, expect, it, vi } from "vitest";
import cnr from "./cnr";

describe("cnr utility", () => {
  it("should return single class", () => {
    expect(cnr("foo")).toBe("foo");
  });

  it("should join multiple strings", () => {
    expect(cnr("foo", "bar")).toBe("foo bar");
  });

  it("should handle arrays", () => {
    expect(cnr(["foo", "bar"])).toBe("foo bar");
  });

  it("should handle objects", () => {
    expect(cnr({ foo: true, bar: false, baz: 1 })).toBe("foo baz");
  });

  it("should skip falsy values", () => {
    expect(cnr("foo", null, undefined, false, "")).toBe("foo");
  });

  it("should handle nested arrays and objects", () => {
    expect(cnr("foo", ["bar", { baz: true, qux: false }], "zap")).toBe(
      "foo bar baz zap",
    );
  });

  it("logs error on invalid type", () => {
    const consoleErrSpy = vi.spyOn(console, "error").mockImplementation(() => {
      /*make linter happy */
    });
    const result = cnr(1235);
    expect(result).toBe("");
    expect(consoleErrSpy).toBeCalledWith("Classname is not valid type");
  });
});
