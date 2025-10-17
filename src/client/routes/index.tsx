import MemberCard from "@/client/components/home/MemberCard";
import MissionCard from "@/client/components/home/MissionCard";
import SponsorInfo from "@/client/components/sponsors/SponsorInfo";
import BoardPic from "@assets/home/Board.png";
import { imageUrls } from "@assets/imageUrls";
import Carousel from "@components/carousel/Carousel";
import MobileMemberCard from "@components/mobile/MobileMemberCard";
import SponsorCard from "@components/sponsors/SponsorCard";
import { useIsMobile } from "@hooks/useIsMobile";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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

    return (
      <div className="flex flex-col items-center">
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

        <div className="flex w-full flex-col items-center bg-saseGray p-12 dark:bg-black">
          <h1 className="pb-12 text-center font-oswald text-6xl font-medium">Our Mission</h1>
          <div className="grid gap-12 pl-4 pr-4 sm:grid-cols-1 md:grid-cols-3">
            <MissionCard
              image={imageUrls["Briefcase.png"]}
              mission="Professional Development"
              text="To prepare Asian heritage students for success in the
                transnational, global business world."
              shadow="green"
            />
            <MissionCard
              image={imageUrls["People.png"]}
              mission="Diversity"
              text="To promote diversity and tolerance on campuses and in the
                workplace."
              shadow="blue"
            />
            <MissionCard
              image={imageUrls["Lightbulb.png"]}
              mission="Community"
              text="To provide opportunities for its members to make contributions
                to their local communities."
              shadow="green"
            />
          </div>
        </div>

        {isMobile ? (
          <>
            <div className="relative grid h-2 w-full grid-cols-2">
              <div className="w-full bg-gradient-to-r from-transparent via-[#7DC242] to-[#42957B]" />
              <div className="w-full bg-gradient-to-r from-[#42957B] via-[#0668B3] to-transparent" />
            </div>
            <div className="my-2 flex w-full flex-col items-center bg-saseGray p-12 dark:bg-black">
              <MobileMemberCard
                image={imageUrls["President.jpeg"]}
                name="Vincent Lin"
                role="President"
                textColor="blue"
                quote="Love the SASE Community :)"
                imageSide="left"
              />
              <div className="h-1 w-5/6 bg-gradient-to-r from-saseGreen to-saseBlue" />
              <MobileMemberCard
                image={imageUrls["InternalVicePresident.jpeg"]}
                name="Bryan Park"
                role="Internal Vice President"
                textColor="green"
                quote="I love SASE <3"
                imageSide="right"
              />
              <div className="h-1 w-5/6 bg-gradient-to-l from-saseGreen to-saseBlue" />
              <MobileMemberCard
                image={imageUrls["ExternalVicePresident.jpeg"]}
                name="Kayleen Diaz"
                role="External Vice President"
                textColor="blue"
                quote="Grow professionally with SASE! :D"
                imageSide="left"
              />
            </div>
            <div className="relative mx-12 grid h-2 w-full grid-cols-2">
              <div className="w-full bg-gradient-to-r from-transparent via-[#7DC242] to-[#42957B]" />
              <div className="w-full bg-gradient-to-r from-[#42957B] via-[#0668B3] to-transparent" />
            </div>
          </>
        ) : (
          <div className="grid grid-cols-3 gap-12 bg-white p-12 dark:bg-black">
            <MemberCard image={imageUrls["President.jpeg"]} name="Vincent Lin" role="President" textColor="blue" quote="Love the SASE Community :)" />
            <MemberCard
              image={imageUrls["InternalVicePresident.jpeg"]}
              name="Bryan Park"
              role="Internal Vice President"
              textColor="green"
              quote="I love SASE <3"
            />
            <MemberCard
              image={imageUrls["ExternalVicePresident.jpeg"]}
              name="Kayleen Diaz"
              role="External Vice President"
              textColor="blue"
              quote="Grow professionally with SASE! :D"
            />
          </div>
        )}

        <div className="w-full bg-black p-10">
          <h1 className="w-full pb-12 text-center font-oswald text-6xl font-medium text-white">Our Values</h1>
          <Carousel prog="N/A" purpose="Values" />
        </div>

        <div className="dark:black flex w-full flex-col items-center justify-center bg-white p-12 dark:bg-black">
          <h1 className="w-full pb-12 text-center font-oswald text-6xl font-medium">Sponsors</h1>
          <div className="mb-20 flex w-10/12 flex-col items-start gap-14 lg:flex-row xl:gap-24">
            <div className="flex w-full flex-col items-center rounded-2xl border-4 border-foreground bg-muted p-10 shadow-[12px_12px_0px_#7DC242]">
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
              <div className="grid w-full grid-cols-1 gap-14 sm:grid-cols-2 xl:gap-24">
                {SponsorInfo.map((sponsor) =>
                  sponsor.tier === "Diamond" ? (
                    <SponsorCard
                      key={sponsor.company}
                      image={sponsor.image}
                      companyName={sponsor.company}
                      type={sponsor.tier}
                      shadowcolor={sponsor.shadow_color}
                      link={sponsor.link}
                    />
                  ) : null,
                )}
              </div>
              <p className="m-0 mt-[-30px] w-full text-center font-redhat text-2xl italic text-foreground xl:text-3xl">Current Featured Sponsors</p>
            </div>
          </div>
        </div>
      </div>
    );
  },
});
