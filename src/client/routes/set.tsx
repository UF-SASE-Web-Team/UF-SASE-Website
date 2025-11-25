import Carousel from "@/client/components/carousel/Carousel";
import { cn } from "@/shared/utils";
import SETPhoto from "@assets/set/SETPHOTO3.jpg";
import { HeaderWithGreenBorder } from "@components/custom_ui/HeaderWithGreenBorder";
import { ApplicationPhoto } from "@components/programs/ApplicationPhoto";
import FAQ from "@components/programs/FAQCard";
import GoalCard from "@components/programs/GoalCard";
import InfoCard from "@components/programs/InfoCard";
import { useIsMobile } from "@hooks/useIsMobile";
import { SetGoals } from "@information/ProgramGoals";
import { createFileRoute } from "@tanstack/react-router";
import { imageUrls } from "../assets/imageUrls";
import { SetFAQ } from "../information/ProgramFAQs";
import { seo } from "../utils/seo";

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
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background py-10">
        <div className={cn({ "flex-row gap-24": !isMobile, "flex-col gap-4": isMobile }, "flex w-full max-w-7xl items-start px-4 pb-10")}>
          <header className="flex items-center">
            {/* Green Line and Text in Row */}
            <div className="mr-5 h-52 w-1.5 rounded-sm bg-saseGreen"></div>
            <h2 className="font-oswald text-6xl font-semibold leading-tight text-foreground sm:text-7xl">
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

        <div className="flex w-full flex-col items-center pb-10">
          {/* Group Picture & App Status */}
          <div className="flex w-full flex-col items-center justify-center bg-black py-10">
            <ApplicationPhoto image={SETPhoto} applicationStatus="CLOSED" nextSemester="Spring 2026" />
          </div>

          {/* Past Projects */}
          <div className="max-w-7xl py-10">
            <HeaderWithGreenBorder text="Past Projects" type="Subheader" />
            <Carousel purpose="Testimonials" prog="SET" />
          </div>

          {/* Goals & Outcomes */}
          <div className="flex w-full justify-center bg-saseGrayLight py-10 dark:bg-black">
            <div className="w-full max-w-7xl">
              <HeaderWithGreenBorder text="Goals & Outcomes" type="Subheader" />
              <div className={cn({ "flex-col gap-10": isMobile, "flex-row gap-36": !isMobile }, "flex flex-nowrap items-center justify-center px-8")}>
                {SetGoals.map((goal, index) => (
                  <GoalCard text={goal.text} color={goal.color} mobileAlign={goal.mobileAlign} key={index} />
                ))}
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="max-w-7xl pt-10">
            <HeaderWithGreenBorder text="FAQs" type="Subheader" />
            <FAQ faqData={SetFAQ} />
          </div>
        </div>
      </div>
    );
  },
});
