import React, { useEffect, useRef, useState } from "react";

import { useInView } from "@/hooks/use-in-view";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const GLYPHS = "{}<>/_$#01";

const scrambleAll = (text: string) =>
  text.replace(/\S/g, (_, i: number) => GLYPHS[i % GLYPHS.length]);

interface ScrambleTextProps {
  text: string;
  className?: string;
  /** Time for the text to fully resolve, in ms. */
  duration?: number;
  /** Wait before resolving starts, in ms. */
  delay?: number;
}

/**
 * Text that "decodes" from code glyphs into the real string, resolving
 * left → right once it scrolls into view. Screen readers get the real text
 * immediately; with reduced motion the final text renders straight away.
 * Intended for monospace text so the width never changes mid-animation.
 */
const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className,
  duration = 900,
  delay = 0,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(() => scrambleAll(text));

  useEffect(() => {
    if (!inView || reducedMotion) return;

    let frame = 0;
    let start = 0;

    const tick = (now: number) => {
      if (!start) start = now + delay;
      const progress = Math.min(Math.max(now - start, 0) / duration, 1);
      const resolved = Math.floor(progress * text.length);

      let next = text.slice(0, resolved);
      for (let i = resolved; i < text.length; i++) {
        next +=
          text[i] === " "
            ? " "
            : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setDisplay(next);

      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reducedMotion, text, duration, delay]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{reducedMotion ? text : display}</span>
    </span>
  );
};

export default ScrambleText;
