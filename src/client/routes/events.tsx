import { imageUrls } from "@assets/imageUrls";
import UpcomingEventsBox from "@components/events/UpcomingEvents";
import EventsCalendar from "@components/EventsCalendar";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import EventsSlides from "../components/events/EventsSlidesDisplay";
import { applyOmbreDivider } from "../utils/ombre-divider";
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
    useEffect(() => {
      applyOmbreDivider();
    }, []);
    return (
      <div>
        <div className="py-5" />
        <div className="flex justify-center">
          <div className="flex-5 pb-5 text-center font-oswald text-5xl sm:text-5xl md:text-6xl lg:text-7xl">EVENTS & SLIDES</div>
        </div>
        <div className="flex w-full justify-center">
          <hr className="h-5 w-10/12 border-t-4 border-saseBlue" />
        </div>

        <div className="mx-auto w-full max-w-7xl px-4">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr),420px]">
            <div>
              <EventsCalendar />
            </div>
            <div className="self-start">
              <UpcomingEventsBox icsUrl={ICS_URL} days={7} limit={5} showDescription={false} />
            </div>
          </div>
        </div>

        <div className="flex-center mt-8">
          <EventsSlides />
        </div>
      </div>
    );
  },
});
