import { cn } from "@/shared/utils";
import { imageUrls } from "@assets/imageUrls";
import { EventPageHeader } from "@components/custom_ui/EventPageHeader";
import { useIsMobile } from "@hooks/useIsMobile";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/gulfgames")({
  component: () => {
    const isMobile = useIsMobile();

    return (
      <div className="flex flex-col items-center py-10 text-center font-redhat">
        <EventPageHeader
          title="Gulf Games"
          subtitle="For more information, please visit our Gulf Games promotional post on Instagram!"
          buttonText="Learn More on Instagram"
          buttonHref="https://www.instagram.com/usfsase/p/DU9LgtsjyqT/"
          date="April 23, 2026"
          location="USF Recreation"
        />
        <div
          className={cn(
            "max-w-8xl my-16 flex gap-16 font-thin",
            isMobile ? "mx-6 flex-col items-center gap-16 text-center text-sm sm:px-12 md:px-40" : "flex-row text-lg sm:px-12 md:px-40",
          )}
        >
          <p className="text-center md:text-left">
            The <span className="font-semibold text-saseBlue">Gulf Games</span>, formerly known as SASElympics, is a fun and competitive sports event
            where southeast collegiate SASE chapters come together for team-based games and athletic challenges. This year, the event will be hosted
            by the University of South Florida (USF) SASE Chapter. Compete against other teams in challenges for a chance to win a prize! Sports and
            games may include basketball, badminton, tug-of-war, and more.
            <div className="items-start text-left">
              <p className="mt-6 text-saseBlue sm:mt-2">Why You Should Attend</p>
              <ul className="ml-6 list-disc">
                <li>Free to participate</li>
                <li>Friendly field day-style games and competition</li>
                <li>Meet members from SASE chapters across the Southeast</li>
                <li>Free lunch included</li>
                <li>Show your UF SASE spirit and chapter pride</li>
              </ul>
            </div>
          </p>
          <img
            src={imageUrls["GulfGamesPoster.png"]}
            alt="Gulf Games promotional poster"
            className="flex-shrink-0 rounded-2xl shadow-xl sm:w-[350px] md:w-[150px]"
            style={{ width: "350px", height: "auto" }}
          />
        </div>
        <p className="subheader-text">EVENT GALLERY</p>
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
          <img
            src={imageUrls["GulfGamesPhoto1.jpg"]}
            alt="SERC promotional poster"
            className="flex-shrink-0 rounded-2xl shadow-xl sm:w-[350px] md:w-[150px]"
            style={{ width: "350px", height: "auto" }}
          />
          <img
            src={imageUrls["GulfGamesPhoto2.jpg"]}
            alt="SERC promotional poster"
            className="flex-shrink-0 rounded-2xl shadow-xl sm:w-[350px] md:w-[150px]"
            style={{ width: "350px", height: "auto" }}
          />
          <img
            src={imageUrls["GulfGamesPhoto3.jpg"]}
            alt="SERC promotional poster"
            className="flex-shrink-0 rounded-2xl shadow-xl sm:w-[350px] md:w-[150px]"
            style={{ width: "350px", height: "auto", objectFit: "cover", objectPosition: "center" }}
          />
        </div>
      </div>
    );
  },
});
