import EventsCalendar from "@/client/components/events/EventsCalendar";
import { cn } from "@/shared/utils";
import { imageUrls } from "@assets/imageUrls";
import { OmbreDivider } from "@components/custom_ui/OmbreDivider";
import UpcomingEventsBox from "@components/events/UpcomingEvents";
import { useIsMobile } from "@hooks/useIsMobile";
import { createFileRoute } from "@tanstack/react-router";
import EventsSlides from "../components/events/EventsSlidesDisplay";
import { seo } from "../utils/seo";

const ICS_URL = "/api/calendar/ics";

export const Route = createFileRoute("/events")({
  meta: () => [
    ...seo({
      title: "Events | UF SASE",
      description: "Calendar of UF SASE events plus all slides for GBMs, socials, and workshops.",
      image: imageUrls["SASELogo.png"],
    }),
  ],
  component: () => {
    const isMobile = useIsMobile();

    return (
      <div className="flex flex-col items-center justify-center py-10">
        <p className="header-text ombre-text text-center">EVENTS & SLIDES</p>
        <OmbreDivider />

        <div className="mx-auto w-full max-w-7xl px-4 py-10">
          <div className={cn({ "grid-cols-1": isMobile, "grid-cols-[minmax(0,1fr),420px]": !isMobile }, "grid items-start gap-10")}>
            <EventsCalendar />
            <div className="self-start">
              <UpcomingEventsBox icsUrl={ICS_URL} days={7} limit={5} showDescription={false} />
            </div>
          </div>
        </div>

        <div className="flex-center">
          <EventsSlides />
        </div>
      </div>
    );
  },
});
