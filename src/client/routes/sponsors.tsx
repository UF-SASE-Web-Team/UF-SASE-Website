import SponsorInfo from "@/client/information/Sponsors";
import { imageUrls } from "@assets/imageUrls";
import SponsorCard from "@components/sponsors/SponsorCard";
import { useIsMobile } from "@hooks/useIsMobile";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { applyOmbreDivider } from "../utils/ombre-divider";
import { seo } from "../utils/seo";

export const Route = createFileRoute("/sponsors")({
  meta: () => [
    ...seo({
      title: "Sponsors | UF SASE",
      description: "Current corporate sponsors of UF SASE and contact info for company sponsorship packet",
      image: imageUrls["SASELogo.png"],
    }),
  ],
  component: () => {
    useEffect(() => {
      applyOmbreDivider();
    }, []);
    const isMobile = useIsMobile();
    return (
      <div className="flex flex-col items-center">
        <h1 className="pb-2 pt-16 text-center font-oswald text-6xl font-normal sm:text-7xl">CURRENT SPONSORS</h1>

        <div className="relative mb-16 mt-6 grid h-2 w-full grid-cols-2">
          <div className="w-full bg-gradient-to-r from-transparent via-[#7DC242] to-[#42957B]" />
          <div className="w-full bg-gradient-to-r from-[#42957B] via-[#0668B3] to-transparent" />
        </div>

        <div
          className={
            isMobile ? "relative max-w-xs sm:max-w-xs md:max-w-lg lg:max-w-4xl" : "relative right-20 max-w-xs sm:max-w-xs md:max-w-lg lg:max-w-4xl"
          }
        >
          {/* Chat Bubble */}
          <div className="rounded-full bg-gradient-to-b from-saseBlue to-saseGreen p-2">
            <div className="rounded-full bg-muted p-6 pl-8 pr-8 font-redhat font-medium">
              <div className="relative z-10 md:text-xl lg:text-2xl xl:text-3xl">
                Become a <span className="font-bold">partner</span> of the{" "}
                <span className="font-bold">UF Society of Asian Scientists and Engineers (SASE)</span> Chapter!
              </div>
            </div>
          </div>

          {/* Message Tail */}
          <div className="relative bottom-10 left-20 h-20 w-20 rotate-45 rounded-br-lg bg-saseGreen">
            <div className="absolute bottom-2 right-2 h-full w-full rounded-br-lg bg-muted"></div>
          </div>
        </div>

        <div
          className={
            isMobile ? "relative max-w-xs sm:max-w-xs md:max-w-lg lg:max-w-4xl" : "relative left-20 max-w-xs sm:max-w-xs md:max-w-lg lg:max-w-4xl"
          }
        >
          <div className="rounded-full bg-gradient-to-b from-saseBlue to-saseGreen p-2">
            <div className="rounded-full bg-muted p-6 px-12 font-redhat font-medium">
              <div className="relative z-10 md:text-xl lg:text-2xl xl:text-3xl">
                To view our sponsorship packet, or for any related questions, please contact our External Vice President, Manav Sanghvi, at{" "}
                <a href={`mailto:ufsase.evp@gmail.com`} className="font-bold underline">
                  ufsase.evp@gmail.com
                </a>
                .
              </div>
            </div>
          </div>

          {/* Message Tail */}
          <div className="relative bottom-10 right-24 ml-auto h-20 w-20 rotate-45 rounded-br-lg bg-saseGreen">
            <div className="absolute bottom-2 right-2 h-full w-full rounded-br-lg bg-muted"></div>
          </div>
        </div>

        <div className="mb-36 mt-28 flex w-full flex-col items-center justify-center sm:w-2/3">
          <div className="max-w-8xl relative">
            <div className="absolute -top-28 z-20">
              {/* Chat Bubble */}
              <div className="rounded-full bg-gradient-to-b from-saseBlue to-saseGreen p-2">
                <div className="xs:p-4 rounded-full bg-muted p-6 font-redhat font-medium">
                  <div className="rounded-full bg-muted font-redhat font-medium">
                    <div className="relative z-10 font-bold sm:text-2xl md:text-3xl xl:text-4xl">Check Out Our Super Sponsors!</div>
                  </div>
                </div>
              </div>

              {/* Message Tail */}
              <div className="relative bottom-6 left-16 h-12 w-12 rotate-45 rounded-br-lg bg-saseGreen">
                <div className="absolute bottom-2 right-2 h-full w-full rounded-br-lg bg-muted"></div>
              </div>
            </div>

            <img
              src={imageUrls["SASELogoStar.png"]}
              alt="Logo"
              style={isMobile ? { width: "200px", height: "200px" } : { width: "250px", height: "250px" }}
              className={isMobile ? "absolute -left-24 -top-12 z-10 object-contain" : "absolute -left-40 -top-16 z-10 object-contain"}
            />

            <div className="ombre-background">
                <div className="w-100 grid grid-cols-1 items-stretch justify-items-center gap-24 rounded-2xl bg-gradient-to-b from-gray-100 to-white p-24 dark:from-gray-900 dark:to-black lg:grid-cols-2 xl:grid-cols-3">
                  {SponsorInfo.map((sponsor) => (
                    <SponsorCard
                      key={sponsor.company}
                      image={sponsor.image}
                      companyName={sponsor.company}
                      type={sponsor.tier as "Diamond" | "Gold" | "Silver" | "Bronze"}
                      shadowcolor={sponsor.shadow_color}
                      link={sponsor.link}
                    />
                  ))}
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
});
