import { cn } from "@/shared/utils";
import { imageUrls } from "@assets/imageUrls";
import { EventPageHeader } from "@components/custom_ui/EventPageHeader";
import EventSponsorCard from "@components/custom_ui/EventSponsorCard";
import { useIsMobile } from "@hooks/useIsMobile";
import SercSponsors from "@information/SercSponsors";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/serc")({
  component: () => {
    const isMobile = useIsMobile();

    return (
      <div className="flex flex-col items-center py-10 font-redhat">
        <EventPageHeader
          title="SOUTHEAST REGIONAL CONFERENCE (SERC)"
          subtitle="For more information, please visit the SERC website!"
          buttonText="SERC WEBSITE"
          buttonHref="https://serc.saseconnect.org/"
          date="TBA"
          location="UF"
        />
        <div
          className={cn(
            "max-w-8xl my-16 flex gap-16 font-thin",
            isMobile ? "mx-6 flex-col items-center gap-16 text-center text-sm sm:px-12 md:px-40" : "flex-row text-lg sm:px-12 md:px-40",
          )}
        >
          <p>
            The <span className="font-semibold text-saseBlue">Southeast Regional Conference (SERC)</span> is an annual event hosted by the Society of
            Asian Scientists and Engineers (SASE). It brings together university chapters across the Southeast for a full day of professional
            development, leadership training, competitions, and community building. Students gain hands‑on experience, network with industry
            professionals, and strengthen their chapter’s presence within the region.
            <div className="items-start text-left">
              <p className="mt-6 text-saseBlue sm:mt-2">Conference Highlights</p>
              <ul className="ml-6 list-disc">
                <li>Leadership and professional development workshops</li>
                <li>Networking with industry recruiters and SASE alumni</li>
                <li>Technical and soft‑skill sessions</li>
                <li>Case competitions and team‑based challenges</li>
                <li>Chapter collaboration and community‑building activities</li>
                <li>Opportunities to meet regional SASE leaders</li>
              </ul>
            </div>
          </p>
          <img
            src={imageUrls["SERCPoster.png"]}
            alt="SERC promotional poster"
            className="flex-shrink-0 rounded-2xl shadow-xl sm:w-[350px] md:w-[150px]"
            style={{ width: "350px", height: "auto" }}
          />
        </div>
        <p className="header-text text-center">SERC 2026 SPONSORS</p>
        <div className="relative my-8 flex max-w-7xl flex-col items-center justify-center px-4 sm:px-6">
          <div className="ombre-background rounded-2xl p-2">
            <div className="flex flex-wrap justify-center gap-12 rounded-2xl bg-gradient-to-b from-gray-100 to-white p-10 dark:from-gray-900 dark:to-black lg:p-24">
              {SercSponsors.map((sponsor) => (
                <div key={sponsor.company} className="w-full max-w-[280px] sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-2rem)]">
                  <EventSponsorCard companyName={sponsor.company} image={sponsor.image} link={sponsor.link} indexSizing={true} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="subheader-text">EVENT GALLERY</p>
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
          <img
            src={imageUrls["SercPhoto2.jpg"]}
            alt="SERC promotional poster"
            className="flex-shrink-0 rounded-2xl shadow-xl sm:w-[350px] md:w-[150px]"
            style={{ width: "350px", height: "auto" }}
          />
          <img
            src={imageUrls["SercPhoto1.jpg"]}
            alt="SERC promotional poster"
            className="flex-shrink-0 rounded-2xl shadow-xl sm:w-[350px] md:w-[150px]"
            style={{ width: "350px", height: "auto" }}
          />
          <img
            src={imageUrls["SercPhoto3.jpg"]}
            alt="SERC promotional poster"
            className="flex-shrink-0 rounded-2xl shadow-xl sm:w-[350px] md:w-[150px]"
            style={{ width: "350px", height: "auto", objectFit: "cover", objectPosition: "center" }}
          />
        </div>
      </div>
    );
  },
});
