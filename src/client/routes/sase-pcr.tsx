import { cn } from "@/shared/utils";
import { imageUrls } from "@assets/imageUrls";
import { HeaderWithGreenBorder } from "@components/custom_ui/HeaderWithGreenBorder";
import InfoCard from "@components/programs/InfoCard";
import { useIsMobile } from "@hooks/useIsMobile";
import { Icon } from "@iconify/react";
import { createFileRoute } from "@tanstack/react-router";
import { seo } from "../utils/seo";

export const Route = createFileRoute("/sase-pcr")({
  meta: () => [
    ...seo({
      title: "SASE PCR | UF SASE",
      description: "SASE PCR (Program for Collaborative Research) gives members the chance to get involved in research.",
      image: imageUrls["SASELogo.png"],
    }),
  ],
  component: () => {
    const isMobile = useIsMobile();

    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background py-10">
        <div className={cn({ "flex-row gap-24": !isMobile, "flex-col gap-4": isMobile }, "flex w-full max-w-7xl items-start px-4 pb-10")}>
          <header className="flex items-center">
            <div className="mr-5 h-28 w-1.5 rounded-sm bg-saseGreen"></div>
            <h2 className="font-oswald text-6xl font-semibold leading-tight text-foreground sm:text-7xl">
              SASE
              <br />
              PCR
            </h2>
          </header>
          <InfoCard
            text={
              <>
                <strong>SASE PCR (Program for Collaborative Research)</strong> gives members the chance to get involved in research. More details
                coming soon!
              </>
            }
          />
        </div>

        <div className="flex w-full flex-col items-center pb-10">
          <img
            src="/images/SasePcrGraphic.png"
            alt="SASE PCR — Program for Collaborative Research"
            className="mb-10 w-full max-w-md rounded-2xl shadow-xl"
          />

          <div className="w-full max-w-7xl px-6 py-10">
            <HeaderWithGreenBorder text="Applications" type="Subheader" />

            <div className="rounded-[1.5rem] bg-gradient-to-r from-saseBlue to-saseGreen p-[3px]">
              <div className="rounded-[calc(1.5rem-3px)] bg-muted px-10 py-12 text-center">
                <p className="font-oswald text-3xl font-semibold text-foreground">Applications for SASE PCR are open!</p>
                <p className="mt-4 font-redhat text-xl text-foreground">
                  Deadline: <strong>09/12</strong>
                </p>
                <a
                  href="https://forms.gle/5TLgt9KnP4ppoYdY8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-saseBlue px-10 py-4 text-xl font-semibold text-white shadow-xl transition hover:brightness-90"
                >
                  Apply Now
                  <Icon icon="mdi:open-in-new" className="text-lg" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
});
