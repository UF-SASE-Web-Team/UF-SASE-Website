import { imageUrls } from "@assets/imageUrls";
import React from "react";

type Props = {
  year: "2023-2024" | "2024-2025";
};

const GalleryYearbook = ({ year }: Props) => {
  const previewImage = year === "2023-2024" ? imageUrls["fall2023_7.JPG"] : imageUrls["fall2024_11.JPG"];

  return (
    <div className="w-full max-w-3xl">
      <div className="relative">
        <div className="flex items-stretch">
          {/* Left rectangle */}
          <div className="w-10 shrink-0 rounded-[4px] bg-[#c9ddff]" />

          {/* Frame */}
          <div className="ml-3 flex-1 rounded-[4px] border-[10px] border-[#bcdcff] md:border-[14px]">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-[4px] bg-white">
              <img src={previewImage} alt="Yearbook preview" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>

        {/* SASE logo */}
        <img src={imageUrls["SASELogoWithoutText.png"]} className="absolute -bottom-6 -right-2 w-20 md:-bottom-10 md:-right-20 md:w-60" />
      </div>
    </div>
  );
};

export default GalleryYearbook;
