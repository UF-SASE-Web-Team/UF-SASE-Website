import { cn } from "@/shared/utils";
import Calendar from "@assets/Calendar.png";
import { imageUrls } from "@assets/imageUrls";
import Pinpoint from "@assets/Pinpoint.png";
import SaseHacksPoster from "@assets/SaseHacksPoster.png";
import { OmbreDivider } from "@components/custom_ui/OmbreDivider";
import { useIsMobile } from "@hooks/useIsMobile";
import { createFileRoute } from "@tanstack/react-router";
import { calendar } from "googleapis/build/src/apis/calendar";
import { seo } from "../utils/seo";

export const Route = createFileRoute("/sasehacks")({
  meta: () => [
    ...seo({
      title: "Sponsors | UF SASE",
      description: "Current corporate sponsors of UF SASE and contact info for company sponsorship packet",
      image: imageUrls["SASELogo.png"],
    }),
  ],
  component: () => {
    const isMobile = useIsMobile();

    return (
      <div className="flex flex-col items-center py-10 font-redhat">
        <p className="header-text ombre-text text-center">SASEHACKS</p>
        <div className="text-center text-xl font-bold text-saseBlue">For more information, please visit the SASEHACKS website!</div>

        <a className="mb-12 mt-8 rounded-2xl bg-saseBlue px-28 py-5 text-2xl font-semibold text-white shadow-2xl" href="https://www.sasehacks.com">
          SASEHACKS WEBSITE
        </a>

        <OmbreDivider />

        <div className="my-6 flex flex-row text-xl font-thin sm:gap-24 md:gap-32">
          <div className="flex flex-row items-center gap-6">
            <img src={Calendar} alt="Calendar" style={{ width: "50px" }} />
            March 7-8, 2025
          </div>
          <div className="flex flex-row items-center gap-6">
            <img src={Pinpoint} alt="Pinpoint" style={{ width: "40px" }} />
            Newell Hall - 1700 Stadium Rd, Gainesville, FL 32611
          </div>
        </div>

        <OmbreDivider />

        <div
          className={cn(
            "flex gap-32 text-xl font-thin sm:my-12 md:text-xl xl:my-6",
            isMobile ? "flex-col items-center sm:px-12" : "flex-row sm:px-12 md:px-40",
          )}
        >
          <p>
            SASEHACKS will be a 24-hour hackathon where students from any university can learn new skills, network, attend workshops, build innovative
            projects, and compete for exciting category prizes!
            <br></br>
            <br></br>
            Meals are provided, overnight hacking is encouraged, and all majors and skill levels are welcome. Teams can have between 1 and 4 hackers,
            and we'll even have a team formation social before we kick off! Spots are limited, so apply now at sasehacks.com!
            <br></br>
            <br></br>
            Whether you want to build alongside a team or share your knowledge with others, we have a spot for you!
          </p>

          <img src={SaseHacksPoster} alt="SaseHacks promotional poster" className="sm:w-[350px] md:w-[150px]" style={{ width: "350px" }} />
        </div>
      </div>
    );
  },
});
