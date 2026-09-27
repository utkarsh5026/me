import { useEffect } from "react";

import useSettingsStore from "@/store/settings-store";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const flavor = useSettingsStore((s) => s.flavor);
  const reducedMotion = useSettingsStore((s) => s.reducedMotion);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("latte", "frappe", "macchiato", "mocha");
    root.classList.add(flavor);
  }, [flavor]);

  useEffect(() => {
    window.document.documentElement.dataset.motion = reducedMotion
      ? "reduced"
      : "full";
  }, [reducedMotion]);

  return <>{children}</>;
}
