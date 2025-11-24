import SponsorInfo from "@/client/information/Sponsors";
import { imageUrls } from "@assets/imageUrls";
import SponsorCard from "@/client/components/custom_ui/SponsorCard";
import { useIsMobile } from "@hooks/useIsMobile";
import { createFileRoute } from "@tanstack/react-router";
import { seo } from "../utils/seo";
import { OmbreDivider } from "@components/custom_ui/OmbreDivider";
import { ChatBubble } from "@components/sponsors/ChatBubble";

export const Route = createFileRoute("/sponsors")({
  meta: () => [
    ...seo({
      title: "Sponsors | UF SASE",
      description: "Current corporate sponsors of UF SASE and contact info for company sponsorship packet",
      image: imageUrls["SASELogo.png"],
    }),
  ],
  component: () => {
    const isMobile = useIsMobile();

    return (
      <div className="flex flex-col items-center p-10">
        <h1 className="header-text ombre-text text-center">CURRENT SPONSORS</h1>
        <OmbreDivider/>
        <OmbreDivider/>

        <div
          className={
            isMobile ? "pt-10 relative max-w-xs sm:max-w-2xl" : "pt-10 relative right-20 max-w-7xl"
          }
        >
          <ChatBubble tailSide="left">
            <>
            Become a <span className="font-bold">partner</span> of the{" "}
                  <span className="font-bold">UF Society of Asian Scientists and Engineers (SASE)</span> Chapter!</>
          </ChatBubble>
        </div>

        <div
          className={
            isMobile ? "relative max-w-xs sm:max-w-2xl" : "relative left-20 max-w-5xl"
          }
        >
          <ChatBubble tailSide="right">
            <>
            To view our sponsorship packet, or for any related questions, please contact our External Vice President at{" "}
                <a href={`mailto:ufsase.evp@gmail.com`} className="font-bold underline">
                  ufsase.evp@gmail.com
                </a>
                .
            </>
          </ChatBubble>
        </div>

        <div className={`${isMobile ? "mt-40" : "mt-28"} flex flex-col items-center justify-center max-w-7xl relative`}>
          <div className={`${isMobile ? "-left-4 -top-40" : "left-24 -top-28"} absolute z-10`}>
            {/* Chat Bubble */}
            <ChatBubble tailSide="left">
              <div className="font-bold">Check Out Our Super Sponsors!</div>
            </ChatBubble>
          </div>

          <img
            src={imageUrls["SASELogoStar.png"]}
            alt="Logo"
            className={`absolute object-contain z-20 ${isMobile ? "-top-14 -right-10 w-[125px] h-[125px]" : "-top-20 -right-20 w-[200px] h-[200px]"}`}
          />

          <div className="ombre-background p-2 rounded-2xl">
            <div className="w-full max-w-96 lg:max-w-full grid grid-cols-1 items-stretch justify-items-center gap-10 lg:gap-24 rounded-2xl bg-gradient-to-b from-gray-100 to-white p-10 lg:p-24 dark:from-gray-900 dark:to-black lg:grid-cols-2 xl:grid-cols-3">
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
    );
  },
});
