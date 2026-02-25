import HackathonSponsors from "@/client/information/HackathonSponsors";
import { cn } from "@/shared/utils";
import Calendar from "@assets/Calendar.png";
import { imageUrls } from "@assets/imageUrls";
import Pinpoint from "@assets/Pinpoint.png";
import SASEHacksPoster from "@assets/SASEHacksPoster.png";
import { OmbreDivider } from "@components/custom_ui/OmbreDivider";
import { useIsMobile } from "@hooks/useIsMobile";
import { createFileRoute } from "@tanstack/react-router";
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
            March 7-8, 2026
          </div>
          <div className="flex flex-row items-center gap-6">
            <img src={Pinpoint} alt="Pinpoint" style={{ width: "40px" }} />
            Newell Hall - 1700 Stadium Rd, Gainesville, FL 32611
          </div>
        </div>

        <OmbreDivider />

        <div
          className={cn(
            "max-w-8xl flex gap-16 text-xl font-thin sm:my-16 md:text-xl 2xl:text-2xl",
            isMobile ? "flex-col items-center gap-16 sm:px-12 md:px-40" : "flex-row sm:px-12 md:px-40",
          )}
        >
          <p>
            <span className="font-semibold text-saseBlue">SASEHACKS</span> will be a 24-hour hackathon where students from any university can learn
            new skills, network, attend workshops, build innovative projects, and compete for exciting category prizes!
            <br></br>
            <br></br>
            Meals are provided, overnight hacking is encouraged, and all majors and skill levels are welcome. Teams can have between 1 and 4 hackers,
            and we'll even have a team formation social before we kick off! Spots are limited, so apply now at sasehacks.com!
            <br></br>
            <br></br>
            Whether you want to build alongside a team or share your knowledge with others, we have a spot for you!
          </p>

          <img
            src={SASEHacksPoster}
            alt="SASEHacks promotional poster"
            className="rounded-2xl shadow-xl sm:w-[350px] md:w-[150px]"
            style={{ width: "350px" }}
          />
        </div>

        <p className="header-text">SPONSORS</p>

        <div className="relative my-8 flex max-w-7xl flex-col items-center justify-center">
          <div className="ombre-background rounded-2xl p-2">
            <div className="grid w-full max-w-96 grid-cols-1 items-stretch gap-12 rounded-2xl bg-gradient-to-b from-gray-100 to-white p-10 dark:from-gray-900 dark:to-black lg:max-w-full lg:grid-cols-3 lg:p-24 xl:grid-cols-4">
              {/* {HackathonSponsors.map((sponsor) => (
                <PartnerCard
                  companyName={sponsor.company}
                  image={sponsor.image}
                  link={sponsor.link}
                />
              ))} */}
            </div>
          </div>
        </div>
      </div>
    );
  },
});
