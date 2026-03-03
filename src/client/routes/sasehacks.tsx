import { cn } from "@/shared/utils";
import { imageUrls } from "@assets/imageUrls";
import { EventPageHeader } from "@components/custom_ui/EventPageHeader";
import EventSponsorCard from "@components/custom_ui/EventSponsorCard";
import { useIsMobile } from "@hooks/useIsMobile";
import HackathonSponsors from "@information/HackathonSponsors";
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
        <EventPageHeader
          title="SASEHACKS"
          subtitle="For more information, please visit the SASEHACKS website!"
          buttonText="SASEHACKS WEBSITE"
          buttonHref="https://www.sasehacks.com"
          date="March 7-8, 2026"
          location="Newell Hall - 1700 Stadium Rd, Gainesville, FL 32611"
        />

        <div
          className={cn(
            "max-w-8xl my-16 flex gap-16 font-thin",
            isMobile ? "mx-6 flex-col items-center gap-16 text-center text-sm sm:px-12 md:px-40" : "flex-row text-lg sm:px-12 md:px-40",
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
            src={imageUrls["SaseHacksPoster.png"]}
            alt="SASEHacks promotional poster"
            className="flex-shrink-0 rounded-2xl shadow-xl sm:w-[350px] md:w-[150px]"
            style={{ width: "350px", height: "auto" }}
          />
        </div>

        <p className="header-text">SPONSORS</p>

        <div className="relative my-8 flex max-w-7xl flex-col items-center justify-center px-4 sm:px-6">
          <div className="ombre-background rounded-2xl p-2">
            <div className="flex flex-wrap justify-center gap-12 rounded-2xl bg-gradient-to-b from-gray-100 to-white p-10 dark:from-gray-900 dark:to-black lg:p-24">
              {HackathonSponsors.map((sponsor) => (
                <div key={sponsor.company} className="w-full max-w-[280px] sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-2rem)]">
                  <EventSponsorCard companyName={sponsor.company} image={sponsor.image} link={sponsor.link} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
});
