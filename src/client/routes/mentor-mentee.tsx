import { MMFAQ } from "@information/ProgramFAQs";
import { imageUrls } from "@assets/imageUrls";
import MMGraphic from "@assets/programs/MMgraphic.png";
import StarBulletPoint from "@assets/programs/StarBulletPoint.png";
import Carousel from "@components/carousel/Carousel";
import FAQ from "@components/programs/FAQCard";
import InfoCard from "@components/programs/InfoCard";
import { MMGoalCard } from "@components/programs/MentorMentee/MMGoalCard";
import MMPairingForm from "@components/programs/MentorMentee/MMPairingForm";
import { useIsMobile } from "@hooks/useIsMobile";
import { ClientOnly, cn } from "@shared/utils";
import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { seo } from "../utils/seo";
import { OmbreDivider } from "@components/custom_ui/OmbreDivider";
import { HeaderWithGreenBorder } from "@components/custom_ui/HeaderWithGreenBorder";

const MentorMenteeGraph = lazy(() => import("@/client/components/programs/MentorMentee/MMGraph"));

export const Route = createFileRoute("/mentor-mentee")({
  meta: () => [
    ...seo({
      title: "Mentor-Mentee | UF SASE",
      description:
        "UF Society of Asian Scientists & Engineers Mentor-Mentee Program pairs experienced members with eager mentees for professional and personal growth.",
      image: imageUrls["SASELogo.png"],
    }),
  ],

  component: () => {
    const isMobile = useIsMobile();

    return (
      <div className="flex min-h-screen flex-col items-center bg-background">
        <ClientOnly>
          <div className="flex w-full flex-1">
            <Suspense
              fallback={
                <div className="flex flex-1 items-center justify-center">
                  <span className="text-4xl font-medium">Loading graph…</span>
                </div>
              }
            >
              <MentorMenteeGraph />
            </Suspense>
          </div>
        </ClientOnly>

        <MMPairingForm />

        {/* Header Section */}
        <div className={cn({"grid grid-cols-2 gap-24" : !isMobile, "flex flex-col gap-4": isMobile},"px-4 w-full max-w-7xl items-start py-10")}>
          <header className="flex justify-center items-center my-10">
            {/* Green Line and Text in Row */}
            <div className="mr-5 h-52 w-1.5 bg-saseGreen rounded-sm"></div>
            <h2 className="font-oswald text-7xl font-semibold leading-tight text-foreground">
              MENTOR-MENTEE
              <br />
              PROGRAM
            </h2>
          </header>
          <InfoCard
            text={
              <>
                  The SASE Mentor Mentee program aims to <strong>pair mentees with mentors </strong> who can help <strong>guide them</strong> through
                  life:
                  <strong> professionally, academically, and personally</strong>. This is a great way to get involved with SASE, or open up doors to
                  new opportunities and connections!
                </>
            }
          />
        </div>

        {/* Image & Bullet Points on Ombre Background */}
        <div className="w-full max-w-7xl ombre-background rounded-2xl mb-10">
          <div
            className={cn({ "flex flex-col": isMobile, "grid grid-cols-[1fr_2fr]": !isMobile }, `items-center justify-center gap-4 px-8 py-4`)}
          >
            <img src={MMGraphic} alt="Mentor-Mentee Graphic" className="max-w-sm object-contain" />

            <ul className="flex h-full flex-col justify-between space-y-6 pt-6 pb-10">
              {[
                "Available both Fall and Spring Semesters",
                "Anyone can apply to be a mentee regardless of grade or major!",
                "Apply as soon as possible to ensure you are assigned a mentor!",
              ].map((text, index) => (
                <li key={index} className="flex items-center">
                  <img src={StarBulletPoint} alt="bullet" className="mr-4 h-12 w-12" />
                  <span className="font-redhat text-xl font-medium text-white"> {text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* M&M Events Section */}
        <OmbreDivider/>
        <div className="flex w-full flex-col bg-saseGrayLight px-[10%] py-10 items-center justify-center">
          <h1 className="subheader-text w-full text-center">M&M Events</h1>
          <div className="max-w-7xl ombre-background p-1 rounded-2xl mb-10">
            <div className="rounded-2xl bg-saseGrayLight p-4">
              <p className={cn({"text-lg" : !isMobile, "text-sm" : isMobile}, "text-center font-redhat")}>
                Join us for some fun and lighthearted events designed to <strong>spark meaningful interactions between mentors and mentees!</strong>{" "}
                Participate in a variety of silly and competitive challenges that encourage teamwork, laughter, and connection.
              </p>
              <br />
              <p className={cn({"text-lg" : !isMobile, "text-sm" : isMobile}, "text-center font-redhat")}>
                Our <strong>featured event</strong> is our <strong><span className="font-bold text-saseBlue">Mentor</span> &{" "}
                <span className="font-bold text-saseGreen">Mentee</span> Cup </strong>. Earn points by completing activities together, and see how many
                challenges you can conquer with your mentor or mentee. It's all about bonding, having fun, and maybe even winning some bragging
                rights!
              </p>
            </div>
          </div>
          <Carousel purpose="Testimonials" prog="M&M" />
        </div>
        <OmbreDivider/>

        {/* Goals & Outcomes */}
          <div className="w-full py-10 flex justify-center">
            <div className="w-full max-w-7xl">
              <HeaderWithGreenBorder text="Goals & Outcomes" type="Subheader"/>
              <div className={cn({"flex-col gap-10" : isMobile, "flex-row gap-16" : !isMobile},"px-8 flex flex-nowrap items-center justify-center")}>
                <MMGoalCard text="> Build meaningful, genuine friendships with new people that go beyond academics!" cardColor="blue" mobileAlign="left"/>
                <MMGoalCard text="> Bond, explore, and create unforgettable memories along the way!" cardColor="green" mobileAlign="right"/>
                <MMGoalCard text="> Surround yourself with a reliable support system of mentors and peers!" cardColor="blue" mobileAlign="left"/>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="pt-10 max-w-7xl">
            <HeaderWithGreenBorder text="FAQs" type="Subheader"/>
            <FAQ faqData={MMFAQ} />
          </div>
      </div>
    );
  },
});
