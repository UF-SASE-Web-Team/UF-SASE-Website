import { cn } from "@/shared/utils.js";
import { imageUrls } from "@assets/imageUrls";
import { GeneralProgramsInfo } from "@/client/information/Programs.js";
import ProgramCard from "@components/programs/ProgramCard";
import { useIsMobile } from "@hooks/useIsMobile.js";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { applyOmbreDivider } from "../utils/ombre-divider.js";
import { seo } from "../utils/seo";

export const Route = createFileRoute("/programs")({
  meta: () => [
    ...seo({
      title: "Programs | UF SASE",
      description: "Programs page for UF SASE, learn about the professional, social, and technical programs we offer.",
      image: imageUrls["SASELogo.png"],
    }),
  ],

  component: () => {
    const isMobile = useIsMobile();

    useEffect(() => {
      applyOmbreDivider();
    });

    return (
      <div className="flex min-h-screen min-w-full flex-col items-center px-[10%] pt-12">
        {/* Header, Description, Ombre Divider */}
        <div className="flex w-full flex-col items-center justify-center">
          <h1 className="inline-block bg-gradient-to-r from-saseBlue to-saseGreen bg-clip-text pb-6 font-oswald text-7xl font-extrabold text-transparent">
            PROGRAMS
          </h1>
          <div className="ombre-background">
            <div className="flex h-full flex-col rounded-2xl bg-saseGrayLight p-4 text-center dark:bg-black">
                <p className="text-center font-redhat text-lg font-semibold text-black dark:text-white">
                  <span className="font-bold text-saseBlue">SASE programs</span> allow members opportunities to work on{" "}
                  <span className="font-bold text-saseGreen">long-term technical projects</span> and promote{" "}
                  <span className="font-bold text-saseGreen">geniune connections</span> among members through a vareity of professional teams and
                  social groups.
                </p>
              </div>
          </div>
      
          <div className="ombre-divider"></div>
        </div>

        {/* Program Cards */}
        <div
          className={cn(
            {
              "grid-cols-1": isMobile === true,
              "grid-cols-2": isMobile === false,
            },
            "grid items-stretch gap-12 py-6",
          )}
        >
          {GeneralProgramsInfo.map((program) => (
            <ProgramCard name={program.program} image={program.image} text={program.description} link={program.link} number={program.number} />
          ))}
        </div>
      </div>
    );
  },
});
