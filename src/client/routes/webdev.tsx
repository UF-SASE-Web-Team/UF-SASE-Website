import { cn } from "@/shared/utils";
import UIUXLead from "@assets/webdev/HelenZou.png";
import WebmasterChair2 from "@assets/webdev/LynetteHemingway.png";
import BackendLead from "@assets/webdev/RJTabelon.png";
import FrontEndLead from "@assets/webdev/StephanieFong.png";
import WebmasterChair from "@assets/webdev/ThuyLe.png";
import WebTeamGroupImage from "@assets/webdev/WebDevTeamCropped.png";
import WebTeamDescription from "@assets/webdev/WebDevTerminal.png";
import WebTeamTitle from "@assets/webdev/WebTeam.png";
import RickyZhang from "@assets/webdev/WebmasterChair.jpeg";
import MemberCard from "@components/home/MemberCard";
import MobileMemberCard from "@components/mobile/MobileMemberCard";
import FAQ from "@components/programs/FAQCard";
import { faqData } from "@components/programs/faqWebdev";
import { useIsMobile } from "@hooks/useIsMobile";
import { createFileRoute } from "@tanstack/react-router";
import { Divide } from "hamburger-react";
import StateManagedSelect from "node_modules/react-select/dist/declarations/src";
import { useState } from "react";
import { imageUrls } from "../assets/imageUrls";
import { seo } from "../utils/seo";

