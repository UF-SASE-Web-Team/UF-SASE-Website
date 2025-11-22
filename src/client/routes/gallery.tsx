import { imageUrls } from "@assets/imageUrls";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { IoMdLink } from "react-icons/io";
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
  { id: "2023-2024", label: "2023 – 2024", colorClass: "bg-saseGreen text-black" },
  { id: "2024-2025", label: "2024 – 2025", colorClass: "bg-saseBlue text-white" },
] as const;

type YearbookId = (typeof yearbooks)[number]["id"];

// per-year preview links
const yearbookLinks: Record<YearbookId, string> = {
  "2023-2024": "#",
  "2024-2025": "https://www.mixbook.com/photo-books/interests/blank-canvas-34402104?vk=dlMW6WL1SBIaedVXgd2n", // TODO: replace
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
    const [activeYearbook, setActiveYearbook] = useState<YearbookId>("2023-2024");

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
        <section className="mx-auto mt-16 max-w-6xl px-4 md:px-8">
          <div className="flex flex-col gap-6 rounded-3xl border-2 border-border bg-background/80 px-6 py-5 shadow-[0_8px_0_0_rgb(6,104,179)] md:flex-row md:items-stretch">
            {/* Left vertical text: Google Drive Links */}
            <div className="flex items-center justify-center border-b border-border/40 pb-4 md:w-40 md:border-b-0 md:border-r md:pb-0 md:pr-6">
              <p className="text-center font-oswald text-2xl leading-tight">
                <span className="block">Google</span>
                <span className="block">Drive</span>
                <span className="block">Links</span>
              </p>
            </div>

            {/* Right: semesters grid */}
            <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {entries.map(([label, link]) => (
                <a
                  key={label}
                  href={link}
                  target="__blank"
                  rel="noreferrer"
                  onClick={() => setSlideshow(label)}
                  className="flex flex-col justify-between rounded-2xl border border-border/60 bg-white px-3 py-2 text-left shadow-[0_3px_0_0_rgb(203,203,212)] transition hover:-translate-y-0.5 hover:border-saseBlue hover:shadow-[0_6px_0_0_rgb(6,104,179)]"
                >
                  <span className="font-redhat text-sm">{label}</span>
                  <span className="mt-2 inline-flex items-center gap-1 self-start rounded-full border border-border bg-saseBlue px-2 py-1 text-[11px] font-medium text-white">
                    <IoMdLink size={12} />
                    Slideshow / Drive
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Yearbook section */}
        <section className="mx-auto mt-16 max-w-6xl px-4 md:px-8">
          <h2 className="font-oswald text-4xl md:text-5xl">UF SASE YEARBOOK</h2>

          <div className="mt-6 flex flex-col gap-6 rounded-3xl bg-blue-300 px-4 py-5 shadow-[10px_10px_0_0_rgb(6,104,179)] transition duration-150 hover:scale-[1.01] md:flex-row md:px-6 md:py-6">
            {/* Left year buttons */}
            <div className="flex flex-row gap-2 md:flex-col md:gap-3">
              {yearbooks.map((yb) => {
                const isActive = activeYearbook === yb.id;
                return (
                  <button
                    key={yb.id}
                    type="button"
                    onClick={() => setActiveYearbook(yb.id)}
                    className={[
                      "rounded-md px-3 py-2 font-redhat text-xs transition md:text-sm",
                      yb.colorClass,
                      "border border-transparent",
                      isActive ? "shadow-[inset_0_0_0_2px_rgba(0,0,0,0.4)]" : "hover:shadow-[0_0_0_1px_rgba(0,0,0,0.25)]",
                    ].join(" ")}
                  >
                    {yb.label}
                  </button>
                );
              })}
            </div>

            {/* Yearbook preview graphic / component */}
            <div className="flex-1">
              {/* If you later want GalleryYearbook to change per year,
                  add a prop like year={activeYearbook}. */}
              <GalleryYearbook />
            </div>

            {/* Preview button (changes link based on selected yearbook) */}
            <div className="flex items-end justify-start md:justify-end">
              <a href={previewHref} target="_blank" rel="noreferrer">
                <button
                  className="flex h-10 items-center justify-center rounded-full border-2 border-gray-700 bg-saseBlue px-6 font-redhat text-sm text-white shadow-[0px_5px_0px_0px_rgb(203,203,212)] transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-saseGreen hover:text-black"
                  disabled={previewHref === "#"}
                >
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
