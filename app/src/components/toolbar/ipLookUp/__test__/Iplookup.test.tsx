import { screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { expect } from "vitest";
import { renderWithClient } from "@/test/testQueryUtils";
import { getLocalDate } from "@/utils/local_date/getLocalDate";
import IpLookUp from "../IpLookUp";

const time = getLocalDate(undefined, { minute: "2-digit" }).time;

describe("Test IP data component", () => {
  it("renders correctly in its initial state", async () => {
    renderWithClient(<IpLookUp />);
    const loader = screen.getByLabelText("loader");
    expect(loader).toBeInTheDocument();
    expect(loader.ariaHidden).toEqual("true");
    await waitFor(() => {
      const timeEle = screen.getByLabelText(`${time} in universe`);
      const ipSpan = screen.getByLabelText("universe (000)");
      expect(ipSpan).toBeInTheDocument();
      expect(ipSpan.textContent).toEqual("Un");
      expect(timeEle).toBeInTheDocument();
      expect(timeEle.textContent).toEqual(`${time} | `);
      expect(loader).not.toBeInTheDocument();
    });
  });

  // it("render error icon if ipdata fetch fails", async () => {
  //   renderWithClient(<IpLookUp />);

  //   await waitFor(() => {
  //     const errorIcon = screen.getByLabelText("Error in Ip fetching");
  //     expect(errorIcon).toBeInTheDocument();
  //     const notification = screen.getByRole("alert");
  //     expect(notification).toBeInTheDocument();
  //     expect(notification.textContent).toEqual("Error: Ip look up 👻");
  //   });
  // });
});
