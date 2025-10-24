import { cn } from "@/shared/utils";
import type { EmblaCarouselType } from "embla-carousel";
import type { ComponentPropsWithRef } from "react";
import React, { useCallback, useEffect, useState } from "react";
import "./embla.css";

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

const colorClass = (c: "blue" | "green" = "blue") =>
  c === "green" ? "text-[#7DC242] drop-shadow-[0_0_10px_rgba(125,194,66,.5)]" : "text-[#0668B3] drop-shadow-[0_0_10px_rgba(6,104,179,.5)]";

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void,
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
    if (onButtonClick) onButtonClick(emblaApi);
  }, [emblaApi, onButtonClick]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
    if (onButtonClick) onButtonClick(emblaApi);
  }, [emblaApi, onButtonClick]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

type PropType = ComponentPropsWithRef<"button"> & {
  purpose: string;
  color?: "blue" | "green";
};

const colorRing = (c?: "blue" | "green") => (c === "green" ? "ring-[#7DC242] text-[#7DC242]" : "ring-[#0668B3] text-[#0668B3]");

export const PrevButton: React.FC<PropType> = ({ children, color = "green", ...rest }) => (
  <button
    type="button"
    {...rest}
    className={cn(
      "static grid h-12 w-12 place-items-center",
      colorRing(color),
      "transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100",
      "outline-none focus:outline-none focus:ring-0 focus-visible:ring-4 focus-visible:ring-opacity-40",
      "[-webkit-tap-highlight-color:transparent]",
    )}
  >
    <svg className={cn("h-10 w-10 scale-y-[1.25] transform md:h-14 md:w-14", colorClass(color))} viewBox="0 0 100 100" aria-hidden>
      <polygon points="72,8 28,50 72,92" fill="currentColor" stroke="white" strokeWidth="8" strokeLinejoin="round" strokeLinecap="round" />{" "}
    </svg>
    {children}
  </button>
);

export const NextButton: React.FC<PropType> = ({ children, color = "blue", ...rest }) => (
  <button
    type="button"
    {...rest}
    className={cn(
      "static grid h-12 w-12 place-items-center",
      colorRing(color),
      "transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100",
      "outline-none focus:outline-none focus:ring-0 focus-visible:ring-4 focus-visible:ring-opacity-40",
      "[-webkit-tap-highlight-color:transparent]",
    )}
  >
    <svg className={cn("h-10 w-10 scale-y-[1.25] transform md:h-14 md:w-14", colorClass(color))} viewBox="0 0 100 100" aria-hidden>
      <polygon points="28,8 72,50 28,92" fill="currentColor" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />{" "}
    </svg>
    {children}
  </button>
);
