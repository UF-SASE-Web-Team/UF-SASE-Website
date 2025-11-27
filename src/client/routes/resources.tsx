import { cn } from "@/shared/utils";
import { imageUrls } from "@assets/imageUrls";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { IoMdLink } from "react-icons/io";
import { applyOmbreDivider } from "../utils/ombre-divider";
import { seo } from "../utils/seo";

// interface ResourceCard {
//   title: string;
//   description: string;
//   linkText: string;
//   link: string;
// }

// const studyMaterials: Array<ResourceCard> = [
//   {
//     title: "Study Guide 1",
//     description: "Comprehensive guide for subject ABC.",
//     linkText: "View Guide",
//     link: "#",
//   },
//   {
//     title: "Study Guide 2",
//     description: "Practice problems for XYZ.",
//     linkText: "Access Problems",
//     link: "#",
//   },
// ];

// const workshops: Array<ResourceCard> = [
//   {
//     title: "Workshop Slides",
//     description: "Slides from our recent leadership workshop.",
//     linkText: "Open Slides",
//     link: "#",
//   },
//   {
//     title: "Workshop Recording",
//     description: "Watch the session from last semester’s event.",
//     linkText: "Watch",
//     link: "#",
//   },
// ];

// const careerResources: Array<ResourceCard> = [
//   {
//     title: "Resume Tips",
//     description: "A quick guide to building a strong resume.",
//     linkText: "View Tips",
//     link: "#",
//   },
//   {
//     title: "Interview Prep",
//     description: "Resources to help you ace your interviews.",
//     linkText: "Start Preparing",
//     link: "#",
//   },
// ];

// const mapToCards = (data: Array<ResourceCard>) => data.map((card, index) => <ResourcesCard key={index} {...card} />);

