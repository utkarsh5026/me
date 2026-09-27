import { BookOpen, FolderOpen, Lightbulb } from "lucide-react";
import React, { useCallback, useRef, useState } from "react";

import Reveal from "@/components/animations/reveal/Reveal";
import { OutlineNode } from "@/components/home/editor/outline";
import Section from "@/components/home/editor/section/portfolio-section";
import QuoteBlock from "@/components/ui/quote-block";
import { useGitComponent } from "@/hooks/use-git-component";
import { useInView } from "@/hooks/use-in-view";
import useKeydown from "@/hooks/use-keydown";
import { ctpAccentStyle } from "@/lib/ctp-colors";
import type { TechnologyLearning } from "@/types";

import { currentLearningTechnologies } from "./data";
import styles from "./learning.module.css";
import LearningCard from "./learning-card";
import LearningJourney from "./learning-journey/learning-journey";
import LearningModal from "./learning-project-drawer";
import { getCategoryColor } from "./utils";

type Category = (typeof currentLearningTechnologies)[number]["category"];

const categorizedTech = currentLearningTechnologies.reduce(
  (acc, tech) => {
    if (!acc[tech.category]) {
      acc[tech.category] = [];
    }
    acc[tech.category].push(tech);
    return acc;
  },
  {} as Record<Category, TechnologyLearning[]>
);

interface CategoryBlockProps {
  category: string;
  techs: TechnologyLearning[];
  onSelect: (tech: TechnologyLearning) => void;
}

/** A category header pill plus its cards; animates once scrolled into view. */
const CategoryBlock: React.FC<CategoryBlockProps> = ({
  category,
  techs,
  onSelect,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const color = getCategoryColor(category);

  return (
    <div
      ref={ref}
      data-inview={inView || undefined}
      style={ctpAccentStyle(color)}
      className="space-y-6"
    >
      {/* Category Header */}
      <div className={`flex items-center gap-3 ${styles.categoryHeader}`}>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-ctp-surface1 to-transparent" />
        <div className="flex items-center gap-2 px-4 py-2 bg-ctp-surface0/50 rounded-full border border-ctp-surface1/50">
          <div
            className={`w-2 h-2 rounded-full bg-ctp-${color} ${styles.categoryDot}`}
          />
          <span className="text-sm font-medium text-ctp-text">{category}</span>
          <span className="text-xs text-ctp-subtext0">
            (
            <span
              aria-hidden="true"
              className={inView ? "count-up" : undefined}
              style={{ "--count-to": techs.length } as React.CSSProperties}
            />
            <span className="sr-only">{techs.length}</span>)
          </span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-ctp-surface1 to-transparent" />
      </div>

      {/* Technology Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {techs.map((tech, techIndex) => (
          <OutlineNode key={tech.name} label={tech.name} icon={tech.icon}>
            <LearningCard
              tech={tech}
              category={category}
              onSelect={onSelect}
              index={techIndex}
              categoryColor={color}
            />
          </OutlineNode>
        ))}
      </div>
    </div>
  );
};

const CurrentLearning: React.FC = () => {
  const ref = useGitComponent(CurrentLearning);
  const [selectedTech, setSelectedTech] = useState<TechnologyLearning | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isJourneyOpen, setIsJourneyOpen] = useState(false);

  const handleTechSelect = (tech: TechnologyLearning) => {
    setSelectedTech(tech);
    setIsModalOpen(true);
  };

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedTech(null), 300);
  }, []);

  useKeydown("Escape", closeModal);

  return (
    <Section
      id="learning"
      label="Learning Journey"
      title="Current Learning"
      description="Exploring new technologies and building projects to expand my knowledge"
      headerIcon={BookOpen}
      icon="code"
      showHeader={true}
    >
      <div ref={ref} className="w-full max-w-6xl mx-auto px-4 py-12">
        <Reveal effect="fade-up" duration={0.7} delay={0.1}>
          <QuoteBlock
            quote="Any fool can write code that a computer can understand. Good programmers write code that humans can understand."
            attribution="— Martin Fowler"
            className="mb-8"
          />
        </Reveal>
        <Reveal
          effect="blur-in"
          duration={0.6}
          delay={0.2}
          className="text-center mb-8"
        >
          <button
            onClick={() => setIsJourneyOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-ctp-surface0/80 hover:bg-ctp-surface1/80 rounded-full text-ctp-text font-medium border border-ctp-surface1/50 hover:border-ctp-peach/80 transition-all duration-300 backdrop-blur-sm interactive-scale"
          >
            <Lightbulb className="w-4 h-4" />
            <span>Learning Journey</span>
          </button>
        </Reveal>

        {/* Category Sections */}
        <div className="space-y-12">
          {Object.entries(categorizedTech).map(([category, techs]) => (
            <OutlineNode
              key={category}
              label={category}
              icon={
                <FolderOpen
                  className={`w-3 h-3 text-ctp-${getCategoryColor(category)}`}
                />
              }
            >
              <CategoryBlock
                category={category}
                techs={techs}
                onSelect={handleTechSelect}
              />
            </OutlineNode>
          ))}
        </div>

        {/* Modals */}
        <LearningModal
          isModalOpen={isModalOpen}
          selectedTech={selectedTech}
          closeModal={closeModal}
        />

        <LearningJourney
          isOpen={isJourneyOpen}
          onClose={() => setIsJourneyOpen(false)}
        />
      </div>
    </Section>
  );
};

export default CurrentLearning;
