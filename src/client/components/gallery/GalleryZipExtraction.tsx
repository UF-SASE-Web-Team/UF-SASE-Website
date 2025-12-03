import { imageUrls } from "@assets/imageUrls";
import React, { useEffect, useState } from "react";

interface ZipProps {
  slideshow: string;
}

const MAX_MOBILE_ITEMS = 4;

const GalleryZipExtraction: React.FC<ZipProps> = ({ slideshow }) => {
  const fall2024_images = [
    imageUrls["fall2024_1.JPG"],
    imageUrls["fall2024_4.JPG"],
    imageUrls["fall2024_5.JPG"],
    imageUrls["fall2024_6.JPG"],
    imageUrls["fall2024_7.JPG"],
    imageUrls["fall2024_9.JPG"],
    imageUrls["fall2024_10.JPG"],
  ];

  const spring2024_images = [
    imageUrls["spring2024_1.JPG"],
    imageUrls["spring2024_2.JPG"],
    imageUrls["spring2024_3.JPG"],
    imageUrls["spring2024_4.JPG"],
    imageUrls["spring2024_5.jpg"],
    imageUrls["spring2024_6.JPG"],
  ];

  const fall2023_images = [
    imageUrls["fall2023_4.JPG"],
    imageUrls["fall2023_5.jpg"],
    imageUrls["fall2023_6.JPG"],
    imageUrls["fall2023_7.JPG"],
    imageUrls["fall2023_8.JPG"],
    imageUrls["fall2023_9.JPG"],
  ];

  let images: Array<string> = [];
  if (slideshow === "Fall 2024") images = fall2024_images;
  else if (slideshow === "Spring 2024") images = spring2024_images;
  else images = fall2023_images;

  const [isExpanded, setIsExpanded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(min-width: 768px)");

    // Set initial value
    setIsDesktop(mediaQuery.matches);

    // Listener with correct typing
    const handler = (event: MediaQueryListEvent) => {
      setIsDesktop(event.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const visibleImages = isDesktop || isExpanded ? images : images.slice(0, MAX_MOBILE_ITEMS);

  const canToggleOnMobile = !isDesktop && images.length > MAX_MOBILE_ITEMS;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleImages.map((src, i) => (
          <div key={i} className="overflow-hidden rounded-[6px] border border-gray-200 bg-white">
            <div className="aspect-[4/3] w-full">
              <img src={src} className="h-full w-full object-cover" />
            </div>
          </div>
        ))}
      </div>

      {/* MOBILE COLLAPSE BUTTON */}
      {canToggleOnMobile && (
        <div className="mt-6 flex justify-center md:hidden">
          <button
            type="button"
            onClick={() => setIsExpanded((v) => !v)}
            className="inline-flex items-center justify-center rounded-full border border-black bg-saseBlue px-5 py-2 font-redhat text-sm tracking-[0.12em] text-white shadow-[3px_3px_0_0_rgba(0,0,0,0.35)] transition-transform duration-150 hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.3)]"
          >
            {isExpanded ? "Show fewer photos" : "Show more photos"}
          </button>
        </div>
      )}
    </div>
  );
};

export default GalleryZipExtraction;
