import { DarkModeContext } from "@/client/components/custom_ui/DarkModeProvider";
import { cn } from "@/shared/utils";
import WebTeamGroupImage from "@assets/webdev/WebDevTeamCropped.png";
import WebTeamDescription from "@assets/webdev/WebDevTerminal.png";
import WebTeam from "@assets/webdev/WebTeam.png";
import MemberCard from "@/client/components/custom_ui/MemberCard";
import MobileMemberCard from "@/client/components/custom_ui/MobileMemberCard";
import FAQ from "@components/programs/FAQCard";
import { SwtFAQ } from "@information/ProgramFAQs";
import { useIsMobile } from "@hooks/useIsMobile";
import { createFileRoute } from "@tanstack/react-router";
import { useContext, useState } from "react";
import { imageUrls } from "@assets/imageUrls";
import { seo } from "../utils/seo";
import { ApplicationPhoto } from "@components/programs/ApplicationPhoto";
import { HeaderWithGreenBorder } from "@components/custom_ui/HeaderWithGreenBorder";
import { SwtGoals } from "@information/ProgramGoals";
import GoalCard from "@components/programs/GoalCard";
import { Webmasters , SWTTeamLeads } from "@information/People";
import { OmbreDivider } from "@components/custom_ui/OmbreDivider";

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
    const [buttonIndex, setIndex] = useState(1);
    const { darkMode } = useContext(DarkModeContext);
    const currentWebmastersInfo = Webmasters.find((team: { team: string; }) => team.team == "Current")?.information; 
    const pastWebmastersInfo = Webmasters.find((team: { team: string; }) => team.team == "Past")?.information; 
    const websiteLeads = SWTTeamLeads.find((team: { team: string; }) => team.team == "Website")?.information; 
    const projectLeads = SWTTeamLeads.find((team: { team: string; }) => team.team == "Semester Project")?.information; 

    const buttonState = (position: number) => {
      setIndex(position);
    };

    return (
      <div className="py-10 flex min-h-screen flex-col items-center bg-background w-full">
        <div className={cn({"flex-col items-center" : isMobile, "flex-row gap-10": !isMobile}, "flex w-full max-w-7xl")}>
          <div className="relative mx-auto w-[75%] sm:w-2/5">
            <img
              src={WebTeam}
              alt="Web Team"
              className={cn(`mx-auto h-auto w-full sm:mx-0`, {
                invert: !darkMode,
              })}
            />
          </div>
          <div className="relative w-full sm:w-4/5">
            <img src={WebTeamDescription} alt="Terminal" className="h-auto w-full px-2" />
          </div>
        </div>

        <div className="w-full py-10 flex flex-col items-center">
          {/* Group Picture & App Status */}
          <div className="bg-black py-10 w-full flex flex-col justify-center items-center">
            <ApplicationPhoto image={WebTeamGroupImage} applicationStatus="CLOSED" nextSemester="Spring 2026"/>
          </div>
          
          {/* Leadership Display Toggle */}
          <div
            className={cn(
              `mt-10 w-auto flex rounded-full border-2 border-black bg-muted font-redhat text-3xl font-medium dark:border-white`,
              {
                "text-lg": isMobile,
              },
            )}
          >
            <button
              onClick={() => buttonState(1)}
              className={cn(`flex-grow rounded-full py-4 px-10 transition duration-300 hover:brightness-90`, {
                "bg-saseGreen": buttonIndex === 1,
                "bg-muted": buttonIndex !== 1,
                "px-4" : isMobile
              })}
            >
              Website
            </button>
            <button
              onClick={() => buttonState(2)}
              className={cn(`flex-grow rounded-full bg-muted py-4 px-10 transition duration-300 hover:brightness-90`, {
                "bg-saseGreen": buttonIndex === 2,
                "bg-muted": buttonIndex !== 2,
                "px-4" : isMobile
              })}
            >
              Project
            </button>
            <button
              onClick={() => buttonState(3)}
              className={cn(`flex-grow rounded-full py-4 px-10 transition duration-300 hover:brightness-90`, {
                "bg-saseGreen": buttonIndex === 3,
                "bg-muted": buttonIndex !== 3,
                "px-4" : isMobile
              })}
            >
              Past Webmasters
            </button>
          </div>

          {/* Leadership */}
          <header className="flex w-full justify-center py-10">
            <h2 className="ombre-text font-silkscreen text-5xl font-medium">
              Leadership
            </h2>
          </header>
          {isMobile ? (
            // Mobile Leadership Display
            <div className="pb-10 px-4">
              {buttonIndex !== 3 ? (
                <>
                  {/* Current Webmasters */}
                  {currentWebmastersInfo?.map((lead: { image: string; name: string; year: string; textColor: string; quote: string | undefined; mobileAlign: string;}, index) => (
                     <div key={index} className="flex flex-col gap-4">
                      <MobileMemberCard image={lead.image} name={lead.name} role="Webmaster" textColor={lead.textColor} quote={lead.quote} imageSide={lead.mobileAlign}/>
                      <OmbreDivider/>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {/* Past Webmasters */}
                  {pastWebmastersInfo?.map((lead: { image: string; name: string; year: string; textColor: string; quote: string | undefined; mobileAlign: string;}, index) => (
                     <div key={index} className="flex flex-col gap-4">
                      <MobileMemberCard image={lead.image} name={lead.name} role={lead.year} textColor={lead.textColor} imageSide={lead.mobileAlign}/>
                      <OmbreDivider/>
                    </div>
                  ))}
                </>
              )}

              {/* Web Maintenance Team Leads */}
              {buttonIndex === 1 && (
                <>
                  {websiteLeads?.map((lead: { image: string; name: string; role: string; quote: string | undefined; mobileAlign: string; mobileColor: string}, index) => (
                      <div key={index} className="flex flex-col gap-4">
                      <MobileMemberCard image={lead.image} name={lead.name} role={lead.role} textColor={lead.mobileColor} quote={lead.quote} imageSide={lead.mobileAlign}/>
                      {index < websiteLeads.length - 1 && <OmbreDivider/>}
                    </div>                  
                  ))}
                </>
              )}

              {/* Semester Project Team Leads */}
              {buttonIndex === 2 && (
                <>
                  {projectLeads?.map((lead: { image: string; name: string; role: string; quote: string | undefined; mobileAlign: string; mobileColor: string}, index) => (
                    <div key={index} className="flex flex-col gap-4">
                      <MobileMemberCard image={lead.image} name={lead.name} role={lead.role} textColor={lead.mobileColor} quote={lead.quote} imageSide={lead.mobileAlign}/>
                      {index < projectLeads.length - 1 && <OmbreDivider/>}
                    </div>                  
                  ))}
                </>
              )}
            </div>
          ) : (
            // Desktop Leadership Display
            <div className="mb-12 flex flex-col items-center justify-center gap-8">
              <div className="flex flex-row gap-8">
                {buttonIndex !== 3 ? (
                  <>
                    {/* Current Webmasters */}
                    {currentWebmastersInfo?.map((lead: { image: string; name: string; year: string; textColor: string; quote: string | undefined; }) => (
                      <MemberCard image={lead.image} name={lead.name} role="Webmaster" textColor="blue" quote={lead.quote}/>
                    ))}
                  </>
                ) : (
                  <>
                    {/* Past Webmasters */}
                    {pastWebmastersInfo?.map((lead: { image: string; name: string; year: string; textColor: string; quote: string | undefined; }) => (
                      <MemberCard image={lead.image} name={lead.name} role={lead.year} textColor={lead.textColor}/>
                    ))}
                  </>
                )}
              </div>

              <div className="flex flex-row gap-8">
                {/* Web Maintenance Team Leads */}
                {buttonIndex === 1 && (
                  <>
                    {websiteLeads?.map((lead: { image: string; name: string; role: string; quote: string | undefined; }) => (
                      <MemberCard image={lead.image} name={lead.name} role={lead.role} textColor="green" quote={lead.quote}/>
                    ))}
                  </>
                )}

                {/* Semester Project Team Leads */}
                {buttonIndex === 2 && (
                  <>
                    {projectLeads?.map((lead: { image: string; name: string; role: string; quote: string | undefined; }) => (
                      <MemberCard image={lead.image} name={lead.name} role={lead.role} textColor="green" quote={lead.quote}/>
                    ))}
                  </>
                )}
              </div>
            </div>
          )}

          {/* Goals & Outcomes */}
          <div className="w-full py-10 bg-saseGrayLight flex justify-center dark:bg-black">
            <div className="w-full max-w-7xl">
              <HeaderWithGreenBorder text="Goals & Outcomes" type="Subheader"/>
              <div className={cn({"flex-col gap-10" : isMobile, "flex-row gap-36" : !isMobile},"px-8 flex flex-nowrap items-center justify-center")}>
                {SwtGoals.map((goal, index) => (
                  <GoalCard text={goal.text} color={goal.color} mobileAlign={goal.mobileAlign} key={index}/>
                ))}
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="pt-10 w-full max-w-7xl">
            <HeaderWithGreenBorder text="FAQs" type="Subheader"/>
            <FAQ faqData={SwtFAQ} />
          </div>
        </div>
      </div>
    );
  },
});
