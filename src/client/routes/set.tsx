import Carousel from "@/client/components/carousel/Carousel";
import FAQ from "@components/programs/FAQCard";
import GoalCard from "@components/programs/GoalCard";
import InfoCard from "@components/programs/InfoCard";
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
    return (
      <div className="mt-12 flex min-h-screen flex-col items-center bg-background">
        <div className="flex w-full max-w-7xl flex-col items-start px-4 py-8 lg:flex-row">
          <header className="mr-8 mt-10 flex items-center px-5">
            {/* Green Line and Text in Row */}
            <div className="mr-5 h-52 w-1.5 bg-saseGreen"></div>
            <h2 className="font-oswald text-5xl font-semibold leading-tight text-foreground sm:text-7xl">
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
        <div className="w-full max-w-7xl px-4 py-8">
          <Carousel purpose="Images" prog="SET" />
          <div className="mb-16" />
          <header className="mb-6 flex max-w-7xl items-center px-5">
            <div className="mr-3 h-11 w-1.5 bg-saseGreen"></div>
            <h2 className="font-oswald text-4xl text-foreground">Past Projects</h2>
          </header>
          <Carousel purpose="Testimonials" prog="SET" />
          <div className="mb-16" />
          <header className="mb-12 flex max-w-7xl items-center px-5">
            <div className="mr-3 h-11 w-1.5 bg-saseGreen"></div>
            <h2 className="font-oswald text-4xl text-foreground">Goals & Outcomes</h2>
          </header>
          <div className="mb-16 flex flex-col flex-nowrap items-center justify-center gap-10 md:flex-row lg:gap-36">
            <GoalCard text="Get more involved in SASE, especially for first and second years." color="blue" />
            <GoalCard text="Develop essential technical skills and experiences to add to your resume." color="green" />
            <GoalCard text="Connect with other SASErs and develop leadership skills through hands-on projects." color="blue" />
          </div>
          <header className="flex max-w-7xl items-center px-5">
            <div className="mr-3 h-11 w-1.5 bg-saseGreen"></div>
            <h2 className="font-oswald text-4xl text-foreground">FAQs</h2>
          </header>
          <FAQ faqData={SetFAQ} />
        </div>
      </div>
    );
  },
});
