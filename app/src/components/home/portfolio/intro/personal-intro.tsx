import React, { useRef } from "react";

import Reveal from "@/components/animations/reveal/Reveal";
import SketchBorder from "@/components/ui/sketch-border";
import { Heading, Text } from "@/components/ui/text";
import { useGitComponent } from "@/hooks/use-git-component";
import useMobile from "@/hooks/use-mobile";
import { usePointerVars } from "@/hooks/use-pointer-vars";
import { cn } from "@/lib/utils";

import styles from "./intro.module.css";
import {
  MiniProjects,
  PersonalDescription,
  PersonalTitle,
  ProfileButtons,
  ProfilePicture,
  RustFocus,
} from "./profile";
import { TechSkills } from "./skills";
import { Terminal } from "./terminal";

/** One step of the hero's "boot sequence" stagger. */
const BootItem: React.FC<{ step: number; children: React.ReactNode }> = ({
  step,
  children,
}) => (
  <div
    className={styles.bootItem}
    style={{ "--i": step } as React.CSSProperties}
  >
    {children}
  </div>
);

const DesktopPersonalIntro: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  usePointerVars(cardRef);

  return (
    <>
      <div className="absolute inset-0 -z-20">
        <div
          className="absolute inset-0 opacity-25 mix-blend-overlay"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 70%, rgba(203, 166, 247, 0.15), transparent 40%),
                               radial-gradient(circle at 70% 30%, rgba(137, 180, 250, 0.15), transparent 40%)`,
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-6 md:py-12">
        <div className={cn("mb-10", styles.bootCard)}>
          <SketchBorder
            primaryColor="mauve"
            secondaryColor="blue"
            tertiaryColor="green"
          >
            <div
              ref={cardRef}
              className={cn(
                "relative backdrop-blur-lg bg-gradient-to-b from-ctp-mantle to-ctp-crust rounded-2xl",
                "p-6 md:p-10 shadow-2xl overflow-hidden"
              )}
            >
              {/* Cursor spotlight, driven by usePointerVars */}
              <div aria-hidden="true" className={styles.spotlight} />

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start relative z-10">
                {/* Left Column - Main Content (3 columns) */}
                <div className="lg:col-span-3 space-y-6">
                  <BootItem step={0}>
                    <PersonalTitle />
                  </BootItem>

                  <BootItem step={1}>
                    <PersonalDescription />
                  </BootItem>

                  <BootItem step={2}>
                    <ProfileButtons />
                  </BootItem>

                  <BootItem step={3}>
                    <MiniProjects />
                  </BootItem>

                  <BootItem step={4}>
                    <RustFocus />
                  </BootItem>
                </div>

                {/* Right Column - Visual Content (2 columns) */}
                <div className="lg:col-span-2 h-full">
                  <div className="flex flex-col justify-start h-full gap-8">
                    <BootItem step={1}>
                      <ProfilePicture />
                    </BootItem>

                    <BootItem step={2}>
                      <Terminal />
                    </BootItem>

                    <BootItem step={3}>
                      <div className="border-t border-ctp-surface1/20 pt-6 mt-2">
                        <TechSkills />
                      </div>
                    </BootItem>
                  </div>
                </div>
              </div>
            </div>
          </SketchBorder>
        </div>
      </div>
    </>
  );
};

const MobilePersonalIntro: React.FC = () => {
  return (
    <>
      <div className="absolute inset-0 -z-20">
        <Reveal duration={1.2} delay={0.5}>
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 30%, rgba(203, 166, 247, 0.1), transparent 60%)`,
            }}
          />
        </Reveal>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-6">
        <Reveal duration={0.8} delay={0.1} className="mb-8">
          <SketchBorder primaryColor="mauve" secondaryColor="pink" rotation={1}>
            <div
              className={cn("bg-transparent rounded-xl", "p-4 overflow-hidden")}
            >
              {/* Mobile-first vertical layout */}
              <div className="space-y-8">
                {/* Header Section */}
                <div className="text-center space-y-6">
                  <Reveal effect="zoom-in" delay={0.3}>
                    <div className="inline-block">
                      <ProfilePicture />
                    </div>
                  </Reveal>

                  <Reveal delay={0.5}>
                    <PersonalTitle />
                  </Reveal>
                </div>

                {/* Description */}
                <Reveal effect="fade-up" delay={0.7}>
                  <PersonalDescription />
                </Reveal>

                {/* Action Buttons */}
                <Reveal delay={0.9}>
                  <ProfileButtons />
                </Reveal>

                {/* Mobile Terminal - Compact Version */}
                <Reveal delay={1.1}>
                  <Terminal />
                </Reveal>

                {/* Rust Focus */}
                <Reveal effect="fade-up" delay={1.3}>
                  <RustFocus />
                </Reveal>
              </div>
            </div>
          </SketchBorder>
        </Reveal>

        {/* Tech Skills integrated into mobile layout */}
        <Reveal delay={1.3} className="mt-8">
          <SketchBorder
            primaryColor="teal"
            secondaryColor="blue"
            primaryOpacity={30}
            secondaryOpacity={20}
            rotation={1}
          >
            <div
              className={cn(
                "backdrop-blur-md bg-gradient-to-b from-ctp-mantle/80 to-ctp-crust/60 rounded-xl",
                "p-4 shadow-xl border-t border-ctp-surface1/20"
              )}
            >
              <div className="text-center mb-4">
                <Heading as="h3" className="mb-1">
                  Tech Stack
                </Heading>
                <Text variant="muted" className="text-ctp-subtext1">
                  Technologies I work with
                </Text>
              </div>
              <TechSkills />
            </div>
          </SketchBorder>
        </Reveal>
      </div>
    </>
  );
};

/**
 * Enhanced PersonalHeader with separate mobile and desktop optimized layouts
 *
 * This component chooses between completely different structures based on device type,
 * providing optimal experiences for each platform.
 */
const PersonalIntro: React.FC = () => {
  const { isMobile } = useMobile();
  const ref = useGitComponent(PersonalIntro);

  return (
    <div ref={ref}>
      <div className="relative isolate min-h-screen overflow-hidden">
        {isMobile ? <MobilePersonalIntro /> : <DesktopPersonalIntro />}
      </div>
    </div>
  );
};

export default PersonalIntro;
