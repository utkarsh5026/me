import { RefObject, useEffect } from "react";

/**
 * Writes how far the reader has scrolled through `targetRef` (0–1) to the
 * `--progress` CSS custom property on `barRef`, e.g. for a reading-progress
 * bar: `transform: scaleX(var(--progress))`.
 *
 * Measures against the nearest `[data-scroll-container]` ancestor (the
 * editor's scroll area). rAF-throttled DOM writes only — no re-renders.
 */
export function useScrollProgress(
  targetRef: RefObject<HTMLElement | null>,
  barRef: RefObject<HTMLElement | null>
): void {
  useEffect(() => {
    const target = targetRef.current;
    const bar = barRef.current;
    if (!target || !bar) return;

    const scroller = target.closest<HTMLElement>("[data-scroll-container]");
    if (!scroller) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const view = scroller.getBoundingClientRect();
      const box = target.getBoundingClientRect();
      const scrollable = box.height - view.height;
      const progress =
        scrollable <= 0
          ? 1
          : Math.min(1, Math.max(0, (view.top - box.top) / scrollable));
      bar.style.setProperty("--progress", progress.toFixed(4));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // Content height changes as images and code blocks load.
    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(target);
    scroller.addEventListener("scroll", schedule, { passive: true });
    update();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      scroller.removeEventListener("scroll", schedule);
    };
  }, [targetRef, barRef]);
}
