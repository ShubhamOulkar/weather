import { useState } from "react";
import "@testing-library/jest-dom/vitest";
import {
  fireEvent,
  type RenderResult,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useDismissalOutside } from "./useDismissalOutside";

interface TestComponentProp {
  onPointerDownOutside?: () => void;
  onFocusOutside?: () => void;
  onDismissal: () => void;
}

function TestComponent({
  onPointerDownOutside,
  onFocusOutside,
  onDismissal,
}: TestComponentProp) {
  const [open, setOpen] = useState(true);

  const { nodeRef, userRef } = useDismissalOutside<
    HTMLDivElement,
    HTMLButtonElement
  >({
    onPointerDownOutsideEvent: onPointerDownOutside,
    onFocusOutsideEvent: onFocusOutside,
    onDismissalEvent: () => {
      onDismissal();
      setOpen(false);
    },
  });

  return (
    <div data-testid="outside">
      <button data-testid="both-event-ele">I can fire both events</button>
      <a href="#" data-testid="focusoutside">
        Focus me
      </a>
      <button ref={userRef} data-testid="opendropdown">
        Toggle
      </button>
      {open && (
        <div ref={nodeRef} data-testid="dropdown">
          Dropdown content
        </div>
      )}
    </div>
  );
}

describe("useDismissalOutside", () => {
  let onDismissal: ReturnType<typeof vi.fn>;
  let onPointerDownOutside: ReturnType<typeof vi.fn>;
  let onFocusOutside: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onDismissal = vi.fn();
    onPointerDownOutside = vi.fn();
    onFocusOutside = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  function renderComponent(): RenderResult {
    return render(
      <TestComponent
        onPointerDownOutside={onPointerDownOutside}
        onFocusOutside={onFocusOutside}
        onDismissal={onDismissal}
      />,
    );
  }

  it("should call onDismissalEvent when clicking outside the nodeRef component", () => {
    const { getByTestId } = renderComponent();

    const dropdown = screen.getByText("Dropdown content");
    expect(dropdown).toBeVisible();

    fireEvent.pointerDown(getByTestId("outside"));
    expect(onDismissal).toHaveBeenCalledTimes(1);
    expect(onPointerDownOutside).toHaveBeenCalledTimes(1);
    expect(onFocusOutside).not.toBeCalled();
    expect(dropdown).not.toBeVisible();
  });

  it("should call onDismissalEvent when focus outside the nodeRef component", () => {
    renderComponent();

    const dropdown = screen.getByText("Dropdown content");
    const focusEle = screen.getByText("Focus me");
    expect(dropdown).toBeVisible();
    expect(focusEle).not.toHaveFocus();
    fireEvent.focusIn(focusEle);
    expect(onDismissal).toHaveBeenCalledTimes(1);
    expect(onFocusOutside).toHaveBeenCalledTimes(1);
    expect(onPointerDownOutside).not.toBeCalled();
    expect(dropdown).not.toBeVisible();
  });

  it("should call onDismissalEvent when touch outside the nodeRef component on mobile devices", () => {
    const { getByTestId } = renderComponent();

    const outsideEle = getByTestId("outside");
    const dropdown = screen.getByText("Dropdown content");
    expect(dropdown).toBeVisible();

    fireEvent.pointerDown(outsideEle, { pointerType: "touch" });
    fireEvent.click(outsideEle);
    expect(onDismissal).toHaveBeenCalledTimes(1);
    expect(onPointerDownOutside).toHaveBeenCalledTimes(1);
    expect(onFocusOutside).not.toBeCalled();
    expect(dropdown).not.toBeVisible();
  });

  it("should not call onDismissalEvent when focus event happed on userRef component", () => {
    const { getByTestId } = renderComponent();

    const dropBtn = getByTestId("opendropdown");
    const dropdown = screen.getByText("Dropdown content");
    expect(dropdown).toBeVisible();
    expect(dropBtn).not.toHaveFocus();

    fireEvent.focusIn(dropBtn);
    expect(onDismissal).not.toBeCalled();
    expect(onFocusOutside).not.toBeCalled();
    expect(onPointerDownOutside).not.toBeCalled();
    expect(dropdown).toBeVisible();
  });

  it("should not call onDismissalEvent when pointer down event happed on userRef component", () => {
    renderComponent();

    const dropBtn = screen.getByText("Toggle");
    const dropdown = screen.getByText("Dropdown content");
    expect(dropdown).toBeVisible();

    fireEvent.pointerDown(dropBtn);
    expect(onDismissal).not.toBeCalled();
    expect(onFocusOutside).not.toBeCalled();
    expect(onPointerDownOutside).not.toBeCalled();
    expect(dropdown).toBeVisible();
  });

  it("should not call onDismissalEvent two times on the same element", () => {
    const { getByTestId } = renderComponent();

    const ele = getByTestId("both-event-ele");
    const dropdown = screen.getByText("Dropdown content");
    expect(dropdown).toBeVisible();

    fireEvent.pointerDown(ele);
    fireEvent.focusIn(ele);
    expect(onDismissal).toHaveBeenCalledTimes(1);
    expect(onFocusOutside).not.toBeCalled();
    expect(onPointerDownOutside).toBeCalledTimes(1);
    expect(dropdown).not.toBeVisible();
  });
});
