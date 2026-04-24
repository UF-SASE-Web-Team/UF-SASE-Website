import type { BlogCarouselProps } from "@/shared/types/blogTypes";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useCallback } from "react";

const BlogCarousel: React.FC<BlogCarouselProps> = ({ images }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <div className="relative w-full">
      {/* carousel */}
      <div className="overflow-hidden rounded-xl" ref={emblaRef}>
        <div className="flex">
          {images.map((src, index) => (
            <div key={index} className="min-w-full">
              <img src={src} alt={`Blog image ${index + 1}`} className="h-64 w-full rounded-xl object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* buttons */}
      {images.length > 1 && (
        <>
          <button onClick={scrollPrev} className="absolute left-2 top-1/2 -translate-y-1/2 transform rounded-full bg-muted p-2 shadow-md">
            <ChevronLeft size={24} />
          </button>
          <button onClick={scrollNext} className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-muted p-2 shadow-md">
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
};

export default BlogCarousel;
