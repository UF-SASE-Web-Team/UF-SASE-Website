import { cn } from "@/shared/utils";
import { imageUrls } from "@assets/imageUrls";
import { HeaderWithGreenBorder } from "@components/custom_ui/HeaderWithGreenBorder";
import InfoCard from "@components/programs/InfoCard";
import { useIsMobile } from "@hooks/useIsMobile";
import { createFileRoute } from "@tanstack/react-router";
import { seo } from "../utils/seo";

export const Route = createFileRoute("/community-outreach")({
  meta: () => [
    ...seo({
      title: "Community Outreach | UF SASE",
      description: "SASE Community Outreach connects members with the Gainesville community through service and volunteering opportunities.",
      image: imageUrls["SASELogo.png"],
    }),
  ],
  component: () => {
    const isMobile = useIsMobile();

    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background py-10">
        <div className={cn({ "flex-row gap-24": !isMobile, "flex-col gap-4": isMobile }, "flex w-full max-w-7xl items-start px-4 pb-10")}>
          <header className="flex items-center">
            <div className="mr-5 h-40 w-1.5 rounded-sm bg-saseGreen"></div>
            <h2 className="font-oswald text-6xl font-semibold leading-tight text-foreground sm:text-7xl">
              COMMUNITY
              <br />
              OUTREACH
            </h2>
          </header>
          <InfoCard text={<>More details on Community Outreach are coming soon. Check back for the full program description!</>} />
        </div>

        <div className="flex w-full flex-col items-center pb-10">
          <div className="w-full max-w-7xl px-6 py-10">
            <HeaderWithGreenBorder text="Applications" type="Subheader" />

            <div className="rounded-[1.5rem] bg-gradient-to-r from-saseBlue to-saseGreen p-[3px]">
              <div className="rounded-[calc(1.5rem-3px)] bg-muted px-10 py-12 text-center">
                <p className="font-oswald text-3xl font-semibold text-foreground">Applications for Community Outreach open 9/16!</p>
                <p className="mt-4 font-redhat text-xl text-foreground">
                  The application form isn't live yet. Check back after <strong>9/16</strong>. Deadline: <strong>9/27</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
});
