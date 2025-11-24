import { imageUrls } from "@assets/imageUrls";
import Carousel from "@components/carousel/Carousel";
import FAQ from "@components/programs/FAQCard";
import { InternsFAQ } from "../information/ProgramFAQs";
import GoalCard from "@components/programs/GoalCard";
import InfoCard from "@components/programs/InfoCard";
import { createFileRoute } from "@tanstack/react-router";
import { seo } from "../utils/seo";
import { useIsMobile } from "@hooks/useIsMobile";
import { cn } from "@/shared/utils";
import { HeaderWithGreenBorder } from "@components/custom_ui/HeaderWithGreenBorder";
import InternsPhoto from "@assets/interns/SaseInterns.png"
import { ApplicationPhoto } from "@components/programs/ApplicationPhoto";

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
      <div className="py-10 flex min-h-screen w-full flex-col justify-center items-center bg-background">
        <div className={cn({"flex-row gap-24" : !isMobile, "flex-col gap-4": isMobile},"px-4 flex w-full max-w-7xl items-start pb-10")}>
          <header className="flex items-center">
            {/* Green Line and Text in Row */}
            <div className="mr-5 h-40 w-1.5 bg-saseGreen rounded-sm"></div>
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

        <div className="w-full py-10 flex flex-col items-center">
          {/* Group Picture & App Status */}
          <div className="bg-black py-10 w-full flex flex-col justify-center items-center">
            <ApplicationPhoto image={InternsPhoto} applicationStatus="CLOSED" nextSemester="Spring 2026"/>
          </div>

          {/* Testimonials */}
          <div className="py-10 max-w-7xl">
            <HeaderWithGreenBorder text="Testimonials" type="Subheader"/>
            <Carousel purpose="Testimonials" prog="Interns" />
          </div>

          {/* Goals & Outcomes */}
          <div className="w-full py-10 bg-saseGrayLight flex justify-center">
            <div className="w-full max-w-7xl">
              <HeaderWithGreenBorder text="Goals & Outcomes" type="Subheader"/>
              <div className={cn({"flex-col gap-10" : isMobile, "flex-row gap-36" : !isMobile},"px-8 flex flex-nowrap items-center justify-center")}>
                <GoalCard text="> Get more involved in SASE, especially for first and second years." color="blue" mobileAlign="left"/>
                <GoalCard text="> Develop essential professional skills and experiences to add to your resume." color="green" mobileAlign="right"/>
                <GoalCard text="> Connect with other SASErs and board members through intern-exclusive networking events." color="blue" mobileAlign="left"/>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="pt-10 max-w-7xl">
            <HeaderWithGreenBorder text="FAQs" type="Subheader"/>
            <FAQ faqData={InternsFAQ} />
          </div>
        </div>
      </div>
    );
  },
});
