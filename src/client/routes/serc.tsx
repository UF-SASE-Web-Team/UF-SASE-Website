import { cn } from "@/shared/utils";
import { EventPageHeader } from "@components/custom_ui/EventPageHeader";
import { useIsMobile } from "@hooks/useIsMobile";
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
          location="TBA"
        />

        <div
          className={cn(
            "max-w-8xl my-16 flex gap-16 text-2xl font-thin",
            isMobile ? "mx-6 flex-col items-center gap-16 text-center sm:px-12 md:px-40" : "flex-row sm:px-12 md:px-40",
          )}
        >
          <p>
            The <span className="font-semibold text-saseBlue">Southeast Regional Conference (SERC)</span> is an annual event hosted by the Society of
            Asian Scientists and Engineers (SASE). It brings together university chapters across the Southeast for a full day of professional
            development, leadership training, competitions, and community building. Students gain hands‑on experience, network with industry
            professionals, and strengthen their chapter’s presence within the region.
            <p className="mt-2 text-saseBlue">Conference Highlights</p>
            <ul className="ml-6 list-disc">
              <li>Leadership and professional development workshops</li>
              <li>Networking with industry recruiters and SASE alumni</li>
              <li>Technical and soft‑skill sessions</li>
              <li>Case competitions and team‑based challenges</li>
              <li>Chapter collaboration and community‑building activities</li>
              <li>Opportunities to meet regional SASE leaders</li>
            </ul>
          </p>

          {/* <img
            src={SERCPoster}
            alt="SERC promotional poster"
            className="flex-shrink-0 rounded-2xl shadow-xl sm:w-[350px] md:w-[150px]"
            style={{ width: "350px", height: "auto" }}
          /> */}
        </div>
      </div>
    );
  },
});
