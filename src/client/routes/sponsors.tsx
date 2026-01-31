import PartnerCard from "@/client/components/custom_ui/PartnerCard";
import SponsorCard from "@/client/components/custom_ui/SponsorCard";
import PartnerInfo from "@/client/information/Partners";
import SponsorInfo from "@/client/information/Sponsors";
import { imageUrls } from "@assets/imageUrls";
import { OmbreDivider } from "@components/custom_ui/OmbreDivider";
import { ChatBubble } from "@components/sponsors/ChatBubble";
import { useIsMobile } from "@hooks/useIsMobile";
import { createFileRoute } from "@tanstack/react-router";
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
    const isMobile = useIsMobile();

    return (
      <div className="flex flex-col items-center p-10">
        <h1 className="header-text ombre-text text-center">CURRENT SPONSORS</h1>
        <OmbreDivider />
        <OmbreDivider />

        <div className="relative mt-24 flex max-w-7xl flex-col items-center justify-center">
          <div className="ombre-background rounded-2xl p-2">
            <div className="grid w-full max-w-96 grid-cols-1 items-stretch justify-items-center gap-10 rounded-2xl bg-gradient-to-b from-gray-100 to-white p-10 dark:from-gray-900 dark:to-black lg:max-w-full lg:grid-cols-2 lg:gap-24 lg:p-24 xl:grid-cols-3">
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

        <h1 className="header-text ombre-text mt-24 text-center">CURRENT PARTNERS</h1>
        <OmbreDivider />
        <OmbreDivider />

        <div className="relative mb-8 mt-24 flex max-w-7xl flex-col items-center justify-center">
          <div className="ombre-background rounded-2xl p-2">
            <div className="grid w-full max-w-96 grid-cols-1 items-stretch gap-12 rounded-2xl bg-gradient-to-b from-gray-100 to-white p-10 dark:from-gray-900 dark:to-black lg:max-w-full lg:grid-cols-3 lg:p-24 xl:grid-cols-4">
              {PartnerInfo.map((partner) => (
                <PartnerCard
                  key={partner.company}
                  image={partner.image}
                  companyName={partner.company}
                  shadowcolor={partner.shadow_color}
                  link={partner.link}
                />
              ))}
            </div>
          </div>
        </div>

        {isMobile ? (
          <>
            <div className="relative mb-8 flex w-full flex-col place-items-center">
              <div className={"relative max-w-xs pt-10 sm:max-w-2xl"}>
                <ChatBubble tailSide="left">
                  <>
                    Become a <span className="font-bold">partner</span> of the{" "}
                    <span className="font-bold">UF Society of Asian Scientists and Engineers (SASE)</span> Chapter!
                  </>
                </ChatBubble>
              </div>

              {/* Logo Image*/}
              <img
                src={imageUrls["SASELogoWithoutText.png"]}
                alt="SASE Logo"
                style={{ maxWidth: "210px", maxHeight: "275px" }}
                className={"[transform:scaleX(-1)]"}
              />

              <div className={"relative max-w-md"}>
                <ChatBubble tailSide="left" upsideDown={true}>
                  <>
                    To view our sponsorship packet, or for any related questions, please contact our External Vice President at{" "}
                    <a href={`mailto:ufsase.evp@gmail.com`} className="font-bold underline">
                      ufsase.evp@gmail.com
                    </a>
                    .
                  </>
                </ChatBubble>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={"relative max-w-6xl pt-10"}>
              <ChatBubble tailSide="left">
                <>
                  Become a <span className="font-bold">partner</span> of the{" "}
                  <span className="font-bold">UF Society of Asian Scientists and Engineers (SASE)</span> Chapter!
                </>
              </ChatBubble>
            </div>

            <div className="relative mb-8 grid w-full grid-cols-[1fr_2fr]">
              {/* Logo Image*/}
              <img
                src={imageUrls["SASELogoWithoutText.png"]}
                alt="SASE Logo"
                style={{ maxWidth: "210px", maxHeight: "275px" }}
                className={"ml-auto [transform:scaleX(-1)]"}
              />

              <div className={"relative bottom-12 right-20 ml-24 max-w-5xl"}>
                <ChatBubble tailSide="left">
                  <>
                    To view our sponsorship packet, or for any related questions, please contact our External Vice President at{" "}
                    <a href={`mailto:ufsase.evp@gmail.com`} className="font-bold underline">
                      ufsase.evp@gmail.com
                    </a>
                    .
                  </>
                </ChatBubble>
              </div>
            </div>
          </>
        )}
      </div>
    );
  },
});
