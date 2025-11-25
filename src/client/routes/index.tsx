import MemberCard from "@/client/components/custom_ui/MemberCard";
import MissionCard from "@/client/components/custom_ui/MissionCard";
import SponsorInfo from "@/client/information/Sponsors";
import BoardPic from "@assets/home/Board.png";
import { imageUrls } from "@assets/imageUrls";
import Carousel from "@components/carousel/Carousel";
import { Missions } from "@/client/information/Missions";
import MobileMemberCard from "@/client/components/custom_ui/MobileMemberCard";
import { MobileMissionCarousel } from "@/client/components/home/MobileMissionCarousel";
import SponsorCard from "@/client/components/custom_ui/SponsorCard";
import { useIsMobile } from "@hooks/useIsMobile";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { seo } from "../utils/seo";
import { PIEBoard } from "@information/People";
import { OmbreDivider } from "@components/custom_ui/OmbreDivider";
import { cn } from "@/shared/utils";

export const Route = createFileRoute("/")({
  meta: () => [
    ...seo({
      title: "UF SASE",
      description:
        "University of Florida Chapter of the Society of Asian Scientists & Engineers, committed to fostering meaningful connections across cultures and empowering Asian Pacific Islander Desi American (APIDA) professionals in science and engineering.",
      image: imageUrls["SASELogo.png"],
    }),
  ],

  component: () => {
    const isMobile = useIsMobile();
    const [expanded, setExpanded] = useState(false);

    return (
      <div className="flex flex-col items-center">
        {/* Title & Image Section */}
        <div className="flex w-full flex-col items-center">
          <img src={BoardPic} alt="2023-2024 SASE Board" className="relative h-auto w-full" />
          <div className="absolute w-full items-center px-[10%] font-oswald font-bold italic text-white text-3xl pt-[30%] sm:text-5xl lg:text-7xl xl:pt-[35%]">
            <h1 className="flex w-full items-center">
              <span>S </span>
              <img src={imageUrls["WhiteLogo.png"]} alt="SASE Logo" className="inline-block h-[1.5em] align-middle" />
              <span>CIETY OF ASIAN</span>
            </h1>
            <h1 className="w-full text-right">SCIENTISTS & ENGINEERS</h1>
          </div>
        </div>

        {/* Video & Description Section */}
        <div className="flex flex-col items-center bg-black py-10">
          <div className="rounded-2xl w-9/12 ombre-background p-1">
            <div className={cn({"text-start p-10" : !isMobile, "text-center p-4" : isMobile},"flex h-full flex-col rounded-2xl bg-gray-950" )}>
              <h1 className={cn({"text-3xl" : isMobile, "text-5xl" : !isMobile},"pb-10 font-medium text-white font-oswald" )}>University of Florida Chapter</h1>
              <div>
                {/* Video for sm-xl screens */}
                <iframe
                  className="block aspect-video w-full pb-8 pl-2 pr-2 xl:hidden"
                  src="https://www.youtube.com/embed/UymaxCaKkMU"
                  title="UF SASE Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>

                {/* Video for xl+ screen */}
                <iframe
                  className="float-right hidden aspect-video w-1/2 pb-2 pl-8 xl:block"
                  src="https://www.youtube.com/embed/UymaxCaKkMU"
                  title="UF SASE Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <p className={cn({"text-lg" : !isMobile, "text-sm" : isMobile}, "font-redhat text-white")}>
                  The <span className="font-semibold">Society of Asian Scientists & Engineers </span> is a vibrant and dynamic organization at the
                  University of Florida. We are committed to fostering meaningful connections across cultures and empowering{" "}
                  <span className="font-semibold">Asian Pacific Islander Desi American (APIDA) </span>
                  professionals in <span className="font-semibold">science and engineering</span>.
                </p>

                {!isMobile || expanded ? (
                  <>
                    <br />
                <p className={cn({"text-lg" : !isMobile, "text-sm" : isMobile}, "font-redhat text-white")}>
                      Through <span className="font-semibold">engaging meetings and events</span>, we provide a nurturing environment where you can
                      acquire <span className="font-semibold">essential skills and knowledge </span>
                      to excel in the professional world. Our <span className="font-semibold">inclusive community </span>
                      welcomes individuals from all majors, offering a friendly atmosphere to help you secure internships, jobs, and network with
                      like-minded peers. Beyond <span className="font-semibold">personal growth</span>, we are dedicated to making a positive impact
                      in our <span className="font-semibold">local communities</span>. By celebrating diversity and embracing our heritage, we create{" "}
                      <span className="font-semibold">opportunities </span>for our members to contribute meaningfully to society.
                    </p>
                  </>
                ) : null}

                {isMobile && (
                  <button className="mt-4 text-saseGreen underline font-redhat text-lg" onClick={() => setExpanded(!expanded)}>
                    {expanded ? "Read Less" : "Read More"}
                  </button>
                )}
              </div>
              <img
                src={imageUrls["SASELogoStar.png"]}
                alt="SASE Logo"
                className="absolute right-0 top-0 w-[20%] -translate-y-1/2 translate-x-1/3 rotate-12 2xl:w-[10%]"
              />
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="flex w-full flex-col items-center bg-saseGray px-12 py-10 dark:bg-greenBackground">
          <h1 className="subheader-text">Our Mission</h1>

          {isMobile ? (
            <div className="w-full">
              <MobileMissionCarousel slides={Missions} />
            </div>
          ) : (
            <div className="w-full">
              <div className="mx-auto grid max-w-7xl grid-cols-3 items-stretch gap-10 px-6">
                {Missions.map((s) => (
                  <div key={s.mission} className="flex justify-center">
                    <MissionCard image={s.image} mission={s.mission} text={s.homeText} shadow={s.shadow} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Images of PIE Board */}
        <OmbreDivider/>
        <OmbreDivider/>
        {isMobile ? (
          <>
            <div className="flex w-full flex-col items-center bg-white px-4 py-10 gap-4 dark:bg-black">
              {PIEBoard.map((p, i) => (
                <div key={i} className="flex flex-col gap-4">
                  <MobileMemberCard
                    name={p.fullName}
                    role={p.position}
                    textColor={p.fontColor}
                    quote={p.quote}
                    image={p.image}
                    imageSide={p.mobileAlignment}
                  />
                  {i < PIEBoard.length - 1 && <OmbreDivider/>}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="grid grid-cols-3 gap-12 bg-white p-10 dark:bg-black">
            {PIEBoard.map((p, i) => (
              <MemberCard name={p.fullName} role={p.position} textColor={p.fontColor} quote={p.quote} image={p.image} key={i} />
            ))}
          </div>
        )}
        <OmbreDivider/>
        <OmbreDivider/>

        {/* Values Section */}
        <div className="w-full flex flex-col items-center bg-black py-10 px-4">
          <h1 className="subheader-text text-white">Our Values</h1>
          <Carousel prog="N/A" purpose="Values" />
        </div>

        {/* Sponsors Section */}
        <div className="flex w-full flex-col items-center justify-center bg-saseGray pt-10 pb-14 dark:bg-greenBackground">
          <h1 className="subheader-text">Sponsors</h1>
          <div className="w-10/12 flex justify-center items-center">
            {isMobile ? (
              <div className="relative flex flex-col items-center rounded-2xl border-4 border-border bg-muted p-4 shadow-[12px_12px_0px_#7DC242]">
                <p className="mb-8 text-center font-redhat text-sm">
                  Are you interested in becoming a partner with the UF Society of Asian Scientists and Engineers (SASE) Chapter?
                  <br />
                  <br />
                  To get access to our sponsorship packet, please contact our External Vice President, Manav Sanghvi, at
                  <a href="mailto:ufsase.evp@gmail.com" className="text-saseGreen underline">
                    {" "}
                    ufsase.evp@gmail.com
                  </a>
                  .
                </p>

                {/* Sponsors inside the box on mobile */}
                <div className="max-w-60 w-1/2">
                  {SponsorInfo.map((s) =>
                    s.tier === "Diamond" ? (
                      <SponsorCard
                        key={s.company}
                        image={s.image}
                        companyName={s.company}
                        type={s.tier as "Diamond" | "Gold" | "Silver" | "Bronze"}
                        shadowcolor={s.shadow_color}
                        link={s.link}
                        mobileVariant="compact"
                        location="home"
                      />
                    ) : null,
                  )}
                </div>

                <p className="mt-6 w-full text-center font-redhat text-sm italic text-foreground">Current Featured Sponsor</p>
              </div>
            ) : (
              <div className="flex flex-row items-start justify-center h-96">
                <div className="flex w-full h-full flex-col items-center rounded-2xl border-4 border-border bg-muted p-10 shadow-[12px_12px_0px_#7DC242]">
                  <p className="p-4 text-left font-redhat text-lg">
                    Are you interested in becoming a partner with the UF Society of Asian Scientists and Engineers (SASE) Chapter?
                    <br />
                    <br />
                    To get access to our sponsorship packet, please contact our External Vice President, Manav Sanghvi at
                    <a href="mailto:ufsase.evp@gmail.com" className="text-saseGreen underline">
                      {" "}
                      ufsase.evp@gmail.com
                    </a>
                    .
                  </p>
                </div>

                <div className="flex w-full flex-col items-center gap-4 h-full">
                  <div className="grid max-w-1/2 grid-cols-1 justify-items-center">
                    {SponsorInfo.map((sponsor) =>
                      sponsor.tier === "Diamond" ? (
                        <SponsorCard
                          key={sponsor.company}
                          image={sponsor.image}
                          companyName={sponsor.company}
                          type={sponsor.tier as "Diamond" | "Gold" | "Silver" | "Bronze"}
                          shadowcolor={sponsor.shadow_color}
                          link={sponsor.link}
                          location="home"
                        />
                      ) : null,
                    )}
                  </div>
                  <p className="w-full text-center font-redhat text-lg italic">Current Featured Sponsor</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
});
