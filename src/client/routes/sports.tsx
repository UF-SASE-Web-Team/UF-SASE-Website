import { cn } from "@/shared/utils";
import { imageUrls } from "@assets/imageUrls";
import Carousel from "@components/carousel/Carousel";
import { HeaderWithGreenBorder } from "@components/custom_ui/HeaderWithGreenBorder";
import FAQ from "@components/programs/FAQCard";
import { GoalsSection } from "@components/programs/GoalsSection";
import InfoCard from "@components/programs/InfoCard";
import { useIsMobile } from "@hooks/useIsMobile";
import { SportsFAQ } from "@information/ProgramFAQs";
import { SportGoals } from "@information/ProgramGoals";
import { createFileRoute } from "@tanstack/react-router";
import { seo } from "../utils/seo";

export const Route = createFileRoute("/sports")({
  meta: () => [
    ...seo({
      title: "Sports | UF SASE",
      description: "Learn about UF SASE intramual sports teams such as Basketball, Volleyball, Indoor Soccer, Ultimate Frisbee, Pickleball and more.",
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
              SPORTS
            </h2>
          </header>
          <InfoCard
            text={
              <>
                <strong>SASE Intramurals</strong> include{" "}
                <strong>6v6 Indoor Volleyball, Indoor Soccer, Ultimate Frisbee, Doubles Pickleball, Basketball, Tennis, Flag Football </strong> and
                more, available in Fall, Spring, and Summer semesters! SASE Sports provides a fantastic opportunity to meet new people, and the best
                part is, no prior experience is required to play. Make sure to sign up for an amazing experience!
              </>
            }
          />
        </div>

        <div className="flex w-full flex-col items-center pb-10">
          <div className="mx-8 max-w-7xl py-10">
            <Carousel purpose="Images" prog="Sports" />
            <div className="mb-10" />
          </div>

          {/* Testimonials */}
          <div className="mx-8 max-w-7xl py-10">
            <HeaderWithGreenBorder text="Testimonials" type="Subheader" />
            <Carousel purpose="Testimonials" prog="Sports" />
          </div>

          {/* Goals & Outcomes */}
          <GoalsSection goals={SportGoals} />

          {/* FAQs */}
          <div className="mx-8 max-w-7xl pt-10">
            <HeaderWithGreenBorder text="FAQs" type="Subheader" />
            <FAQ faqData={SportsFAQ} />
          </div>
        </div>
      </div>
    );
  },
});
