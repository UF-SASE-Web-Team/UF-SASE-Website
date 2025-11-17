import MemberCard from "@/client/components/home/MemberCard";
import MissionCard from "@/client/components/home/MissionCard";
import SponsorInfo from "@/client/components/sponsors/SponsorInfo";
import { cn } from "@/shared/utils";
import BoardPic from "@assets/home/Board.png";
import { imageUrls } from "@assets/imageUrls";
import Carousel from "@components/carousel/Carousel";
import { Missions, People } from "@components/home/HomePageInfoArrays";
import MobileMemberCard from "@components/mobile/MobileMemberCard";
import { MobileMissionCarousel } from "@components/mobile/MobileMissionCarousel";
import SponsorCard from "@components/sponsors/SponsorCard";
import { useIsMobile } from "@hooks/useIsMobile";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { applyOmbreDivider } from "../utils/ombre-divider";
import { seo } from "../utils/seo";

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

    useEffect(() => {
      applyOmbreDivider();
    });

    return (
      <div className="flex flex-col items-center">
        {/* Title & Image Section */}
        <div className="flex w-full flex-col items-center">
          <img src={BoardPic} alt="2023-2024 SASE Board" className="relative h-auto w-full" />
          <div className="absolute w-full items-center p-8 pt-[35%] font-oswald text-3xl font-bold italic text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            <h1 className="flex w-full items-center pl-[5%] sm:pl-[10%]">
              <span>S </span>
              <img src={imageUrls["WhiteLogo.png"]} alt="SASE Logo" className="inline-block h-[1.5em] align-middle" />
              <span>CIETY OF ASIAN</span>
            </h1>
            <h1 className="w-full pr-[5%] text-right sm:pr-[10%]">SCIENTISTS & ENGINEERS</h1>
          </div>
        </div>

        {/* Video & Descritpion Section */}
        <div className="flex flex-col items-center bg-black px-0 py-14 md:px-8 lg:px-12">
          <div className="relative w-9/12 rounded-2xl bg-gradient-to-r from-saseBlue via-[#7DC242] to-saseGreen p-[4px]">
            <div className="flex h-full flex-col rounded-2xl bg-gray-950 p-4 text-center lg:p-10 lg:text-start">
              <h1 className="pb-12 font-oswald text-3xl font-medium text-white sm:text-5xl">University of Florida Chapter</h1>
              <div>
                {/* Video for sm-xl screens */}
                <iframe
                  className="block aspect-video w-full pb-8 pl-2 pr-2 xl:hidden"
                  src="https://www.youtube.com/embed/JV9HAUhVet8"
                  title="UF SASE Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>

                {/* Video for xl+ screen */}
                <iframe
                  className="float-right hidden aspect-video w-1/2 pb-2 pl-8 xl:block"
                  src="https://www.youtube.com/embed/JV9HAUhVet8"
                  title="UF SASE Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <p className="font-redhat text-lg text-white md:text-xl">
                  The <span className="font-semibold">Society of Asian Scientists & Engineers </span> is a vibrant and dynamic organization at the
                  University of Florida. We are committed to fostering meaningful connections across cultures and empowering{" "}
                  <span className="font-semibold">Asian Pacific Islander Desi American (APIDA) </span>
                  professionals in <span className="font-semibold">science and engineering</span>.
                </p>

                {!isMobile || expanded ? (
                  <>
                    <br />
                    <p className="font-redhat text-lg text-white md:text-xl">
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
                  <button className="mt-4 text-saseGreen underline" onClick={() => setExpanded(!expanded)}>
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
        <div className="flex w-full flex-col items-center bg-saseGray p-12 dark:bg-greenBackground">
          <h1 className={cn({ "pb-5": isMobile, "pb-12": !isMobile }, `text-center font-oswald text-6xl font-medium`)}>Our Mission</h1>

          {isMobile ? (
            <div className="w-full">
              <MobileMissionCarousel slides={Missions} />
            </div>
          ) : (
            <div className="w-full">
              <div className="mx-auto grid max-w-7xl grid-cols-3 items-stretch gap-10 px-6">
                {Missions.map((s) => (
                  <div key={s.mission} className="flex justify-center">
                    <div
                      className={[
                        "relative h-full min-h-[330px] w-full max-w-[560px] lg:min-h-[330px]",
                        "[&>div]:h-full",
                        "[&>div>div:nth-child(2)]:h-full",
                        "[&>div>div:nth-child(2)>div]:h-full",
                        // hide the background copy on desktop
                        "[&>div>div:first-child]:hidden",
                        // scale whole card on hover
                        "[&>div]:transition-transform",
                        "[&>div]:duration-300",
                        "[&>div]:transform-gpu",
                        "hover:[&>div]:scale-105",
                        s.shadow === "blue"
                          ? "hover:[&>div>div:nth-child(2)]:shadow-[12px_12px_0_#0668B3]"
                          : "hover:[&>div>div:nth-child(2)]:shadow-[12px_12px_0_#7DC242]",
                        // prevent inner double-scale
                        "[&>div>div:nth-child(2)>div:hover]:scale-100",
                      ].join(" ")}
                    >
                      <MissionCard image={s.image} mission={s.mission} text={s.text} shadow={s.shadow} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Images of Vincent, Bryan, Kayleen */}
        <div className="relative grid h-2 w-full grid-cols-2">
          <div className="w-full bg-gradient-to-r from-transparent via-[#7DC242] to-[#42957B]" />
          <div className="w-full bg-gradient-to-r from-[#42957B] via-[#0668B3] to-transparent" />
        </div>
        {isMobile ? (
          <>
            <div className="flex w-full flex-col items-center bg-white px-12 py-8 dark:bg-black">
              {People.map((p, i) => (
                <div key={i}>
                  <MobileMemberCard
                    name={p.fullName}
                    role={p.position}
                    textColor={p.fontColor}
                    quote={p.quote}
                    image={p.image}
                    imageSide={p.mobileAlignment}
                  />
                  {i < People.length - 1 && <div className="ombre-divider" />}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="grid grid-cols-3 gap-12 bg-white p-12 dark:bg-black">
            {People.map((p, i) => (
              <MemberCard name={p.fullName} role={p.position} textColor={p.fontColor} quote={p.quote} image={p.image} key={i} />
            ))}
          </div>
        )}
        <div className="relative mx-12 grid h-2 w-full grid-cols-2">
          <div className="w-full bg-gradient-to-r from-transparent via-[#7DC242] to-[#42957B]" />
          <div className="w-full bg-gradient-to-r from-[#42957B] via-[#0668B3] to-transparent" />
        </div>

        {/* Values Section */}
        <div className={cn({ "py-10": isMobile, "p-10": !isMobile }, `w-full bg-black py-10`)}>
          <h1 className="w-full pb-12 text-center font-oswald text-6xl font-medium text-white">Our Values</h1>
          <Carousel prog="N/A" purpose="Values" />
        </div>

        {/* --- Sponsors Section --- */}
        <div className="flex w-full flex-col items-center justify-center bg-saseGray p-10 dark:bg-greenBackground">
          <h1 className="w-full pb-12 text-center font-oswald text-6xl font-medium">Sponsors</h1>
          <div className="w-11/12">
            {isMobile ? (
              <div className="relative rounded-2xl border-4 border-border bg-muted px-12 py-8 shadow-[12px_12px_0px_#7DC242]">
                <p className="mb-8 text-left font-redhat text-xl">
                  Are you interested in becoming a partner with the UF Society of Asian Scientists and Engineers (SASE) Chapter?
                  <br />
                  <br />
                  To get access to our sponsorship packet, please contact our External Vice President at
                  <a href="mailto:ufsase.evp@gmail.com" className="text-saseGreen underline">
                    {" "}
                    ufsase.evp@gmail.com
                  </a>
                  .
                </p>

                {/* Sponsors inside the box on mobile */}
                <div className="align-items grid w-full grid-cols-2 place-items-stretch justify-items-center gap-8">
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

                <p className="mt-6 w-full text-center font-redhat text-xl italic text-foreground">Current Featured Sponsors</p>
              </div>
            ) : (
              <div className="mb-20 flex w-full flex-row items-start gap-16">
                <div className="flex w-full flex-col items-center rounded-2xl border-4 border-border bg-muted p-10 shadow-[12px_12px_0px_#7DC242]">
                  <p className="p-4 text-left font-redhat text-xl sm:text-2xl">
                    Are you interested in becoming a partner with the UF Society of Asian Scientists and Engineers (SASE) Chapter?
                    <br />
                    <br />
                    To get access to our sponsorship packet, please contact our External Vice President at
                    <a href="mailto:ufsase.evp@gmail.com" className="text-saseGreen underline">
                      {" "}
                      ufsase.evp@gmail.com
                    </a>
                    .
                  </p>
                </div>

                <div className="flex w-full flex-col items-center gap-12">
                  <div className="grid w-1/2 grid-cols-1 justify-items-center gap-14">
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
                  <p className="mt-[-30px] w-full text-center font-redhat text-2xl italic text-foreground xl:text-3xl">Current Featured Sponsors</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
});
