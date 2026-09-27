import React, { useState } from "react";
import { FaAward, FaCheck, FaStar } from "react-icons/fa";

import Reveal from "@/components/animations/reveal/Reveal";
import GradientText from "@/components/ui/gradient-text";
import { Heading } from "@/components/ui/text";
import { useGitComponent } from "@/hooks/use-git-component";
import { useInView } from "@/hooks/use-in-view";
import { useMobileContext } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

import styles from "./featured-project.module.css";
import ProjectContent from "./project-content";

interface FeaturedProjectProps {
  featuredProject: Project;
  handleProjectSelect: (project: Project) => void;
}
type Tab = "overview" | "features";

const FeaturedProject: React.FC<FeaturedProjectProps> = ({
  featuredProject,
  handleProjectSelect,
}) => {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const { isMobile } = useMobileContext();
  const gitRef = useGitComponent(FeaturedProject);
  const inView = useInView(gitRef, { once: true, margin: "-10% 0px" });

  return (
    <div
      ref={gitRef}
      data-inview={inView || undefined}
      className="mb-16 max-w-6xl mx-auto relative"
    >
      <FeaturedHeader />
      <div className={cn("relative", styles.cardEnter)}>
        {/* One-shot glow when the pipeline "ships" */}
        <span aria-hidden="true" className={styles.shipRing} />
        {/* Main content card */}
        <div
          className={cn(
            "relative rounded-xl overflow-auto shadow-xl",
            !isMobile && "bg-gradient-to-br from-ctp-mantle to-ctp-crust"
          )}
        >
          <div className="relative px-8 pt-8 pb-4">
            {!isMobile && (
              <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-ctp-peach/20 text-ctp-peach border border-ctp-peach/10 text-xs font-semibold">
                <FaStar className="text-ctp-peach" />
                Featured
              </div>
            )}

            <Heading as="h2" className="text-pretty">
              <GradientText from="peach" via="maroon" to="peach">
                {featuredProject.name}
              </GradientText>
            </Heading>
          </div>

          {/* Tab navigation */}
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

          <div
            className={cn(
              "p-8",
              !isMobile && "bg-gradient-to-br from-ctp-mantle to-ctp-crust"
            )}
          >
            <div className="flex flex-col xl:flex-row gap-10 items-center">
              {isMobile && activeTab === "overview" && (
                <Certificate name={featuredProject.name} />
              )}
              <ProjectContent
                activeTab={activeTab}
                featuredProject={featuredProject}
                handleProjectSelect={handleProjectSelect}
              />
              {!isMobile && <Certificate name={featuredProject.name} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface TabNavigationProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <div className="flex">
      <button
        className={`px-6 py-2.5 text-sm font-medium transition-colors relative ${
          activeTab === "overview"
            ? "text-ctp-peach"
            : "text-ctp-subtext0 hover:text-ctp-text"
        }`}
        onClick={() => setActiveTab("overview")}
      >
        Overview
        {activeTab === "overview" && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-ctp-peach" />
        )}
      </button>
      <button
        className={`px-6 py-2.5 text-sm font-medium transition-colors relative ${
          activeTab === "features"
            ? "text-ctp-peach"
            : "text-ctp-subtext0 hover:text-ctp-text"
        }`}
        onClick={() => setActiveTab("features")}
      >
        Key Features
        {activeTab === "features" && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-ctp-peach" />
        )}
      </button>
    </div>
  );
};

const PIPELINE_STAGES = ["lint", "test", "build", "deploy"] as const;

/**
 * FeaturedHeader shows the award icon and title, followed by a mini CI
 * pipeline whose stages pass one after another when the featured project
 * scrolls into view (driven by `data-inview` on the FeaturedProject root).
 */
const FeaturedHeader: React.FC = () => {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className={styles.sparkleIcon}>
        <div className="p-2 bg-gradient-to-r from-ctp-peach to-ctp-yellow rounded-full">
          <FaAward className="w-5 h-5 text-ctp-crust" />
        </div>
      </div>

      <Heading as="h3" className={styles.titleSlideIn}>
        <GradientText from="peach" to="yellow">
          Featured Project
        </GradientText>
      </Heading>

      <div
        className={styles.pipeline}
        role="img"
        aria-label="Build pipeline: lint, test, build and deploy all passed"
      >
        {PIPELINE_STAGES.map((stage, i) => (
          <React.Fragment key={stage}>
            <span
              className={styles.pipeLink}
              style={{ "--i": i } as React.CSSProperties}
            />
            <span
              className={styles.pipeStage}
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className={styles.pipeDot}>
                <FaCheck className={styles.pipeCheck} />
              </span>
              <span className={styles.pipeLabel}>{stage}</span>
            </span>
          </React.Fragment>
        ))}
        <span className={styles.pipeTail} />
      </div>
    </div>
  );
};

interface CertificateProps {
  name: string;
}

const Certificate: React.FC<CertificateProps> = ({ name }) => {
  return (
    <div className="xl:w-1/2">
      <Reveal
        effect="zoom-in"
        duration={0.7}
        delay={0.4}
        className="relative mx-auto max-w-md"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-ctp-peach to-ctp-blue opacity-50 rounded-xl blur-sm" />
        <div className="absolute -inset-1 bg-ctp-crust rounded-xl" />

        <div className="relative rounded-lg overflow-hidden border-2 border-ctp-surface0">
          <img
            src="skoda-certificate.jpg"
            alt={`${name} Certificate`}
            className="w-full h-auto object-cover z-10 relative"
          />

          <div className="absolute inset-0 bg-gradient-to-tr from-ctp-peach/5 via-white/5 to-ctp-blue/5 z-20" />
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_rgb(var(--ctp-blue)),_transparent_70%)]" />
        </div>

        <div className="absolute -bottom-3 -right-3 z-30">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-ctp-peach to-ctp-blue rounded-full blur-sm" />
            <div className="relative p-2 bg-ctp-crust rounded-full border border-ctp-surface0">
              <FaStar className="w-5 h-5 text-ctp-yellow" />
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
};

export default FeaturedProject;
