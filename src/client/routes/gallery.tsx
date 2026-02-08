import { imageUrls } from "@assets/imageUrls";
import { OmbreDivider } from "@components/custom_ui/OmbreDivider";
import GalleryYearbook from "@components/gallery/GalleryYearbook";
import GalleryZipExtraction from "@components/gallery/GalleryZipExtraction";
import SlideshowIndicator from "@components/gallery/SlideshowIndicator";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { IoMdLink, IoMdPlay } from "react-icons/io";
import { seo } from "../utils/seo";

const slideshowLabels = {
  "Spring 2026": "SPRING 2026",
  "Fall 2025": "FALL 2025",
  "Spring 2025": "SPRING 2025",
  "Fall 2024": "FALL 2024",
  "Spring 2024": "SPRING 2024",
  "Fall 2023": "FALL 2023",
} as const;

type SlideshowKey = keyof typeof slideshowLabels;

const slideshowLinks: Record<SlideshowKey, string> = {
  "Spring 2026": "",
  "Fall 2025": "",
  "Spring 2025": "",
  "Fall 2024": "https://docs.google.com/document/d/1gjG2aHkh-IYXLQ5vTfmd6uphP7AYYN0M4liorjPt77k/edit?tab=t.0",
  "Spring 2024": "https://docs.google.com/document/d/1SohQfPM2D8fQhf4vkeWPfC9xTE3my4XTfVA-BNYYA9s/edit?tab=t.0",
  "Fall 2023": "https://docs.google.com/document/d/18brpCElaHqD-rFcKd2eG4FGfjnBWXSthrI-aNdqoHYk/edit?tab=t.0",
};

// yearbooks shown in the left buttons
const yearbooks = [
  { id: "2024-2025", label: "2024 – 2025", colorClass: "bg-saseBlue text-white" },
  { id: "2023-2024", label: "2023 – 2024", colorClass: "bg-saseGreen text-black" },
] as const;

type YearbookId = (typeof yearbooks)[number]["id"];

// per-year preview links
const yearbookLinks: Record<YearbookId, string> = {
  "2023-2024": "https://www.mixbook.com/photo-books/interests/blank-canvas-34402104?vk=dlMW6WL1SBIaedVXgd2n",

  "2024-2025": "https://drive.google.com/file/d/149a7tGFOGFzxnqQK9odW5dgDkWENrlrT/view?usp=drive_link",
};

export const Route = createFileRoute("/gallery")({
  meta: () => [
    ...seo({
      title: "Gallery | UF SASE",
      description: "Pictures of all UF SASE events",
      image: imageUrls["SASELogo.png"],
    }),
  ],
  component: () => {
    const [slideshow, setSlideshow] = useState<SlideshowKey>("Spring 2026");
    const [activeYearbook, setActiveYearbook] = useState<YearbookId>("2024-2025");
    const entries = Object.entries(slideshowLinks) as Array<[SlideshowKey, string]>;
    const previewHref = yearbookLinks[activeYearbook];

    return (
      <div className="py-10">
        <div className="flex w-full justify-center">
          <p className="header-text ombre-text text-center">GALLERY</p>
        </div>

        <OmbreDivider />

        {/* Main gallery grid */}
        <section className="mx-auto max-w-6xl px-4 py-10 md:px-8">
          <div className="flex gap-10">
            {/* LEFT VERTICAL INDICATOR – only the active slideshow */}
            <div className="flex flex-col items-center">
              <SlideshowIndicator label={slideshowLabels[slideshow]} />
            </div>

            {/* SLIDESHOW */}
            <div className="flex-1">
              <div className="overflow-hidden rounded-2xl border-[4px] border-black bg-white dark:bg-greenBackground">
                <div className="h-[600px] overflow-y-auto px-6 py-4">
                  <GalleryZipExtraction slideshow={slideshow} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Google Drive Links box */}
        <section className="mx-auto max-w-4xl px-4 pb-10 md:px-8">
          <div className="flex flex-col gap-4 rounded-2xl border-[4px] border-black bg-white px-4 py-5 dark:bg-greenBackground md:flex-row md:items-center md:gap-6 md:px-8 md:py-8">
            {/* Left text */}
            <div className="-mt-1 flex flex-col items-center md:items-start">
              <p className="text-center font-oswald text-3xl leading-tight">
                <span className="text-saseBlue">
                  Google <span className="inline md:block">Drive</span>
                </span>
                <span className="-mt-1 block text-saseGreen">Links</span>
              </p>
            </div>

            {/* Divider */}
            <div className="hidden h-32 w-[4px] bg-black md:block" />

            {/* Right: Semesters grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-3 sm:gap-y-8">
                {entries.map(([label, link]) => (
                  <div key={label} className="flex flex-col items-center gap-1 md:gap-3">
                    {/* Label */}
                    <button type="button" onClick={() => setSlideshow(label)} className="font-redhat text-lg font-medium hover:underline">
                      {label}
                    </button>

                    {/* Icons row */}
                    <div className="flex gap-2 md:gap-3">
                      {/* Link icon */}
                      <a
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-7 w-7 items-center justify-center rounded-[6px] border-[3px] border-[#3f8f35] text-[#3f8f35] transition hover:bg-[#e9f7e7] md:h-8 md:w-8"
                      >
                        <IoMdLink size={16} className="md:size-18" />
                      </a>

                      {/* Play icon */}
                      <button
                        type="button"
                        onClick={() => setSlideshow(label)}
                        className="flex h-7 w-7 items-center justify-center rounded-[6px] border-[3px] border-saseBlue text-saseBlue transition hover:bg-[#e9f7e7] md:h-8 md:w-8"
                      >
                        <IoMdPlay size={16} className="md:size-18" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <OmbreDivider />

        {/* Yearbook Section */}
        <section className="mx-auto max-w-6xl px-4 pt-10 md:px-8">
          <h2 className="subheader-text w-full text-center md:text-left">UF SASE YEARBOOK</h2>

          <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-28">
            {/* Year Buttons */}
            <div className="flex flex-row justify-center gap-3 md:flex-col">
              {yearbooks.map((yb) => {
                const isActive = activeYearbook === yb.id;
                return (
                  <button
                    key={yb.id}
                    onClick={() => setActiveYearbook(yb.id)}
                    className={[
                      "inline-flex w-36 items-center justify-center",
                      "rounded-[1px]",
                      "px-4 py-2 font-redhat text-[15px] font-medium tracking-[0.06em]",
                      "text-white",
                      "transition-transform duration-150",
                      isActive
                        ? "bg-[#3f8f35]"
                        : "bg-saseGreen hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.35)]",
                    ].join(" ")}
                  >
                    {yb.label}
                  </button>
                );
              })}
            </div>

            {/* Frame and Preview */}
            <div className="flex flex-1 flex-col items-center md:items-start">
              <GalleryYearbook year={activeYearbook} />

              <a href={previewHref} target="_blank" rel="noreferrer" className="mt-6 self-center md:self-start">
                <button className="inline-flex items-center justify-center rounded-[4px] border-[3px] border-black bg-saseBlue px-7 py-2 font-redhat text-lg tracking-[0.12em] text-white shadow-[3px_3px_0_0_rgba(0,0,0,0.35)] transition-transform duration-150 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[5px_5px_0_0_rgba(0,0,0,0.3)]">
                  Preview
                </button>
              </a>
            </div>
          </div>
        </section>
      </div>
    );
  },
});
