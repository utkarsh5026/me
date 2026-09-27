import { useSyncExternalStore } from "react";

import useSettingsStore from "@/store/settings-store";

const QUERY = "(prefers-reduced-motion: reduce)";

const subscribe = (onChange: () => void) => {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
};

const getSnapshot = () => window.matchMedia(QUERY).matches;
const getServerSnapshot = () => false;

/**
 * True when the visitor prefers reduced motion, either via the OS-level
 * `prefers-reduced-motion` media query or the in-app Settings toggle.
 * JS-driven animations should skip straight to their final state when true.
 */
export function useReducedMotion(): boolean {
  const osPrefersReduced = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
  const settingReduced = useSettingsStore((s) => s.reducedMotion);
  return osPrefersReduced || settingReduced;
}
