import { imageUrls } from "@assets/imageUrls";
import Carousel from "@components/carousel/Carousel";
import FAQ from "@components/programs/FAQCard";
import { InternsFAQ } from "../information/ProgramFAQs";
import GoalCard from "@components/programs/GoalCard";
import InfoCard from "@components/programs/InfoCard";
import { createFileRoute } from "@tanstack/react-router";
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
    return (
      <div className="mt-12 flex min-h-screen flex-col items-center bg-background">
        <div className="flex w-full max-w-7xl flex-col items-start px-4 py-8 sm:flex-row">
          <header className="mr-8 mt-10 flex items-center px-5">
            {/* Green Line and Text in Row */}
            <div className="mr-5 h-40 w-1.5 bg-saseGreen"></div>
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
        <div className="w-full max-w-7xl px-4 py-8">
          <Carousel purpose="Images" prog="Interns" />
          <div className="mb-24" />
          <header className="mb-6 flex max-w-7xl items-center px-5 font-oswald">
            <div className="mr-3 h-11 w-1.5 bg-saseGreen"></div>
            <h2 className="text-4xl text-foreground">Testimonials</h2>
          </header>
          <Carousel purpose="Testimonials" prog="Interns" />
          <div className="mb-24" />
          <header className="mb-12 flex max-w-7xl items-center px-5 font-oswald">
            <div className="mr-3 h-11 w-1.5 bg-saseGreen"></div>
            <h2 className="text-4xl text-foreground">Goals & Outcomes</h2>
          </header>
          <div className="mb-24 flex flex-col flex-nowrap items-center justify-center gap-10 md:flex-row lg:gap-36">
            <GoalCard text="Get more involved in SASE, especially for first and second years." color="blue" />
            <GoalCard text="Develop essential professional skills and experiences to add to your resume." color="green" />
            <GoalCard text="Connect with other SASErs and board members through intern-exclusive networking events." color="blue" />
          </div>
          <header className="flex max-w-7xl items-center px-5 font-oswald">
            <div className="mr-3 h-11 w-1.5 bg-saseGreen"></div>
            <h2 className="text-4xl text-foreground">FAQs</h2>
          </header>
          <FAQ faqData={InternsFAQ} />
        </div>
      </div>
    );
  },
});
