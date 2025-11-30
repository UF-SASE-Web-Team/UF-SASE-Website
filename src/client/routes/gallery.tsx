import { imageUrls } from "@assets/imageUrls";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { IoMdLink, IoMdPlay } from "react-icons/io";
import GalleryYearbook from "../components/gallery/GalleryYearbook";
import GalleryZipExtraction from "../components/gallery/GalleryZipExtraction";
import { applyOmbreDivider } from "../utils/ombre-divider.js";
import { seo } from "../utils/seo";

const slideshowLinks: Record<string, string> = {
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
    const [slideshow, setSlideshow] = useState<string>("Fall 2024");
    const [activeYearbook, setActiveYearbook] = useState<YearbookId>("2024-2025");

    useEffect(() => {
      applyOmbreDivider();
    }, []);

    const entries = Object.entries(slideshowLinks);
    const previewHref = yearbookLinks[activeYearbook];

    return (
      <div className="pb-20">
        {/* Title */}
        <p className="mt-6 flex justify-center pb-5 text-center font-oswald text-7xl">GALLERY</p>

        <div className="ombre-divider" />

        {/* Main gallery grid */}
        <section className="mx-auto mt-16 max-w-6xl px-4 md:px-8">
          <div className="rounded-3xl bg-white/80 px-4 py-6 shadow-[0_10px_0_0_rgb(203,203,212)] md:px-6 md:py-8">
            <GalleryZipExtraction slideshow={slideshow} />
          </div>
        </section>

        {/* Google Drive Links box */}
        <section className="mx-auto mt-16 max-w-4xl px-4 md:px-8">
          <div className="flex flex-col gap-6 rounded-3xl border-[3px] border-black bg-white px-8 py-8 md:flex-row md:items-center">
            {/* Left text */}
            <div className="flex flex-col items-center md:items-start">
              <p className="text-center font-oswald text-3xl leading-tight md:text-3xl">
                <span className="block text-saseBlue">Google</span>
                <span className="block text-saseBlue">Drive</span>
                <span className="block text-saseGreen">Links</span>
              </p>
            </div>

            {/* Divider */}
            <div className="hidden h-28 w-[2px] bg-black md:block" />

            {/* Right: semesters grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-3 sm:gap-y-10">
                {entries.map(([label, link]) => (
                  <div key={label} className="flex flex-col items-center gap-3">
                    {/* Label – changes slideshow only */}
                    <button type="button" onClick={() => setSlideshow(label)} className="font-redhat text-lg font-medium hover:underline">
                      {label}
                    </button>

                    {/* Icons row */}
                    <div className="flex gap-3">
                      {/* Link icon – opens Drive */}
                      <a
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-8 w-8 items-center justify-center rounded-[6px] border-[2px] border-[#3f8f35] text-[#3f8f35] transition hover:bg-[#e9f7e7]"
                      >
                        <IoMdLink size={18} />
                      </a>

                      {/* Play icon */}
                      <button
                        type="button"
                        onClick={() => setSlideshow(label)}
                        className="flex h-8 w-8 items-center justify-center rounded-[6px] border-[2px] border-saseBlue text-saseBlue transition hover:bg-[#e9f7e7]"
                      >
                        <IoMdPlay size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Yearbook Section */}
        <section className="mx-auto mt-16 max-w-6xl px-4 md:px-8">
          <h2 className="font-oswald text-4xl md:text-5xl">UF SASE YEARBOOK</h2>

          <div className="mt-8 flex flex-col gap-6 md:flex-row">
            {/* Left Year Buttons */}
            <div className="flex flex-col gap-3">
              {yearbooks.map((yb) => {
                const isActive = activeYearbook === yb.id;

                return (
                  <button
                    key={yb.id}
                    onClick={() => setActiveYearbook(yb.id)}
                    className={[
                      "inline-flex w-36 items-center justify-center",
                      "rounded-[4px] border border-black",
                      "px-4 py-2 font-redhat text-[15px] font-medium tracking-[0.06em]",
                      "text-white",
                      "transition-transform duration-150",
                      isActive
                        ? "bg-[#3f8f35] shadow-[1px_1px_0_0_rgba(0,0,0,0.4)]"
                        : "bg-saseGreen shadow-[3px_3px_0_0_rgba(0,0,0,0.35)] hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.35)]",
                    ].join(" ")}
                  >
                    {yb.label}
                  </button>
                );
              })}
            </div>

            {/* Yearbook Frame Component */}
            <div className="flex flex-1 flex-col items-center">
              <GalleryYearbook year={activeYearbook} />

              {/* Preview Button */}
              <a href={previewHref} target="_blank" rel="noreferrer" className="mt-10">
                <button className="inline-flex items-center justify-center rounded-[4px] border border-black bg-saseBlue px-7 py-2 font-redhat text-[16px] tracking-[0.12em] text-white shadow-[3px_3px_0_0_rgba(0,0,0,0.35)] transition-transform duration-150 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[5px_5px_0_0_rgba(0,0,0,0.3)]">
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
