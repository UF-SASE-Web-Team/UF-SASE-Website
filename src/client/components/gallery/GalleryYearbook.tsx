import { imageUrls } from "@assets/imageUrls";
import React from "react";

type Props = {
  year: "2023-2024" | "2024-2025";
};

const GalleryYearbook = ({ year }: Props) => {
  const displayLabel = year === "2023-2024" ? "UF SASE 2023–2024" : "UF SASE 2024–2025";

  const previewImage = year === "2023-2024" ? imageUrls["fall2023_7.JPG"] : imageUrls["fall2024_11.JPG"];

  return (
    <div className="flex w-full max-w-4xl flex-col items-center">
      {/* Title */}
      <div className="mb-6 mt-4 text-center">
        <h3 className="font-oswald text-5xl font-bold text-background">{displayLabel}</h3>
      </div>

      {/* Frame block */}
      <div className="relative w-full">
        {/* Outer large rounded rectangle */}
        <div className="rounded-[32px] bg-[#e0ecff] p-4 shadow-[0_0_0_6px_#8cb8f7]">
          {/* Left vertical bar */}
          <div className="flex">
            <div className="mr-4 w-10 rounded-[20px] bg-[#c9ddff]" />

            {/* Inner frame */}
            <div className="flex-1 rounded-[20px] border-[10px] border-[#9dc4ff] bg-white p-2">
              <div className="aspect-[4/3] overflow-hidden rounded-[12px] bg-gray-100">
                <img src={previewImage} className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* SASE logo overlapping bottom-right */}
        <img src={imageUrls["SASELogoWithoutText.png"]} className="absolute -bottom-12 -right-12 w-40 drop-shadow-lg" />
      </div>
    </div>
  );
};

export default GalleryYearbook;
