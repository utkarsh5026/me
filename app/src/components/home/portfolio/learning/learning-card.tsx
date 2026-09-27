import { ArrowRight } from "lucide-react";

import IconBox from "@/components/ui/icon-box";
import { Heading, Text } from "@/components/ui/text";
import { useGitComponent } from "@/hooks/use-git-component";
import { useInView } from "@/hooks/use-in-view";
import { AppColor } from "@/lib/ctp-colors";
import { TechnologyLearning } from "@/types";

import styles from "./learning.module.css";

interface LearningCardProps {
  tech: TechnologyLearning;
  category: string;
  onSelect: (tech: TechnologyLearning) => void;
  index: number;
  categoryColor: AppColor;
}

const LearningCard: React.FC<LearningCardProps> = ({
  tech,
  category,
  onSelect,
  index,
  categoryColor,
}) => {
  const ref = useGitComponent(LearningCard);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div
      ref={ref}
      data-inview={inView || undefined}
      style={{ "--i": index } as React.CSSProperties}
      className={`group cursor-pointer h-full block ${styles.arrowGroup} ${styles.learningCard}`}
      onClick={() => onSelect(tech)}
    >
      <div
        className={`relative h-full bg-gradient-to-b from-ctp-mantle to-ctp-crust backdrop-blur-sm rounded-2xl p-6 border-none hover:border-ctp-surface2/80 transition-all duration-300 hover:bg-ctp-surface0/80 ${styles.traceRing}`}
      >
        <div className="flex items-start justify-between mb-4">
          <IconBox
            color={categoryColor}
            size="md"
            className="group-hover:scale-105 transition-transform duration-300"
          >
            {tech.icon}
          </IconBox>

          <div
            className={`opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${styles.arrowHover}`}
          >
            <ArrowRight className="w-4 h-4 text-ctp-subtext0" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <Heading
            as="h3"
            className="group-hover:text-ctp-lavender transition-colors duration-300"
          >
            {tech.name}
          </Heading>

          <Text variant="lead" className="line-clamp-3">
            {tech.description}
          </Text>

          {/* Learning Goals Preview */}
          <div className="pt-2">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-1 h-1 rounded-full bg-ctp-${categoryColor}`} />
              <span className="text-xs md:text-sm font-medium text-ctp-subtext1">
                Learning Focus
              </span>
            </div>
            <Text variant="body" className="line-clamp-2">
              {tech.learningGoals[0]}
            </Text>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-ctp-surface1/30">
          <div className="flex items-center justify-between">
            <span
              className={`text-xs md:text-sm px-2 py-1 rounded-full bg-ctp-${categoryColor}/10 text-ctp-${categoryColor} font-medium`}
            >
              {category}
            </span>

            <div className="flex items-center gap-1">
              <div
                className={`w-1.5 h-1.5 rounded-full bg-ctp-${categoryColor}`}
              />
              <span className="text-xs md:text-sm text-ctp-subtext0">
                Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningCard;
