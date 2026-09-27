import { RefObject, useLayoutEffect } from "react";

/**
 * Watches every descendant of `ref` marked with `data-reveal` and stamps
 * `data-inview` on it the first time it scrolls into view, so CSS can play a
 * one-shot entrance. One shared IntersectionObserver serves the whole tree.
 *
 * While observing, the container carries `data-reveal-ready`; CSS should only
 * hide not-yet-seen elements under that attribute, so content never depends
 * on JavaScript to become visible.
 *
 * @param contentKey change this when the subtree's content is replaced
 *                   (e.g. new markdown) to re-scan for targets.
 */
export function useRevealOnScroll(
  ref: RefObject<HTMLElement | null>,
  contentKey?: unknown,
  margin = "0px 0px -8% 0px"
): void {
  // Layout effect: targets are hidden and observed before the first paint,
  // so above-the-fold content animates in instead of flashing.
  useLayoutEffect(() => {
    const container = ref.current;
    if (!container) return;

    const targets = container.querySelectorAll<HTMLElement>(
      "[data-reveal]:not([data-inview])"
    );
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-inview", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: margin }
    );

    targets.forEach((el) => observer.observe(el));
    container.setAttribute("data-reveal-ready", "");

    return () => {
      observer.disconnect();
      container.removeAttribute("data-reveal-ready");
    };
  }, [ref, contentKey, margin]);
}
