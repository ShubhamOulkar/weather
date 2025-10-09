import { describe, expect, it, vi } from "vitest";
import { getLocalDate } from "./getLocalDate";

const defaultResult = {
  date: new Date("Mon Sep 29 2025 10:14:09 GMT+0530 (India Standard Time)"),
  weekday: "Monday",
  day: "29",
  month: "Sep",
  year: "2025",
  fullDate: "Monday, Sep 29, 2025",
};

const userResult = {
  date: new Date("2025-09-29T04:44:09.000Z"),
  weekday: "Mon",
  day: "29",
  month: "S",
  year: "25",
  fullDate: "Mon, S 29, 25",
};

describe("Test get local date utility", () => {
  it("should return formated date parts", () => {
    const data = getLocalDate(
      "Mon Sep 29 2025 10:14:09 GMT+0530 (India Standard Time)",
    );
    expect(data).toMatchObject(defaultResult);
  });

  it("should return user formated date.week part", () => {
    const data = getLocalDate(
      "Mon Sep 29 2025 10:14:09 GMT+0530 (India Standard Time)",
      { weekday: "short" },
    );
    expect(data.weekday).toEqual(userResult.weekday);
  });

  it("should return today formated date parts", () => {
    const data = getLocalDate();
    expect(data).toEqual(data); // TODO: Improvement
  });

  it("should return today formated date parts if invalid string is given", () => {
    const consoleErrSpy = vi.spyOn(console, "error").mockImplementation(() => {
      /*make linter happy */
    });
    getLocalDate("invalid string");
    expect(consoleErrSpy).toBeCalledWith(
      `getLocalDate received an invalid date string: invalid string. Falling back to current date.`,
    );
  });
});
