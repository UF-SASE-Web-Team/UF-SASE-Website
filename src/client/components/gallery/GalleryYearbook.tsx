import { imageUrls } from "@assets/imageUrls";
import React from "react";

const GalleryYearbook = () => {
  return (
    <div>
      <div className="flex justify-center pb-16 pt-6">
        <div className="font-redhat text-6xl font-bold text-background">UF SASE 2024-2025</div>
      </div>
      <div className="flex border-4 border-background">
        <img src={imageUrls["fall2024_11.JPG"]} alt="yearbook" />
      </div>
    </div>
  );
};

export default GalleryYearbook;
