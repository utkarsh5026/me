import { Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import Reveal from "@/components/animations/reveal/Reveal";
import { OutlineNode } from "@/components/home/editor/outline";
import { Button } from "@/components/ui/button";
import { Heading, Text } from "@/components/ui/text";
import { useGitComponent } from "@/hooks/use-git-component";
import { usePointerVars } from "@/hooks/use-pointer-vars";

import styles from "./contact.module.css";

const EMAIL = "utkarshpriyadarshi5026@gmail.com";
const COPIED_RESET_MS = 1600;

export const EmailHighlight: React.FC = () => {
  const ref = useGitComponent("EmailHighlight");
  const ctaRef = useRef<HTMLDivElement>(null);
  usePointerVars(ctaRef);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), COPIED_RESET_MS);
    return () => clearTimeout(timer);
  }, [copied]);

  const copyEmail = () => {
    navigator.clipboard
      ?.writeText(EMAIL)
      .then(() => setCopied(true))
      .catch(() => {});
  };

  return (
    <OutlineNode
      label="Email Highlight"
      icon={<Mail className="w-3 h-3 text-ctp-pink" />}
    >
      <Reveal effect="slide-in" direction="up" duration={0.6} delay={0.3}>
        <div
          ref={ref}
          className="relative overflow-hidden bg-ctp-surface0/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-10 border border-ctp-surface0/50 hover:border-ctp-pink/30 transition-all duration-300 group flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 text-center md:text-left shadow-lg shadow-black/5"
        >
          <div className="relative z-10 flex-1">
            <Heading as="h3" className="mb-2">
              Have a project in mind?
            </Heading>
            <Text variant="lead" as="div">
              Reach out directly at{" "}
              <button
                type="button"
                onClick={copyEmail}
                data-copied={copied || undefined}
                title="Copy to clipboard"
                className={`text-ctp-pink font-source relative group/email cursor-pointer ${styles.copyEmail}`}
              >
                <span className={`select-all ${styles.copyEmailText}`}>
                  {EMAIL}
                </span>
                <span aria-hidden="true" className={styles.copyEmailDone}>
                  <svg viewBox="0 0 16 16" className={styles.copyCheck}>
                    <path d="M3 8.5l3 3 7-7" />
                  </svg>
                  copied to clipboard
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-ctp-pink transition-all duration-300 group-hover/email:w-full" />
              </button>
              <span className="sr-only" aria-live="polite">
                {copied ? "Email address copied to clipboard" : ""}
              </span>
            </Text>
          </div>

          <div
            ref={ctaRef}
            className={`relative z-10 w-full md:w-auto ${styles.magnetic}`}
          >
            <Button
              variant="default"
              className="group/btn relative overflow-hidden bg-ctp-pink text-ctp-crust hover:bg-ctp-pink/90 hover:text-ctp-crust font-semibold px-8 py-6 rounded-xl transition-all duration-300 shadow-lg shadow-ctp-pink/20 hover:shadow-ctp-pink/40 hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] w-full md:w-auto text-sm sm:text-base border-none"
              onClick={() => window.open(`mailto:${EMAIL}`, "_blank")}
            >
              <div className="flex items-center justify-center gap-2">
                <span className="font-bold">Say Hello</span>
                <span className={styles.mailBob}>
                  <Mail className="w-4 h-4" />
                </span>
              </div>
            </Button>
          </div>
        </div>
      </Reveal>
    </OutlineNode>
  );
};
