import GoalCard from "@components/programs/GoalCard";
import InfoCard from "@components/programs/InfoCard";
import { useIsMobile } from "@hooks/useIsMobile";
import { createFileRoute } from "@tanstack/react-router";
import { imageUrls } from "../assets/imageUrls";
import { seo } from "../utils/seo";
import TestimonialPhoto from "@assets/projects/TestimonialPhoto.jpg";

const currentProjects = [
  {
    title: "Discord Bot: Insta Plugger & Pi Reminder",
    description:
      "A custom SASE Discord bot that automates board member tasks and reminders such as PR plugging schedule and Pi bookings. Improve the workflow and time spent on completing repetitive tasks.",
  },
  {
    title: "NAS Storage System & Server",
    description:
      "Design and implement both a NAS server to reduce the cost of cloud subscriptions, and a server to host programs such as custom discord bots at a lower cost.",
  },
  {
    title: "Workflow Optimization & Automation: M&M and Sports Coord Pairings",
    description:
      "Optimize the pairing system of both mentor & mentee program and sports team pairing system to ensure optimal fit. Additionally automate the pairing process to significantly reduce manual time spent pairing.",
  },
];

export const Route = createFileRoute("/projects")({
  meta: () => [
    ...seo({
      title: "Projects | UF SASE",
      description:
        "SASE Projects brings together small, multidisciplinary groups to design and execute a diverse portfolio of technical and research initiatives.",
      image: imageUrls["SASELogo.png"],
    }),
  ],

  component: () => {
    const isMobile = useIsMobile();

    return (
      <div className="mt-12 flex min-h-screen flex-col items-center bg-background">
        {/* Header + Description */}
        <div className="flex w-full max-w-7xl flex-col items-start px-4 py-8 sm:flex-row">
          <header className="mr-8 mt-10 flex items-center px-5">
            <div className="mr-5 h-52 w-1.5 bg-saseGreen"></div>
            <h2 className="font-oswald text-5xl font-semibold leading-tight text-foreground sm:text-7xl">
              SASE
              <br />
              PROJECTS
            </h2>
          </header>
          <InfoCard
            text={
              <>
                <strong>SASE Projects</strong> brings together small, multidisciplinary groups to design and execute a diverse portfolio of{" "}
                <strong>technical and research initiatives</strong>. Unlike traditional design teams that restrict involvement to specific majors, SASE Projects
                champions <strong>approachable, smaller-scope initiatives</strong> driven by dedicated teams of 5–6 students. This variety creates a unique
                environment where students from a diverse mix of STEM and non-STEM backgrounds can meet, collaborate, and <strong>"learn by doing."</strong>{" "}
                Depending on the project, members will develop targeted technical skills—such as human factors engineering, coding, CAD, or material analysis—alongside
                essential soft skills like project management and teamwork. You will walk away with tangible, hands-on experience to highlight on your resume and
                discuss in interviews. Students of all majors and skill levels are encouraged to apply.
              </>
            }
          />
        </div>

        <div className="w-full max-w-7xl px-4 py-8">
          {/* Current Projects */}
          <header className="mb-6 flex items-center px-5 font-oswald">
            <div className="mr-3 h-11 w-1.5 bg-saseGreen"></div>
            <h2 className="text-4xl text-foreground">Current Projects</h2>
          </header>

          <div className={`mb-16 flex ${isMobile ? "flex-col" : "flex-row"} gap-8 px-5`}>
            {currentProjects.map((project, i) => (
              <div
                key={i}
                className="flex flex-1 rounded-[1.5rem] bg-gradient-to-br from-saseBlue to-saseGreen p-[3px] shadow-[8px_8px_16px_rgba(6,104,179,0.2)] transition duration-300 hover:scale-[1.02] hover:shadow-[12px_12px_20px_rgba(125,194,66,0.35)]"
              >
                <div className="flex h-full w-full flex-col rounded-[calc(1.5rem-3px)] bg-muted p-8">
                  <h3 className="mb-4 font-oswald text-2xl font-semibold text-foreground">{project.title}</h3>
                  <p className="font-redhat text-lg leading-relaxed text-foreground">{project.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <header className="mb-6 flex items-center px-5 font-oswald">
            <div className="mr-3 h-11 w-1.5 bg-saseGreen"></div>
            <h2 className="text-4xl text-foreground">Testimonials</h2>
          </header>

          <div className="mb-16 flex items-center justify-center px-5">
            <div className="w-full max-w-sm rounded-[1.5rem] bg-gradient-to-br from-saseBlue to-saseGreen p-[3px] shadow-[8px_8px_16px_rgba(6,104,179,0.2)]">
              <div className="flex flex-col items-center rounded-[calc(1.5rem-3px)] bg-muted px-8 py-10">
                <img src={TestimonialPhoto} alt="SASE Projects member" className="mb-6 h-36 w-36 rounded-full object-cover object-top" />
                <p className="text-center font-redhat text-xl italic text-foreground">"This program is amazing"</p>
              </div>
            </div>
          </div>

          {/* Goals & Outcomes */}
          <header className="mb-12 flex items-center px-5 font-oswald">
            <div className="mr-3 h-11 w-1.5 bg-saseGreen"></div>
            <h2 className="text-4xl text-foreground">Goals & Outcomes</h2>
          </header>

          <div className="mb-16 flex flex-col flex-nowrap items-center justify-center gap-10 md:flex-row lg:gap-36">
            <GoalCard text="Develop targeted technical skills like coding, CAD, or material analysis through hands-on projects." color="blue" />
            <GoalCard text="Collaborate with diverse, multidisciplinary teams of 5-6 students from various STEM and non-STEM backgrounds." color="green" />
            <GoalCard text="Build tangible, real-world experience to highlight on your resume and discuss in interviews." color="blue" />
          </div>

          {/* Coming Soon */}
          <header className="mb-6 flex items-center px-5 font-oswald">
            <div className="mr-3 h-11 w-1.5 bg-saseGreen"></div>
            <h2 className="text-4xl text-foreground">Coming Soon</h2>
          </header>

          <div className="mb-16 px-5">
            <div className="rounded-[1.5rem] bg-gradient-to-r from-saseBlue to-saseGreen p-[3px]">
              <div className="rounded-[calc(1.5rem-3px)] bg-muted px-10 py-12 text-center">
                <p className="font-oswald text-3xl font-semibold text-foreground">Another round of SASE Projects applications is on the way!</p>
                <p className="mt-4 font-redhat text-xl text-foreground">
                  Stay tuned to our{" "}
                  <a href="https://www.instagram.com/ufsase/" target="_blank" rel="noopener noreferrer" className="font-semibold text-saseBlue underline">
                    Instagram
                  </a>{" "}
                  and{" "}
                  <a href="http://discord.gg/q3HBeC5" target="_blank" rel="noopener noreferrer" className="font-semibold text-saseGreen underline">
                    Discord
                  </a>{" "}
                  for updates on the next application cycle!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
});
