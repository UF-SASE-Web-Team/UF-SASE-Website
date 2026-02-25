import { DarkModeContext } from "@/client/components/custom_ui/DarkModeProvider";
import { cn } from "@/shared/utils";
import Calendar from "@assets/Calendar.png";
import { imageUrls } from "@assets/imageUrls";
import Pinpoint from "@assets/Pinpoint.png";
import SASEHacksPoster from "@assets/SASEHacksPoster.png";
import HackathonCard from "@components/custom_ui/HackathonCard";
import { OmbreDivider } from "@components/custom_ui/OmbreDivider";
import { useIsMobile } from "@hooks/useIsMobile";
import HackathonSponsors from "@information/HackathonSponsors";
import { createFileRoute } from "@tanstack/react-router";
import { useContext } from "react";
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
    const { darkMode } = useContext(DarkModeContext);

    return (
      <div className="flex flex-col items-center py-10 font-redhat">
        <p className="header-text ombre-text text-center">SASEHACKS</p>
        <div className="text-center text-xl font-bold text-saseBlue">For more information, please visit the SASEHACKS website!</div>

        <a
          className={cn("mb-12 mt-8 rounded-2xl bg-saseBlue py-5 text-2xl font-semibold text-white shadow-xl", isMobile ? "px-16" : "px-28")}
          href="https://www.sasehacks.com"
        >
          SASEHACKS WEBSITE
        </a>

        <OmbreDivider />

        <div className="relative my-6 flex flex-row justify-center text-xl font-thin sm:gap-2 md:gap-32 2xl:text-2xl">
          <div className={cn("flex items-center gap-6 text-center", isMobile ? "flex-[40%] flex-col" : "flex-row")}>
            <img src={Calendar} alt="Calendar" style={{ width: isMobile ? "40px" : "50px" }} className={cn({ invert: darkMode })} />
            March 7-8, 2026
          </div>
          <div className={cn("flex items-center gap-6 text-center", isMobile ? "flex-[60%] flex-col" : "flex-row")}>
            <img src={Pinpoint} alt="Pinpoint" style={{ width: isMobile ? "30px" : "35px" }} className={cn({ invert: darkMode })} />
            Newell Hall - 1700 Stadium Rd, Gainesville, FL 32611
          </div>
        </div>

        <OmbreDivider />

        <div
          className={cn(
            "max-w-8xl my-16 flex gap-16 text-2xl font-thin",
            isMobile ? "mx-6 flex-col items-center gap-16 text-center sm:px-12 md:px-40" : "flex-row sm:px-12 md:px-40",
          )}
        >
          <p>
            <span className="font-semibold text-saseBlue">SASEHACKS</span> will be a 24-hour hackathon where students from any university can learn
            new skills, network, attend workshops, build innovative projects, and compete for exciting category prizes!
            <br></br>
            <br></br>
            Meals are provided, overnight hacking is encouraged, and all majors and skill levels are welcome. Teams can have between 2 and 4 hackers,
            and we'll even have a team formation social before we kick off! <strong>Registration for SASEHacks has closed</strong>, but be on the
            lookout for future hackathon updates!
            <br></br>
            <br></br>
            Whether you want to build alongside a team or share your knowledge with others, we have a spot for you!
          </p>

          <img
            src={SASEHacksPoster}
            alt="SASEHacks promotional poster"
            className="flex-shrink-0 rounded-2xl shadow-xl sm:w-[350px] md:w-[150px]"
            style={{ width: "350px", height: "auto" }}
          />
        </div>

        <p className="header-text">SPONSORS</p>

        <div className="relative my-8 flex max-w-7xl flex-col items-center justify-center">
          <div className="ombre-background rounded-2xl p-2">
            <div className="grid w-full max-w-96 grid-cols-1 items-stretch gap-12 rounded-2xl bg-gradient-to-b from-gray-100 to-white p-10 dark:from-gray-900 dark:to-black lg:max-w-full lg:grid-cols-3 lg:p-24 xl:grid-cols-4">
              {HackathonSponsors.map((sponsor) => (
                <HackathonCard companyName={sponsor.company} image={sponsor.image} link={sponsor.link} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
});
