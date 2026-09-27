import { RefObject, useEffect } from "react";

import { useReducedMotion } from "./use-reduced-motion";

interface PointerVarsOptions {
  /**
   * When set, the vars are written to every descendant matching this selector,
   * each relative to its own box (e.g. a grid-wide glow across cards).
   * Otherwise they are written to the container itself.
   */
  selector?: string;
}

const FINE_POINTER = "(hover: hover) and (pointer: fine)";
const VARS = ["--mx", "--my", "--px", "--py"] as const;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/**
 * Tracks the pointer over `ref` and exposes its position as CSS custom
 * properties so hover effects (spotlight, glow, tilt, magnetic pull) can be
 * written in pure CSS:
 *
 * - `--mx` / `--my`: pointer offset in px from the element's top-left
 * - `--px` / `--py`: the same, normalised to 0–1 and clamped
 *
 * While the pointer is inside, the container carries `data-pointer-active`.
 * Updates are rAF-throttled DOM writes, never React state, so moving the
 * pointer does not re-render. No-op on touch devices and with reduced motion.
 */
export function usePointerVars(
  ref: RefObject<HTMLElement | null>,
  { selector }: PointerVarsOptions = {}
): void {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const container = ref.current;
    if (!container || reducedMotion) return;
    if (!window.matchMedia(FINE_POINTER).matches) return;

    let frame = 0;
    let clientX = 0;
    let clientY = 0;

    const targets = () =>
      selector
        ? Array.from(container.querySelectorAll<HTMLElement>(selector))
        : [container];

    const write = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      el.style.setProperty("--mx", `${x.toFixed(1)}px`);
      el.style.setProperty("--my", `${y.toFixed(1)}px`);
      el.style.setProperty("--px", clamp01(x / rect.width).toFixed(3));
      el.style.setProperty("--py", clamp01(y / rect.height).toFixed(3));
    };

    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      delete container.dataset.pointerActive;
      targets().forEach((el) =>
        VARS.forEach((v) => el.style.removeProperty(v))
      );
    };

    const onMove = (event: PointerEvent) => {
      clientX = event.clientX;
      clientY = event.clientY;
      container.dataset.pointerActive = "";
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        targets().forEach(write);
      });
    };

    container.addEventListener("pointermove", onMove);
    container.addEventListener("pointerleave", reset);
    return () => {
      container.removeEventListener("pointermove", onMove);
      container.removeEventListener("pointerleave", reset);
      reset();
    };
  }, [ref, selector, reducedMotion]);
}
