import { cn } from "@/shared/utils.js";
import { imageUrls } from "@assets/imageUrls";
import { GeneralProgramsInfo } from "@/client/information/Programs.js";
import ProgramCard from "@components/programs/ProgramCard";
import { useIsMobile } from "@hooks/useIsMobile.js";
import { createFileRoute } from "@tanstack/react-router";
import { seo } from "../utils/seo";
import { OmbreDivider } from "@components/custom_ui/OmbreDivider";

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

    return (
      <div className="flex min-h-screen w-full justify-center flex-col items-center py-10">
        {/* Header, Description, Ombre Divider */}
        <div className="flex max-w-7xl flex-col items-center justify-center">
          <h1 className="header-text ombre-text pb-10">
            PROGRAMS
          </h1>
          <div className="ombre-background p-1 rounded-2xl mx-4 mb-10">
            <div className="flex h-full flex-col rounded-2xl bg-saseGrayLight p-4 text-center dark:bg-black">
                <p className="text-center font-redhat text-lg font-semibold text-black dark:text-white">
                  <span className="font-bold text-saseBlue">SASE programs</span> allow members opportunities to work on{" "}
                  <span className="font-bold text-saseGreen">long-term technical projects</span> and promote{" "}
                  <span className="font-bold text-saseGreen">geniune connections</span> among members through a vareity of professional teams and
                  social groups.
                </p>
              </div>
          </div>
        <OmbreDivider/>
        </div>

        {/* Program Cards */}
        <div
          className={cn(
            {
              "grid-cols-1": isMobile,
              "grid-cols-2": !isMobile,
            },
            "grid items-stretch gap-12 pt-10 px-4 max-w-7xl",
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