export const Route = createFileRoute("/webdev")({
  meta: () => [
    ...seo({
      title: "Web Dev | UF SASE",
      description: "UF SASE Web Development team consists of UI/UX, Frontend, and Backend teams creating the SASE website, using agile practices.",
      image: imageUrls["SASELogo.png"],
    }),
  ],

  component: () => {
    const isMobile = useIsMobile();
    const [buttonToggle, setToggle] = useState(1);

    const toggleState = (position: number) => {
      setToggle(position);
    };

    return (
      <div className="mt-12 flex min-h-screen flex-col items-center bg-background">
        <div className="-mt-10 flex w-full max-w-7xl flex-col sm:flex-row sm:items-center">
          <div className="relative mx-auto w-[75%] sm:w-2/5">
            <img src={WebTeamTitle} alt="Web Team" className="mx-auto h-auto w-full sm:mx-0" />
          </div>
          <div className="relative w-full sm:w-4/5">
            <img src={WebTeamDescription} alt="Terminal" className="h-auto w-full" />
          </div>
        </div>
        <div className="w-full">
          <div className="relative w-full">
            <div className="relative flex flex-col items-center justify-center bg-[#1E1E1E] py-10 sm:h-[600px] sm:py-20">
              <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-saseGreen via-[#7DC242] to-saseBlue"></div>
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-saseGreen via-[#7DC242] to-saseBlue"></div>
              <img src={WebTeamGroupImage} alt="Web Team" className="relative z-10 w-[95%] rounded-3xl sm:w-3/5" />
              <div className="mt-2 px-3 pt-3 sm:w-3/5 sm:px-0">
                <p className="font-silkscreen text-[20px] leading-relaxed text-white sm:text-[30px]">
                  &gt; &gt; APPLICATIONS: <span className="text-saseBlue">CLOSED</span> <br />
                  <span className="font-redhat text-base leading-relaxed text-white sm:text-lg">
                    <strong>Spring 2026</strong> applications can be found on UF SASE’s{" "}
                    <a href="https://www.instagram.com/ufsase/" target="_blank" rel="noopener noreferrer" className="text-saseGreen underline">
                      Instagram
                    </a>{" "}
                    and{" "}
                    <a href="http://discord.gg/q3HBeC5" target="_blank" rel="noopener noreferrer" className="text-saseGreen underline">
                      Discord
                    </a>
                    !
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div
            className={cn(`mx-auto mt-10 flex max-w-2xl rounded-full border-2 border-black bg-muted font-redhat text-3xl font-medium`, {
              "max-w-sm text-xl": isMobile,
            })}
          >
            <button
              onClick={() => toggleState(1)}
              className={cn(`flex-grow rounded-full py-4 transition duration-300 hover:brightness-90`, {
                "bg-saseGreen": buttonToggle === 1,
                "bg-muted": buttonToggle !== 1,
              })}
            >
              Website
            </button>
            <button
              onClick={() => toggleState(2)}
              className={cn(`flex-grow rounded-full bg-muted py-4 transition duration-300 hover:brightness-90`, {
                "bg-saseGreen": buttonToggle === 2,
                "bg-muted": buttonToggle !== 2,
              })}
            >
              Project
            </button>
            <button
              onClick={() => toggleState(3)}
              className={cn(`flex-grow rounded-full py-4 transition duration-300 hover:brightness-90`, {
                "bg-saseGreen": buttonToggle === 3,
                "bg-muted": buttonToggle !== 3,
              })}
            >
              Past Webmasters
            </button>
          </div>
          <header className="mt-4 flex w-full justify-center sm:mt-8">
            <h2 className="bg-gradient-to-r from-saseGreen via-[#7DC242] to-saseBlue bg-clip-text text-center font-silkscreen text-[40px] text-transparent sm:mb-10 sm:text-[50px]">
              Leadership
            </h2>
          </header>
          {isMobile ? (
            <>
              {buttonToggle !== 3 ? (
                <>
                  {/* Current Webmasters */}
                  <MobileMemberCard image={WebmasterChair} name="Thuy Le" role="Webmaster" textColor="blue" quote="SWT is sweet" imageSide="left" />
                  <div className="mx-auto h-1 w-[95%] bg-gradient-to-r from-saseBlue to-saseGreen" />
                  <MobileMemberCard
                    image={WebmasterChair2}
                    name="Lynette Hemingway"
                    role="Webmaster"
                    textColor="green"
                    quote="...sandwiches"
                    imageSide="right"
                  />
                </>
              ) : (
                <>
                  {/* Past Webmasters */}
                  <MobileMemberCard image={RickyZhang} name="Ricky Zhang" role="2024-2025" textColor="blue" quote="i love sase" imageSide="left" />
                  <div className="mx-auto h-1 w-[95%] bg-gradient-to-r from-saseBlue to-saseGreen" />
                  <MobileMemberCard
                    image={RickyZhang}
                    name="Gurleen Dhillon"
                    role="2023-2024"
                    textColor="green"
                    quote="i love sase"
                    imageSide="right"
                  />
                  <div className="mx-auto h-1 w-[95%] bg-gradient-to-r from-saseGreen to-saseBlue" />
                  <MobileMemberCard image={RickyZhang} name="Maren Heck" role="2022-2023" textColor="blue" quote="i love sase" imageSide="left" />
                  <div className="mx-auto h-1 w-[95%] bg-gradient-to-r from-saseBlue to-saseGreen" />
                  <MobileMemberCard image={RickyZhang} name="Julia Le" role="2021-2022" textColor="green" quote="i love sase" imageSide="right" />
                </>
              )}

              {/* Web Maintenance Team Leads */}
              {buttonToggle === 1 && (
                <>
                  <div className="mx-auto h-1 w-[95%] bg-gradient-to-l from-saseBlue to-saseGreen" />
                  <MobileMemberCard
                    image={FrontEndLead}
                    name="Stephanie Fong"
                    role="Frontend"
                    textColor="blue"
                    quote="food, family, friends, front-end"
                    imageSide="left"
                  />
                  <div className="mx-auto h-1 w-[95%] bg-gradient-to-l from-saseGreen to-saseBlue" />
                  <MobileMemberCard
                    image={BackendLead}
                    name="RJ Tabelon"
                    role="Backend"
                    textColor="green"
                    quote="Lynette thinks we're doing quotes together"
                    imageSide="right"
                  />
                  <div className="mx-auto h-1 w-[95%] bg-gradient-to-l from-saseBlue to-saseGreen" />
                  <MobileMemberCard image={UIUXLead} name="Helen Zou" role="UI/UX" textColor="blue" quote="herm" imageSide="left" />
                </>
              )}

              {/* Semester Project Team Leads */}
              {buttonToggle === 2 && (
                <>
                  <div className="mx-auto h-1 w-[95%] bg-gradient-to-l from-saseBlue to-saseGreen" />
                  <MobileMemberCard image={UIUXLead} name="Kenzo Fukuda" role="Frontend & UI/UX" textColor="blue" quote="test!" imageSide="left" />
                  <div className="mx-auto h-1 w-[95%] bg-gradient-to-l from-saseGreen to-saseBlue" />
                  <MobileMemberCard
                    image={UIUXLead}
                    name="Aadithi Arjun"
                    role="Frontend & UI/UX"
                    textColor="green"
                    quote="test!!"
                    imageSide="right"
                  />
                  <div className="mx-auto h-1 w-[95%] bg-gradient-to-l from-saseBlue to-saseGreen" />
                  <MobileMemberCard image={UIUXLead} name="Vincent Lin" role="Backend" textColor="blue" quote="test!!!" imageSide="left" />
                  <div className="mx-auto h-1 w-[95%] bg-gradient-to-l from-saseGreen to-saseBlue" />
                  <MobileMemberCard image={UIUXLead} name="Jordan Kusuda" role="Backend" textColor="green" quote="test!!!!" imageSide="right" />
                </>
              )}
            </>
          ) : (
            <div className="mb-12 flex flex-col items-center justify-center gap-8">
              <div className="flex flex-row gap-8">
                {buttonToggle !== 3 ? (
                  <>
                    {/* Current Webmasters */}
                    <MemberCard image={WebmasterChair} name="Thuy Le" role="Webmaster" textColor="blue" quote="SWT is sweet" />
                    <MemberCard image={WebmasterChair2} name="Lynette Hemingway" role="Webmaster" textColor="blue" quote="...sandwiches" />
                  </>
                ) : (
                  <>
                    {/* Past Webmasters */}
                    <MemberCard image={RickyZhang} name="Ricky Zhang" role="2024-2025" textColor="blue" quote="i love sase" />
                    <MemberCard image={RickyZhang} name="Gurleen Dhillon" role="2023-2024" textColor="green" quote="i love sase" />
                    <MemberCard image={RickyZhang} name="Maren Heck" role="2022-2023" textColor="blue" quote="i love sase" />
                    <MemberCard image={RickyZhang} name="Julia Le" role="2021-2022" textColor="green" quote="i love sase" />
                  </>
                )}
              </div>

              <div className="flex flex-row gap-8">
                {/* Web Maintenance Team Leads */}
                {buttonToggle === 1 && (
                  <>
                    <MemberCard
                      image={FrontEndLead}
                      name="Stephanie Fong"
                      role="Frontend"
                      textColor="green"
                      quote="food, family, friends, front-end"
                    />
                    <MemberCard
                      image={BackendLead}
                      name="RJ Tabelon"
                      role="Backend"
                      textColor="green"
                      quote="Lynette thinks we're doing quotes together"
                    />
                    <MemberCard image={UIUXLead} name="Helen Zou" role="UI/UX" textColor="green" quote="herm" />
                  </>
                )}

                {/* Semester Project Team Leads */}
                {buttonToggle === 2 && (
                  <>
                    <MemberCard image={UIUXLead} name="Kenzo Fukuda" role="Frontend & UI/UX" textColor="green" quote="test!" />
                    <MemberCard image={UIUXLead} name="Aadithi Arjun" role="Frontend & UI/UX" textColor="green" quote="test!!" />
                    <MemberCard image={UIUXLead} name="Vincent Lin" role="Backend" textColor="green" quote="test!!!" />
                    <MemberCard image={UIUXLead} name="Jordan Kusuda" role="Backend" textColor="green" quote="test!!!!" />
                  </>
                )}
              </div>
            </div>
          )}
          <div className="bg-[#F5F5F5] pb-16 pt-4">
            <div className="mx-auto w-full max-w-7xl">
              <header className="mb-12 flex items-center px-5">
                <div className="mr-3 h-12 w-1.5 bg-saseGreen"></div>
                <h2 className="font-oswald text-[30px] text-foreground sm:text-[54px]">Goals & Outcomes</h2>
              </header>
              <div className={`${isMobile ? "flex flex-col gap-10" : "flex flex-row gap-14 lg:gap-36"} w-full items-center justify-center px-8`}>
                <div className="ml-2 flex h-48 w-48 flex-col items-center justify-center self-start rounded-3xl border-2 border-white bg-[#1E1E1E] transition duration-300 hover:scale-105 hover:shadow-[18px_18px_0px_#7DC242] sm:ml-0 sm:h-[19rem] sm:w-[19rem]">
                  <p className="p-6 font-redhat text-[1rem] text-white sm:text-2xl">&gt; Work with agile practices commonly found in the industry.</p>
                </div>
                <div className="mr-2 flex h-48 w-48 flex-col items-center justify-center self-end rounded-3xl border-2 border-white bg-[#1E1E1E] transition duration-300 hover:scale-105 hover:shadow-[18px_18px_0px_#7DC242] sm:mr-0 sm:h-[19rem] sm:w-[19rem]">
                  <p className="p-6 font-redhat text-[1rem] text-white sm:text-2xl">
                    &gt; Develop technical skills related to UI/UX, front-end, or back-end development.
                  </p>
                </div>
                <div className="ml-2 flex h-48 w-48 flex-col items-center justify-center self-start rounded-3xl border-2 border-white bg-[#1E1E1E] transition duration-300 hover:scale-105 hover:shadow-[18px_18px_0px_#7DC242] sm:ml-0 sm:h-[19rem] sm:w-[19rem]">
                  <p className="p-6 font-redhat text-[1rem] text-white sm:text-2xl">
                    &gt; Gain hands-on experience with web development and contribute to SASE in a meaningful way.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto w-full max-w-7xl pt-2">
            <header className="flex items-center px-5">
              <div className="mr-3 h-12 w-1.5 bg-saseGreen"></div>
              <h2 className="font-oswald text-[40px] text-foreground sm:text-[50px]">FAQs</h2>
            </header>
            <FAQ faqData={faqData} />
          </div>
        </div>
      </div>
    );
  },
});
