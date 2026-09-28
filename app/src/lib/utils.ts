import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts a px length, as designed at the default 16px root, to rem so an
 * inline style follows the UI scale set on `html` in `index.css`.
 *
 * @example
 * pxToRem(14) // "0.875rem"
 */
export function pxToRem(px: number): string {
  return `${px / 16}rem`;
}

/**
 * The rendered size, in CSS px, of a length designed as `px` at the default
 * 16px root. Use it for layout math on rem-sized elements, since the root
 * font-size is scaled on larger screens.
 *
 * @example
 * scaledPx(420) // 336 when the root font-size is 12.8px (80%)
 */
export function scaledPx(px: number): number {
  const rootPx = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );
  return (px * rootPx) / 16;
}

/**
 * Prefixes a root-relative public asset path with the app's base path, so it
 * still resolves when the site is served from a subpath (e.g. GitHub Pages at
 * `/me/`). Absolute and protocol-relative URLs are returned unchanged.
 *
 * @example
 * withBase("/data/projects.json") // "/me/data/projects.json" when base is "/me/"
 * withBase("https://example.com/a.png") // unchanged
 */
export function withBase(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) {
    return path;
  }
  return `${import.meta.env.BASE_URL}${path.slice(1)}`;
}

/** Router basename derived from the app's base path (`"/me/"` → `"/me"`). */
export const ROUTER_BASENAME = import.meta.env.BASE_URL.replace(/\/$/, "");

/**
 * Strips the app's base path from a raw `window.location.pathname`, giving
 * the path the router sees (e.g. `"/me/about"` → `"/about"`).
 */
export function stripBase(pathname: string): string {
  if (!pathname.startsWith(ROUTER_BASENAME)) {
    return pathname;
  }
  return pathname.slice(ROUTER_BASENAME.length) || "/";
}

/**
 * Formats a UTC ISO date string as a human-readable relative time string.
 *
 * @param isoDate - A UTC ISO 8601 date string (e.g. `"2024-01-15T10:30:00Z"`),
 *                  or `null`/`undefined` if the date is unavailable.
 * @returns A relative time string such as `"just now"`, `"5m ago"`, `"3h ago"`,
 *          `"2d ago"`, `"4mo ago"`, `"1y ago"`, or `"unknown"` if no date was provided.
 *
 * @example
 * relativeTime(new Date(Date.now() - 90_000).toISOString()) // "1m ago"
 * relativeTime(null) // "unknown"
 */
export function relativeTime(isoDate: string | null | undefined): string {
  if (!isoDate) {
    return "unknown";
  }

  const diff = Date.now() - new Date(isoDate).getTime();
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) {
    return "just now";
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(hours / 24);
  if (days < 30) {
    return `${days}d ago`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months}mo ago`;
  }

  return `${Math.floor(months / 12)}y ago`;
}

/**
 * Add multiple event listeners to an element
 * @param el - The element to attach listeners to
 * @param events - Object mapping event names to handlers
 * @returns Cleanup function to remove all listeners
 */
type AnyEventMap = HTMLElementEventMap & WindowEventMap;

export function addListeners<T extends HTMLElement | Document | Window>(
  el: T | null,
  events: {
    [K in keyof AnyEventMap]?: (e: AnyEventMap[K]) => void;
  }
): () => void {
  if (!el) return () => {};

  const entries = Object.entries(events) as [
    keyof AnyEventMap,
    EventListener,
  ][];

  entries.forEach(([event, handler]) => {
    el.addEventListener(event, handler as EventListener);
  });

  return () => {
    entries.forEach(([event, handler]) => {
      el.removeEventListener(event, handler as EventListener);
    });
  };
}
