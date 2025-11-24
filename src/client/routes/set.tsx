import Carousel from "@/client/components/carousel/Carousel";
import FAQ from "@components/programs/FAQCard";
import GoalCard from "@components/programs/GoalCard";
import InfoCard from "@components/programs/InfoCard";
import { createFileRoute } from "@tanstack/react-router";
import { imageUrls } from "../assets/imageUrls";
import { SetFAQ } from "../information/ProgramFAQs";
import { seo } from "../utils/seo";
import { cn } from "@/shared/utils";
import { useIsMobile } from "@hooks/useIsMobile";
import { HeaderWithGreenBorder } from "@components/custom_ui/HeaderWithGreenBorder";
import SETPhoto from "@assets/set/SETPHOTO3.jpg"
import { ApplicationPhoto } from "@components/programs/ApplicationPhoto";

export const Route = createFileRoute("/set")({
  meta: () => [
    ...seo({
      title: "SET | UF SASE",
      description:
        "SASE Engineering Team (SET) collaborates to design and execute a yearlong project that showcases technical creativity and problem-solving.",
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
            <div className="mr-5 h-52 w-1.5 bg-saseGreen rounded-sm"></div>
            <h2 className="font-oswald text-6xl sm:text-7xl font-semibold leading-tight text-foreground">
              SASE
              <br />
              ENGINEERING
              <br />
              TEAM
            </h2>
          </header>
          <InfoCard
            text={
              <>
                The <strong>SASE Engineering Team (SET)</strong> collaborates to design and execute a yearlong project that showcases{" "}
                <strong>technical creativity</strong> and <strong>problem-solving</strong>. By working on the project, members will enhance their
                engineering, collaboration, and project management skills while gaining hands-on experience to highlight on their resumes and discuss
                in interviews. Are you passionate about technology and eager to develop your skills in a collaborative, hands-on environment? The SASE
                Engineering Team is your chance to make a real impact! Everyone of all skill levels are encouraged to apply!
              </>
            }
          />
        </div>

        <div className="w-full py-10 flex flex-col items-center">
          {/* Group Picture & App Status */}
          <div className="bg-black py-10 w-full flex flex-col justify-center items-center">
            <ApplicationPhoto image={SETPhoto} applicationStatus="CLOSED" nextSemester="Spring 2026"/>
          </div>

           {/* Past Projects */}
          <div className="py-10 max-w-7xl">
            <HeaderWithGreenBorder text="Past Projects" type="Subheader"/>
            <Carousel purpose="Testimonials" prog="SET" />
          </div>

          {/* Goals & Outcomes */}
          <div className="w-full py-10 bg-saseGrayLight flex justify-center">
            <div className="w-full max-w-7xl">
              <HeaderWithGreenBorder text="Goals & Outcomes" type="Subheader"/>
              <div className={cn({"flex-col gap-10" : isMobile, "flex-row gap-36" : !isMobile},"px-8 flex flex-nowrap items-center justify-center")}>
                <GoalCard text="> Get more involved in SASE, especially for first and second years." color="blue" mobileAlign="left"/>
                <GoalCard text="> Develop essential professional skills and experiences to add to your resume." color="green" mobileAlign="right"/>
                <GoalCard text="> Connect with other SASErs and develop leadership skills through hands-on projects." color="blue" mobileAlign="left"/>
              </div>
            </div>
          </div>

         {/* FAQs */}
          <div className="pt-10 max-w-7xl">
            <HeaderWithGreenBorder text="FAQs" type="Subheader"/>
            <FAQ faqData={SetFAQ} />
          </div>
        </div>
      </div>
    );
  },
});
