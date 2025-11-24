import MissionCard from "@/client/components/custom_ui/MissionCard";
import React, { useRef, useState } from "react";

interface MobileMissionCarouselProps {
  slides: Array<{
    image: string;
    mission: string;
    homeText: string;
    aboutText: string;
    shadow: "green" | "blue";
  }>;
}

export const MobileMissionCarousel: React.FC<MobileMissionCarouselProps> = ({ slides }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);

  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    setIdx(Math.round(el.scrollLeft / el.clientWidth));
  };

  const go = (i: number) => ref.current?.scrollTo({ left: i * (ref.current?.clientWidth ?? 0), behavior: "smooth" });

  return (
    <div className="w-full">
      <div
        ref={ref}
        onScroll={onScroll}
        className="relative w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain scrollbar-none"
        style={{ scrollBehavior: "smooth" }}
      >
        <div className="flex">
          {slides.map((s) => (
            <div key={s.mission} className="w-full shrink-0 snap-start">
              <div className="h-[300px] w-[300px] [&>div>div:nth-child(2)>div:hover]:scale-100 [&>div>div:nth-child(2)>div]:h-full [&>div>div:nth-child(2)]:h-full [&>div]:h-full">
                <MissionCard image={s.image} mission={s.mission} text={s.homeText} shadow={s.shadow} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => go(i)}
            className={`h-2 rounded-full transition-all ${i === idx ? "w-6 bg-foreground" : "w-2 bg-muted-foreground/40"}`}
          />
        ))}
      </div>
    </div>
  );
};
