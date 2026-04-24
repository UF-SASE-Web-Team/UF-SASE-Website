import { cn } from "@/shared/utils";
import { ProjectGoals } from "@client/information/ProgramGoals";
import { HeaderWithGreenBorder } from "@components/custom_ui/HeaderWithGreenBorder";
import { GoalsSection } from "@components/programs/GoalsSection";
import InfoCard from "@components/programs/InfoCard";
import { useIsMobile } from "@hooks/useIsMobile";
import { createFileRoute } from "@tanstack/react-router";
import { imageUrls } from "../assets/imageUrls";
import { seo } from "../utils/seo";

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
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background py-10">
        {/* Header and Description */}
        <div className={cn({ "flex-row gap-24": !isMobile, "flex-col gap-4": isMobile }, "flex w-full max-w-7xl items-start px-4 pb-10")}>
          <header className="flex items-center">
            <div className="mr-5 h-40 w-1.5 rounded-sm bg-saseGreen"></div>
            <h2 className="font-oswald text-7xl font-semibold leading-tight text-foreground">
              SASE
              <br />
              PROJECTS
            </h2>
          </header>
          <InfoCard
            text={
              <>
                <strong>SASE Projects</strong> brings together small, multidisciplinary groups to design and execute a diverse portfolio of{" "}
                <strong>technical and research initiatives</strong>. Unlike traditional design teams that restrict involvement to specific majors,
                SASE Projects champions <strong>approachable, smaller-scope initiatives</strong> driven by dedicated teams of 5–6 students. This
                variety creates a unique environment where students from a diverse mix of STEM and non-STEM backgrounds can meet, collaborate, and{" "}
                <strong>"learn by doing."</strong> Depending on the project, members will develop targeted technical skills—such as human factors
                engineering, coding, CAD, or material analysis—alongside essential soft skills like project management and teamwork. You will walk
                away with tangible, hands-on experience to highlight on your resume and discuss in interviews. Students of all majors and skill levels
                are encouraged to apply.
              </>
            }
          />
        </div>

        <div className="flex w-full flex-col items-center pb-10">
          {/* Current Projects */}
          <div className="max-w-7xl py-10">
            <HeaderWithGreenBorder text="Current Projects" type="Subheader" />
            <div className={`flex ${isMobile ? "flex-col" : "flex-row"} gap-8 px-5`}>
              {currentProjects.map((project, i) => (
                <div
                  key={i}
                  className="flex flex-1 rounded-[1.5rem] bg-gradient-to-br from-saseBlue to-saseGreen p-[3px] shadow-[8px_8px_16px_rgba(6,104,179,0.2)] transition duration-300 hover:scale-[1.02] hover:shadow-[12px_12px_20px_rgba(125,194,66,0.35)]"
                >
                  <div className="flex h-full w-full flex-col rounded-[calc(1.5rem-3px)] bg-muted p-8">
                    <h3 className={cn({ "text-2xl": !isMobile, "text-lg": isMobile }, "mb-4 font-oswald font-semibold text-foreground")}>
                      {project.title}
                    </h3>
                    <p className={cn({ "text-lg": !isMobile, "text-sm": isMobile }, "font-redhat leading-relaxed text-foreground")}>
                      {project.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          {/* <div className="max-w-7xl py-10">
            <HeaderWithGreenBorder text="Testimonials" type="Subheader" />
            <div className="mb-16 flex items-center justify-center px-5">
              <div className="w-full max-w-sm rounded-[1.5rem] bg-gradient-to-br from-saseBlue to-saseGreen p-[3px] shadow-[8px_8px_16px_rgba(6,104,179,0.2)]">
                <div className="flex flex-col items-center rounded-[calc(1.5rem-3px)] bg-muted px-8 py-10">
                  <img src={TestimonialPhoto} alt="SASE Projects member" className="mb-6 h-36 w-36 rounded-full object-cover object-top" />
                  <p className="text-center font-redhat text-xl italic text-foreground">"This program is amazing"</p>
                </div>
              </div>
            </div>
          </div> */}

          {/* Goals & Outcomes */}
          <GoalsSection goals={ProjectGoals} />

          {/* Coming Soon */}
          <div className="w-full max-w-7xl px-6 py-10">
            <HeaderWithGreenBorder text="Coming Soon" type="Subheader" />

            <div className="rounded-[1.5rem] bg-gradient-to-r from-saseBlue to-saseGreen p-[3px]">
              <div className="rounded-[calc(1.5rem-3px)] bg-muted px-10 py-12 text-center">
                <p className="font-oswald text-3xl font-semibold text-foreground">Another round of SASE Projects applications is on the way!</p>
                <p className="mt-4 font-redhat text-xl text-foreground">
                  Stay tuned to our{" "}
                  <a
                    href="https://www.instagram.com/ufsase/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-saseBlue underline"
                  >
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
