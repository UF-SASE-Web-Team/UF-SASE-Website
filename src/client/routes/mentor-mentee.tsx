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
import { lazy, Suspense, useEffect } from "react";
import { applyOmbreDivider } from "../utils/ombre-divider";
import { seo } from "../utils/seo";

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
    useEffect(() => {
      applyOmbreDivider();
    });

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
        <div className={cn({ "flex-col gap-4": isMobile, "flex-row, justify-between": !isMobile }, `flex max-w-7xl py-8`)}>
          <header className="mr-8 mt-10 flex items-center px-5">
            <div className="mr-5 h-40 w-1.5 bg-saseGreen"></div>
            <h2 className="font-oswald text-7xl font-semibold leading-tight text-foreground">
              MENTOR MENTEE
              <br />
              PROGRAM
            </h2>
          </header>
          <div className={cn({ "w-1/2": !isMobile })}>
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
        </div>

        {/* Image & Bullet Points on Ombre Background */}
        <div className="w-full max-w-7xl">
          <div className="ombre-background">
              <div
                className={cn({ "flex flex-col": isMobile, "grid grid-cols-[1fr_2fr]": !isMobile }, `items-center justify-center gap-4 px-8 py-4`)}
              >
                <img src={MMGraphic} alt="Mentor-Mentee Graphic" className="max-w-sm object-contain" />

                <ul className="flex h-full flex-col justify-between space-y-6 py-12">
                  {[
                    "Available both Fall and Spring Semesters",
                    "Anyone can apply to be a mentee regardless of grade or major!",
                    "Apply as soon as possible to ensure you are assigned a mentor!",
                  ].map((text, index) => (
                    <li key={index} className="flex items-center">
                      <img src={StarBulletPoint} alt="bullet" className="mr-4 h-12 w-12" />
                      <span className="font-redhat text-3xl font-medium leading-[35px] text-white"> {text}</span>
                    </li>
                  ))}
                </ul>
              </div>
          </div>
        </div>

        {/* M&M Events Section */}
        <div className="ombre-divider max-w-7xl" />
        <div className="my-[-20px] flex w-full flex-col gap-8 bg-saseGrayLight px-[10%] py-8">
          <h1 className="w-full text-center font-oswald text-6xl font-medium text-black">M&M Events</h1>
          <div className="ombre-background">
              <div className="rounded-2xl bg-saseGrayLight p-4">
                <p className="text-center font-redhat text-xl">
                  Join us for some fun and lighthearted events designed to <strong>spark meaningful interactions between mentors and mentees!</strong>{" "}
                  Participate in a variety of silly and competitive challenges that encourage teamwork, laughter, and connection.
                </p>
                <br />
                <p className="text-center font-redhat text-xl">
                  Our <strong>featured event</strong> is our <span className="font-medium text-saseBlue">Mentor</span> &{" "}
                  <span className="font-medium text-saseGreen">Mentee</span> Cup. Earn points by completing activities together, and see how many
                  challenges you can conquer with your mentor or mentee. It's all about bonding, having fun, and maybe even winning some bragging
                  rights!
                </p>
              </div>
          </div>
          <Carousel purpose="Testimonials" prog="M&M" />
        </div>
        <div className="ombre-divider max-w-7xl" />

        {/* Goals & Outcomes and FAQ Section */}
        <div className="mt-8 flex max-w-7xl flex-col gap-[16px]">
          <div className="flex w-full flex-col">
            <header className="mb-8 flex items-center px-5 font-oswald">
              <div className="mr-3 h-11 w-1.5 bg-saseGreen"></div>
              <h2 className="text-4xl text-foreground">Goals & Outcomes</h2>
            </header>
            <div className="relative mx-auto mb-24 flex max-w-7xl flex-wrap items-center justify-center gap-12 px-4">
              <MMGoalCard text="Build meaningful, genuine friendships with new people that go beyond academics!" cardColor="green" />
              <MMGoalCard text="Bond, explore, and create unforgettable memories along the way!" cardColor="blue" />
              <MMGoalCard text="Surround yourself with a reliable support system of mentors and peers!" cardColor="green" />
            </div>
          </div>

          <div className="flex w-full flex-col">
            <header className="flex max-w-7xl items-center px-5">
              <div className="mr-3 h-11 w-1.5 bg-saseGreen"></div>
              <h2 className="font-oswald text-4xl text-foreground">FAQs</h2>
            </header>
            <FAQ faqData={MMFAQ} />
          </div>
        </div>
      </div>
    );
  },
});
