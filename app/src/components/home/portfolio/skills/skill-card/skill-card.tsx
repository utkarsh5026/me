import IconBox from "@/components/ui/icon-box";
import { Heading, Text } from "@/components/ui/text";
import { useGitComponent } from "@/hooks/use-git-component";
import { useInView } from "@/hooks/use-in-view";
import { AppColor, ctpAccentStyle } from "@/lib/ctp-colors";
import { cn } from "@/lib/utils";

import { skillCategories } from "../data";
import styles from "../skills.module.css";
import ExpandedSkillsContent from "./expanded-content";

interface SkillCardProps {
  category: (typeof skillCategories)[number];
  index: number;
}

/** Card entrance stagger, in ms. Mirrors `--d` in skills.module.css. */
const CARD_STAGGER_MS = 80;
/** When the "resolving…" status flips to the package count, in ms. */
const STATUS_DONE_MS = 350;

const SkillCard: React.FC<SkillCardProps> = ({ category, index }) => {
  const gitRef = useGitComponent(SkillCard);
  const inView = useInView(gitRef, { once: true, margin: "-10% 0px" });
  const packageCount = category.skills.length;

  return (
    <div className="group w-full h-full">
      <div
        ref={gitRef}
        data-glow=""
        data-inview={inView || undefined}
        style={
          {
            ...ctpAccentStyle(category.color as AppColor),
            "--card": index,
          } as React.CSSProperties
        }
        className={cn(
          "relative h-full bg-ctp-surface0/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 border-none w-full overflow-hidden",
          styles.card
        )}
      >
        {/* Category Header */}
        <div className="flex items-center gap-3 sm:gap-4 mb-6">
          <IconBox
            color={category.color as AppColor}
            size="md"
            className={`bg-ctp-${category.color}/15`}
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7">
              {category.icon}
            </div>
          </IconBox>
          <div className="min-w-0 flex-1">
            <Heading as="h4" className="leading-tight break-words">
              {category.title}
            </Heading>
            <Text variant="caption" className="mt-0.5 break-words">
              {category.description}
            </Text>
          </div>

          {/* `npm install` style status: resolving… → ✓ added N packages */}
          <div className={styles.status} aria-hidden="true">
            <span className={styles.statusPending}>resolving…</span>
            <span className={styles.statusDone}>
              <span className="text-ctp-green">✓</span> added{" "}
              <span
                className={cn("text-ctp-text", inView && "count-up")}
                style={
                  {
                    "--count-to": packageCount,
                    animationDelay: `${index * CARD_STAGGER_MS + STATUS_DONE_MS}ms`,
                    animationDuration: `${300 + packageCount * 40}ms`,
                  } as React.CSSProperties
                }
              />{" "}
              {packageCount === 1 ? "package" : "packages"}
            </span>
          </div>
        </div>

        {/* All Skills */}
        <ExpandedSkillsContent category={category} />
      </div>
    </div>
  );
};

export default SkillCard;
