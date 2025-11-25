import FAQ from "@components/programs/FAQCard";
import GoalCard from "@components/programs/GoalCard";
import InfoCard from "@components/programs/InfoCard";
import { createFileRoute } from "@tanstack/react-router";
import { imageUrls } from "@assets/imageUrls";
import Carousel from "@components/carousel/Carousel";
import { SportsFAQ } from "@information/ProgramFAQs";
import { seo } from "../utils/seo";
import { useIsMobile } from "@hooks/useIsMobile";
import { cn } from "@/shared/utils";
import { HeaderWithGreenBorder } from "@components/custom_ui/HeaderWithGreenBorder";
import { SportGoals } from "@information/ProgramGoals";

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
      <div className="py-10 flex min-h-screen w-full flex-col justify-center items-center bg-background">
        <div className={cn({"flex-row gap-24" : !isMobile, "flex-col gap-4": isMobile},"px-4 flex w-full max-w-7xl items-start pb-10")}>
          <header className="flex items-center">
            {/* Green Line and Text in Row */}
            <div className="mr-5 h-40 w-1.5 bg-saseGreen rounded-sm"></div>
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
        
        <div className="w-full pb-10 flex flex-col items-center">
          <div className="max-w-7xl">
            <Carousel purpose="Images" prog="Sports" />
            <div className="mb-10" />
          </div>

          {/* Testimonials */}
          <div className="py-10 max-w-7xl">
            <HeaderWithGreenBorder text="Testimonials" type="Subheader"/>
            <Carousel purpose="Testimonials" prog="Sports" />
          </div>

          {/* Goals & Outcomes */}
          <div className="w-full py-10 bg-saseGrayLight flex justify-center dark:bg-black">
            <div className="w-full max-w-7xl">
              <HeaderWithGreenBorder text="Goals & Outcomes" type="Subheader"/>
              <div className={cn({"flex-col gap-10" : isMobile, "flex-row gap-36" : !isMobile},"px-8 flex flex-nowrap items-center justify-center")}>
                {SportGoals.map((goal, index) => (
                  <GoalCard text={goal.text} color={goal.color} mobileAlign={goal.mobileAlign} key={index}/>
                ))}  
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="pt-10 max-w-7xl">
            <HeaderWithGreenBorder text="FAQs" type="Subheader"/>
            <FAQ faqData={SportsFAQ} />
          </div>
        </div>
      </div>
    );
  },
});
