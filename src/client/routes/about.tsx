import TimelineMobile from "@/client/components/about/TimelineMobile";
import { cn } from "@/shared/utils";
import AboutCard from "@about/AboutCard";
import AboutCardMobile from "@about/AboutCardMobile";
import ContactForm from "@about/ContactForm";
import HeaderSection from "@about/HeaderSection";
import HistorySection from "@about/HistorySection";
import MissionSection from "@about/MissionSection";
import Timeline from "@about/Timeline";
import YoutubeSection from "@about/YoutubeSection";
import { imageUrls } from "@assets/imageUrls";
import { OmbreBackground } from "@components/custom_ui/OmbreBackground";
import { useIsMobile } from "@hooks/useIsMobile";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { applyOmbreDivider } from "../utils/ombre-divider";
import { seo } from "../utils/seo";

interface OmbreBackground {
  opacity: number;
  width: number;
}

export const Route = createFileRoute("/about")({
  meta: () => [
    ...seo({
      title: "About | UF SASE",
      description: "Learn more about UF SASE's mission, our history, achievements, and how to contact us.",
      image: imageUrls["SASELogo.png"],
    }),
  ],
  component: () => {
    const isMobile = useIsMobile();
    useEffect(() => {
      applyOmbreDivider();
    }, []);
    return (
      <div className="mt-5 flex min-h-screen flex-col items-center justify-center overflow-x-hidden bg-background font-redhat">
        <div className="max-w-8xl w-full py-8">
          <HeaderSection />
          <div className="mb-14 flex justify-center">{isMobile ? <AboutCardMobile /> : <AboutCard />}</div>
          <div className="max-w-8xl w-7xl mb-16 mt-[-10px] flex justify-center sm:mt-2">
            <div className="flex space-x-4 sm:space-x-6">
              <Link
                to="/board"
                className="sm:w-30 w-25 flex h-9 items-center justify-center whitespace-nowrap rounded-full border-2 border-black bg-saseBlue px-6 py-2 text-xs italic tracking-wide text-white transition duration-300 hover:scale-105 sm:h-10 sm:px-7 sm:text-[18px]"
              >
                Meet Our Board!
              </Link>
              <Link
                to="/sponsors"
                className="sm:w-30 w-25 flex h-9 items-center justify-center whitespace-nowrap rounded-full border-2 border-black bg-saseBlue px-6 py-2 text-[11px] italic tracking-wide text-white transition duration-300 hover:scale-105 sm:h-10 sm:px-7 sm:text-[18px]"
              >
                View Our Sponsors
              </Link>
            </div>
          </div>
          <div className="relative grid h-1 w-full grid-cols-2">
            <div className="w-full bg-gradient-to-r from-transparent via-[#7DC242] to-[#42957B]" />
            <div className="w-full bg-gradient-to-r from-[#42957B] via-[#0668B3] to-transparent" />
          </div>
          <OmbreBackground
            innerComponent={
              <>
                <section className={cn("mb-12 mt-20 flex justify-center")}>
                  <YoutubeSection />
                </section>
              </>
            }
            isOpaque={true}
          />
          <div className="relative grid h-1 w-full grid-cols-2">
            <div className="w-full bg-gradient-to-r from-transparent via-[#7DC242] to-[#42957B]" />
            <div className="w-full bg-gradient-to-r from-[#42957B] via-[#0668B3] to-transparent" />
          </div>
          <MissionSection />
          <div className="ombre-divider"></div>
          <div className={cn("mx-auto mb-12 mt-20 flex max-w-7xl items-center px-4")}>
            <div className={cn("mr-3 h-12 w-1.5 rounded-sm bg-saseGreen")}></div>
            <h2 className={cn("font-oswald text-5xl text-foreground")}>History</h2>
          </div>
          <section className={cn("mb-6 flex justify-center")}>
            <div className={cn("w-full max-w-5xl")}>
              <HistorySection />
            </div>
          </section>
          <section className={cn("mb-20")}>
            <div className={cn("mx-auto mb-8 flex max-w-7xl items-center px-4")}>
              <div className={cn("mr-3 h-12 w-1.5 rounded-sm bg-saseGreen")}></div>{" "}
              <h2 className={cn("font-oswald text-5xl text-foreground")}>Timeline of Accomplishments</h2>
            </div>
            {isMobile ? <TimelineMobile /> : <Timeline />}
          </section>
          <div className="ombre-divider"></div>
          <section id="contact" className={cn("mb-12")}>
            <div className={cn("mx-auto mb-12 mt-12 flex max-w-7xl items-center px-4")}>
              <div className={cn("mr-3 h-12 w-1.5 rounded-sm bg-saseGreen")}></div>{" "}
              <h2 className={cn("font-oswald text-5xl text-foreground")}>Contact Us</h2>
            </div>
            <ContactForm />
          </section>
        </div>
      </div>
    );
  },
});
