import TimelineMobile from "@/client/components/about/TimelineMobile";
import { cn } from "@/shared/utils";
import { imageUrls } from "@assets/imageUrls";
import AboutCard from "@components/about/AboutCard";
import ContactForm from "@components/about/ContactForm";
import HistorySection from "@components/about/HistorySection";
import MissionSection from "@components/about/MissionSection";
import MissionSectionMobile from "@components/about/MissionSectionMobile";
import Timeline from "@components/about/Timeline";
import YoutubeSection from "@components/about/YoutubeSection";
import { HeaderWithGreenBorder } from "@components/custom_ui/HeaderWithGreenBorder";
import { OmbreDivider } from "@components/custom_ui/OmbreDivider";
import { useIsMobile } from "@hooks/useIsMobile";
import { createFileRoute, Link } from "@tanstack/react-router";
import { seo } from "../utils/seo";

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

    return (
      <div className="max-w-8xl flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden bg-background py-10">
        <h1 className="header-text ombre-text">ABOUT</h1>

        {/* Summary & Buttons to Board/Sponsors */}
        <AboutCard />
        <div className="max-w-8xl w-7xl mb-10 flex justify-center font-redhat">
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

        {/* Youtube Video */}
        <OmbreDivider />
        <OmbreDivider />
        <div className="ombre-background-transparent w-full">
          <section className={cn("my-16 flex justify-center")}>
            <YoutubeSection />
          </section>
        </div>
        <OmbreDivider />
        <OmbreDivider />

        {/* Mission */}
        <section className={cn("w-full max-w-7xl py-10")}>
          <HeaderWithGreenBorder text="Mission Statement" type="Subheader" />
          {isMobile ? <MissionSectionMobile /> : <MissionSection />}
        </section>
        <OmbreDivider />

        {/* History */}
        <section className={cn("flex w-full max-w-7xl flex-col items-center justify-center py-10")}>
          <HeaderWithGreenBorder text="History" type="Subheader" />
          <HistorySection />
        </section>

        {/* Timeline */}
        <section className={cn("w-full max-w-7xl py-10")}>
          <HeaderWithGreenBorder text="Timeline of Achievements" type="Subheader" />
          {isMobile ? <TimelineMobile /> : <Timeline />}
        </section>
        <OmbreDivider />

        {/* Contact Us */}
        <section className={cn("w-full max-w-7xl py-10")}>
          <HeaderWithGreenBorder text="Contact Us" type="Subheader" />
          <ContactForm />
        </section>
      </div>
    );
  },
});
