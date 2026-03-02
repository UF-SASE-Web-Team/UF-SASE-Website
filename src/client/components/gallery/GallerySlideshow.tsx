import { imageUrls } from "@assets/imageUrls";
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const GallerySlideshow = () => {
  return (
    <div className="flex flex-row items-center justify-between gap-5 pt-10">
      <FaChevronLeft size={40} className="icon-btn" />
      <div className="gallery-border w-full overflow-hidden">
        <img src={imageUrls["fall2024_12.JPG"]} alt="" className="h-full w-full object-cover" />
      </div>
      <FaChevronRight size={40} className="icon-btn" />
    </div>
  );
};

export default GallerySlideshow;
