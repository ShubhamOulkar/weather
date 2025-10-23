import { useState } from "react";

export function useToggle() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  const activityMode: "visible" | "hidden" = open ? "visible" : "hidden";
  return { open, setOpen, toggle, activityMode };
}