export const Route = createFileRoute("/resources")({
  meta: () => [
    ...seo({
      title: "Resources | UF SASE",
      description:
        "Resources for students provided by UF SASE, such as study materials, workshop slides, career resources, and class connector forms.",
      image: imageUrls["SASELogo.png"],
    }),
  ],
  component: () => {
    useEffect(() => {
      applyOmbreDivider();
    }, []);

    const Card = ({ href, icon, title }: { href: string; icon: React.ReactNode; title: string }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group mx-auto w-44 transform transition duration-300 hover:scale-105 sm:w-52 lg:w-56"
      >
        <div className="flex flex-col items-center rounded-xl border-2 border-foreground bg-background p-1 shadow-[0_6px_0_rgba(203,203,212,1)]">
          <div className="flex h-20 w-20 items-center justify-center rounded-lg border-2 border-background bg-background text-saseBlueLight">
            {icon}
          </div>
          <div className="mt-3 text-center font-redhat text-sm font-semibold">{title}</div>
        </div>
      </a>
    );

    const sectionHeader = (label: string) => (
      <div className="mb-6 flex items-center justify-center">
        <div className="mx-auto flex w-full max-w-5xl items-center gap-4 px-4">
          <div className="h-3 flex-1 rounded-r-md bg-gradient-to-r from-saseGreen via-saseGreen to-transparent" />
          <div className="mx-4 whitespace-nowrap rounded-md bg-background px-6 py-1 text-center text-sm font-semibold shadow-sm dark:bg-neutral-900">
            {label}
          </div>
          <div className="h-3 flex-1 rounded-l-md bg-gradient-to-l from-saseBlue via-saseBlue to-transparent" />
        </div>
      </div>
    );

    const topResources = [
      {
        title: "Freshman FAQs",
        icon: <img src="src\client\assets\resources\FAQ.png" width={75} height={75} />,
        href: "https://docs.google.com/document/d/1gpMn9fMbpp3S3ELU5daBqwKOJXxTaPq5yvwpnjEgCJ0/edit?tab=t.0",
      },
      { title: "Linktree", icon: <img src="src\client\assets\resources\linktree.png" width={75} height={75} />, href: "https://linktr.ee/ufsase" },
      {
        title: "SASE Resume Template",
        icon: <img src="src\client\assets\resources\resume.png" width={75} height={75} />,
        href: "https://docs.google.com/document/d/1aRuKSidAX1rXyCNmivHesHYHh0MbUcE2/edit",
      },
      {
        title: "SASE's Gcal",
        icon: <img src="src\client\assets\resources\Google-Calendar-Logo.png" width={75} height={75} />,
        href: "https://calendar.google.com/calendar/u/0/r?cid=MzdhYzRkNTU0MDEzNmM3NTI0YjlhNjRkYWExMTc2Mjc1NGM1MmFmYTc3MGYzZjEyZTFhYzZlZGNhN2NiNTlhM0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t",
      },
    ];

    const saseResources = [
      {
        title: "Pi Booking Spreadsheet",
        icon: <img src="src\client\assets\resources\high_capacity_small.jpg" height={75} width={89} />,
        href: "https://docs.google.com/spreadsheets/d/15N-sULElmb4B3t1UEnwiZQCUpnQ9iKcJrBbBF2URRaU/edit?gid=892345678#gid=892345678",
      },
      {
        title: "Class Connector Form",
        icon: <img src="src\client\assets\resources\connect.png" width={75} height={75} />,
        href: "https://docs.google.com/forms/d/e/1FAIpQLSdrCUj2Ym6irv_5xaTQnkq8gO-bUN_1pY5J0Nk9lnajncJDaw/viewform",
      },
      {
        title: "Class Connector Finder Sheet",
        icon: <img src="src\client\assets\resources\find.png" width={75} height={75} />,
        href: "https://docs.google.com/spreadsheets/d/1hXDAGoLMM4kcFoPU5XD9H1Mxge0BPbeNHrKQinkLioQ/edit?gid=1830176438#gid=1830176438",
      },
      {
        title: "Board Office Hours",
        icon: <img src="src\client\assets\resources\2023-11-03_Malachowsky-Opening-144-1679x1120.jpg" height={75} />,
        href: "https://docs.google.com/spreadsheets/d/1lUTyJcn1-eDALD-bjWQQRrQ_5_iJFNWKMill8ovUVFk/edit?gid=943523131#gid=943523131",
      },
    ];

    const academicResources = [
      {
        title: "Research Resources",
        icon: <img src="src\client\assets\resources\research.png" width={75} height={75} />,
        href: "https://drive.google.com/drive/folders/1jE62-6HKTkypG7WzqLbBgvDrMtYFBAL2",
      },
      {
        title: "Pre-med Resources",
        icon: <img src="src\client\assets\resources\premed.png" width={75} height={75} />,
        href: "https://drive.google.com/drive/folders/1nFlB8M0RVqi5e0s7QtOsnJ4gSEWwaJvA",
      },
      {
        title: "Design Team List",
        icon: <img src="src\client\assets\resources\design.png" width={75} height={75} />,
        href: "https://docs.google.com/document/d/1gcITx3IKn6HnJ1bcA4TVTlh27wP6jSFf/edit?rtpof=true&sd=true#heading=h.o9rwupa35f1a",
      },
    ];

    const professionalResources = [
      {
        title: "Internship Resources",
        icon: <img src="src\client\assets\resources\intern.png" width={75} height={75} />,
        href: "https://drive.google.com/drive/folders/1ODgUWyr_5Zl3oLwiXUSgbKVggyx8Qxjq",
      },
      {
        title: "Interview Resources",
        icon: <img src="src\client\assets\resources\interview.png" width={75} height={75} />,
        href: "https://drive.google.com/drive/folders/1Ziv21RfRcjXxGj84_feg1Y3JUVRCdjnX",
      },
      {
        title: "Networking Resources",
        icon: <img src="src\client\assets\resources\network.png" width={75} height={75} />,
        href: "https://drive.google.com/drive/folders/14FTXWDmX-X-FlNe5mEfM0C5D-xf9oN2d",
      },
      {
        title: "Experiences Tracker",
        icon: <img src="src\client\assets\resources\tracker.png" width={75} height={75} />,
        href: "https://docs.google.com/document/d/1rxYm5SCaX--ANEcCqRQFCgHLKbwZPqwU/edit",
      },
    ];

    return (
      <div className="w-full">
        <div className="text-center">
          <h1 className="mt-4 pb-8 font-oswald text-5xl font-medium sm:text-6xl md:text-7xl">RESOURCES</h1>
        </div>

        <div className="ombre-divider"></div>

        <div className="pt-8">
          {sectionHeader("Top Resources")}
          <div className="mx-auto mb-12 max-w-5xl px-4">
            <div className="flex flex-wrap items-stretch justify-center gap-6">
              {topResources.map((r) => (
                <Card key={r.title} {...r} />
              ))}
            </div>
          </div>

          {sectionHeader("SASE Resources")}
          <div className="mx-auto mb-12 max-w-5xl px-4">
            <div className="flex flex-wrap items-stretch justify-center gap-6">
              {saseResources.map((r) => (
                <Card key={r.title} {...r} />
              ))}
            </div>
          </div>

          {sectionHeader("Academic Resources")}
          <div className="mx-auto mb-12 max-w-5xl px-4">
            <div className="flex flex-wrap items-stretch justify-center gap-6">
              {academicResources.map((r) => (
                <Card key={r.title} {...r} />
              ))}
            </div>
          </div>

          {sectionHeader("Professional Resources")}
          <div className="mx-auto mb-12 max-w-5xl px-4">
            <div className="flex flex-wrap items-stretch justify-center gap-6">
              {professionalResources.map((r) => (
                <Card key={r.title} {...r} />
              ))}
            </div>
          </div>
        </div>

        <div className="ombre-divider"></div>

        <div className="flex justify-center py-8">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <div
              className={cn(
                "mx-auto flex h-10 w-fit items-center justify-center rounded-full border-2",
                "border-gray-700 bg-saseBlue px-4 text-white shadow-[0px_5px_0px_0px_rgb(203,203,212)]",
                "transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-saseGreen hover:text-black",
              )}
            >
              <div className="pr-2 font-redhat">Linktree Default</div>
              <IoMdLink size={15} />
            </div>
          </a>
        </div>
      </div>
    );
  },
});
