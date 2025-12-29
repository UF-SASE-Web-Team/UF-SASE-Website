import { GoalsSection } from "@/client/components/programs/GoalsSection";
import { cn } from "@/shared/utils";
import { imageUrls } from "@assets/imageUrls";
import Carousel from "@components/carousel/Carousel";
import { HeaderWithGreenBorder } from "@components/custom_ui/HeaderWithGreenBorder";
import { ApplicationPhoto } from "@components/programs/ApplicationPhoto";
import FAQ from "@components/programs/FAQCard";
import InfoCard from "@components/programs/InfoCard";
import { useIsMobile } from "@hooks/useIsMobile";
import { InternGoals } from "@information/ProgramGoals";
import { createFileRoute } from "@tanstack/react-router";
import { InternsFAQ } from "../information/ProgramFAQs";
import { seo } from "../utils/seo";

export const Route = createFileRoute("/interns")({
  meta: () => [
    ...seo({
      title: "Interns | UF SASE",
      description:
        "Learn about SASE interns, a program where you can help execute a project for the UF SASE community, hone your communication, event planning, and leadership skills",
      image: imageUrls["SASELogo.png"],
    }),
  ],

  component: () => {
    const isMobile = useIsMobile();

    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background py-10">
        <div className={cn({ "flex-row gap-24": !isMobile, "flex-col gap-4": isMobile }, "flex w-full max-w-7xl items-start px-4 pb-10")}>
          <header className="flex items-center">
            {/* Green Line and Text in Row */}
            <div className="mr-5 h-40 w-1.5 rounded-sm bg-saseGreen"></div>
            <h2 className="font-oswald text-7xl font-semibold leading-tight text-foreground">
              SASE
              <br />
              INTERNS
            </h2>
          </header>
          <InfoCard
            text={
              <>
                <strong>SASE Interns</strong> collaborate with other members to execute a project for the SASE community, honing your communication,
                event planning, and leadership skills. Throughout the process, interns will gain <strong>experience to add to your resume</strong> and
                talk about during job interviews. Interns will also obtain <strong>behind-the-scenes insights</strong> through board presentations and
                shadowing opportunities—valuable for future leadership roles in and out of SASE. Aside from projects, interns will have the chance to
                network and connect through <strong>interns-only</strong> socials and Board x Interns events.
              </>
            }
          />
        </div>

        <div className="flex w-full flex-col items-center pb-10">
          {/* Group Picture & App Status */}
          <div className="flex w-full flex-col items-center justify-center bg-black py-10 dark:bg-greenBackground">
            <ApplicationPhoto image={imageUrls["SaseInterns.png"]} applicationStatus="OPEN" nextSemester="Spring 2026" />
          </div>

          {/* Testimonials */}
          <div className="max-w-7xl py-10">
            <HeaderWithGreenBorder text="Testimonials" type="Subheader" />
            <Carousel purpose="Testimonials" prog="Interns" />
          </div>

          {/* Goals & Outcomes */}
          <GoalsSection goals={InternGoals} />

          {/* FAQs */}
          <div className="max-w-7xl pt-10">
            <HeaderWithGreenBorder text="FAQs" type="Subheader" />
            <FAQ faqData={InternsFAQ} />
          </div>
        </div>
      </div>
    );
  },
});
