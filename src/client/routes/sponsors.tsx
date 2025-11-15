import SponsorInfo from "@/client/components/sponsors/SponsorInfo";
import { imageUrls } from "@assets/imageUrls";
import { OmbreBackground } from "@components/custom_ui/OmbreBackground";
import SponsorCard from "@components/sponsors/SponsorCard";
import { createFileRoute } from "@tanstack/react-router";
import { Divide } from "hamburger-react";
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
    return (
      <div className="flex flex-col items-center">
        <h1 className="pb-2 pt-16 text-center font-oswald text-6xl font-normal sm:text-7xl">CURRENT SPONSORS</h1>

        <div className="relative mb-16 mt-6 grid h-2 w-full grid-cols-2">
          <div className="w-full bg-gradient-to-r from-transparent via-[#7DC242] to-[#42957B]" />
          <div className="w-full bg-gradient-to-r from-[#42957B] via-[#0668B3] to-transparent" />
        </div>

        <div className="relative right-20 max-w-6xl">
          {/* Chat Bubble */}
          <OmbreBackground
            innerComponent={
              <div className="rounded-full bg-white p-6 pl-8 pr-8 font-redhat font-medium md:text-xl lg:text-2xl xl:text-3xl">
                <div className="relative z-10">
                  Become a <span className="font-bold">partner</span> of the{" "}
                  <span className="font-bold">UF Society of Asian Scientists and Engineers (SASE)</span> Chapter!
                </div>
              </div>
            }
            isChatBubble={true}
          />

          {/* Message Tail */}
          <div className="relative bottom-10 left-20 h-20 w-20 rotate-45 rounded-br-lg bg-saseBlue">
            <div className="absolute bottom-2 right-2 h-full w-full rounded-br-lg bg-white"></div>
          </div>
        </div>

        <div className="relative left-20 max-w-5xl">
          <OmbreBackground
            innerComponent={
              <div className="rounded-full bg-white p-6 px-12 font-redhat font-medium md:text-xl lg:text-2xl xl:text-3xl">
                <div className="relative z-10">
                  To view our sponsorship packet, or for any related questions, please contact our External Vice President, Manav Sanghvi, at{" "}
                  <a href={`mailto:ufsase.evp@gmail.com`} className="font-bold underline">
                    ufsase.evp@gmail.com
                  </a>
                  .
                </div>
              </div>
            }
            isChatBubble={true}
          />

          {/* Message Tail */}
          <div className="relative bottom-10 right-24 ml-auto h-20 w-20 rotate-45 rounded-br-lg bg-saseGreen">
            <div className="absolute bottom-2 right-2 h-full w-full rounded-br-lg bg-white"></div>
          </div>
        </div>

        <div className="my-36 flex w-full flex-col items-center justify-center sm:w-2/3">
          <div className="max-w-8xl relative">
            <div className="absolute -top-32 z-20">
              <OmbreBackground
                innerComponent={
                  <div className="rounded-full bg-white px-6 py-4 font-redhat font-medium md:text-xl lg:text-2xl xl:text-3xl">
                    <div className="relative z-10 font-bold">Check Out Our Super Sponsors!</div>
                  </div>
                }
                isChatBubble={true}
              />

              {/* Message Tail */}
              <div className="relative bottom-6 left-16 h-12 w-12 rotate-45 rounded-br-lg bg-saseBlue">
                <div className="absolute bottom-2 right-2 h-full w-full rounded-br-lg bg-white"></div>
              </div>
            </div>

            <img
              src={imageUrls["SASELogoStar.png"]}
              alt="Logo"
              style={{ width: "350px", height: "350px" }}
              className="absolute -left-48 -top-20 z-10 object-contain"
            />

            <OmbreBackground
              innerComponent={
                <div className="w-100 relative grid grid-cols-1 items-stretch justify-items-center gap-48 rounded-2xl bg-gradient-to-b from-gray-100 to-white p-24 pl-48 pr-48 dark:from-gray-900 dark:to-black lg:grid-cols-2 xl:grid-cols-2">
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
              }
            />
          </div>
        </div>
      </div>
    );
  },
});
