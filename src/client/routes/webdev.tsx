import { DarkModeContext } from "@/client/components/custom_ui/DarkModeProvider";
import MemberCard from "@/client/components/custom_ui/MemberCard";
import MobileMemberCard from "@/client/components/custom_ui/MobileMemberCard";
import { cn } from "@/shared/utils";
import { imageUrls } from "@assets/imageUrls";
import { HeaderWithGreenBorder } from "@components/custom_ui/HeaderWithGreenBorder";
import { OmbreDivider } from "@components/custom_ui/OmbreDivider";
import { ApplicationPhoto } from "@components/programs/ApplicationPhoto";
import FAQ from "@components/programs/FAQCard";
import { GoalsSection } from "@components/programs/GoalsSection";
import { useIsMobile } from "@hooks/useIsMobile";
import { Webmasters } from "@information/People";
import { SwtFAQ } from "@information/ProgramFAQs";
import { SwtGoals } from "@information/ProgramGoals";
import { createFileRoute } from "@tanstack/react-router";
import { useContext } from "react";
import { seo } from "../utils/seo";

export const Route = createFileRoute("/webdev")({
  meta: () => [
    ...seo({
      title: "SWEET | UF SASE",
      description: "UF SASE Web Development team consists of UI/UX, Frontend, and Backend teams creating the SASE website, using agile practices.",
      image: imageUrls["SASELogo.png"],
    }),
  ],

  component: () => {
    const isMobile = useIsMobile();
    const { darkMode } = useContext(DarkModeContext);
    const pastWebmastersInfo = Webmasters.find((team: { team: string }) => team.team === "Past")?.information;

    return (
      <div className="flex min-h-screen w-full flex-col items-center bg-background py-10">
        <div className={cn({ "flex flex-col items-center": isMobile, "grid grid-cols-[1fr_2fr]": !isMobile }, "w-full max-w-7xl")}>
          <div className="relative mx-auto w-[75%]">
            <img
              src={imageUrls["WebTeam.png"]}
              alt="Web Team"
              className={cn(`mx-auto h-auto w-full sm:mx-0`, {
                invert: !darkMode,
              })}
            />
          </div>
          <div className="mx-2 rounded-2xl bg-[length:100%_100%] bg-no-repeat" style={{ backgroundImage: `url(${imageUrls["Bash.png"]})` }}>
            {/* <img src={WebTeamDescription} alt="Terminal" className="h-auto w-full px-2" /> */}
            <div className={cn({ "px-10": !isMobile, "px-4": isMobile }, "mt-14 text-white")}>
              <ul className="mb-4 font-silkscreen text-3xl">
                <li>&gt; BEGINNER TEAM</li>
                <li>&gt; MOBILE APP TEAM</li>
                <li>&gt; EXTERNSHIP TEAM</li>
              </ul>
              <p className={cn({ "text-lg": !isMobile, "text-sm": isMobile }, "py-4 font-redhat")}>
                Are you looking to expand your skill set and gain experience with agile practices commonly used in the industry? Do you want to apply
                your technical experience for the good of all SASE? We’re seeking committed members to bring our ideas to life and publish an
                improved, self-hosted version of our website. We encourage people of all skill levels to apply!
              </p>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col items-center py-10">
          {/* Group Picture & App Status */}
          <div className="flex w-full flex-col items-center justify-center bg-black py-10 dark:bg-greenBackground">
            <ApplicationPhoto
              image={imageUrls["WebTeamWinterBanquet2025.JPG"]}
              applicationStatus="OPEN"
              nextSemester="Fall 2026"
              applyLink="https://forms.gle/1hRXjJ5jDZoVKVM19"
              deadline="9/13"
            />
          </div>

          {/* Leadership */}
          <header className="flex w-full justify-center py-10">
            <h2 className="ombre-text font-silkscreen text-5xl font-medium">Leadership</h2>
          </header>
          <h3 className="pb-6 font-redhat text-2xl font-semibold text-foreground">Past Webmasters</h3>
          {isMobile ? (
            // Mobile Leadership Display
            <div className="px-4 pb-10">
              {pastWebmastersInfo?.map(
                (lead: { image: string; name: string; year: string; textColor: string; quote: string | undefined; mobileAlign: string }, index) => (
                  <div key={index} className="flex flex-col gap-4">
                    <MobileMemberCard image={lead.image} name={lead.name} role={lead.year} textColor={lead.textColor} imageSide={lead.mobileAlign} />
                    {index < pastWebmastersInfo.length - 1 && (
                      <div className="mb-4">
                        <OmbreDivider />
                      </div>
                    )}
                  </div>
                ),
              )}
            </div>
          ) : (
            // Desktop Leadership Display
            <div className="mb-12 flex flex-col items-center justify-center gap-8">
              <div className="flex w-full max-w-7xl flex-row gap-8 overflow-x-auto px-4 pb-2">
                {pastWebmastersInfo?.map(
                  (lead: { image: string; name: string; year: string; textColor: string; quote: string | undefined }, index) => (
                    <MemberCard key={index} image={lead.image} name={lead.name} role={lead.year} textColor={lead.textColor} />
                  ),
                )}
              </div>
            </div>
          )}

          {/* Goals & Outcomes */}
          <GoalsSection goals={SwtGoals} />

          {/* FAQs */}
          <div className="w-full max-w-7xl pt-10">
            <HeaderWithGreenBorder text="FAQs" type="Subheader" />
            <FAQ faqData={SwtFAQ} />
          </div>
        </div>
      </div>
    );
  },
});
