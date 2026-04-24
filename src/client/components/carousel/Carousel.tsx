import PastBoardImages from "@/client/components/board/PastBoardImages";
import { useIsMobile } from "@/client/hooks/useIsMobile";
import ProgramImages from "@/client/information/ProgramImages";
import Testimonials from "@/client/information/ProgramTestimonials";
import { cn } from "@/shared/utils";
import { Values } from "@client/information/Values";
import type { EmblaCarouselType, EmblaEventType, EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { NextButton, PrevButton, usePrevNextButtons } from "./CarouselArrows";

const TWEEN_FACTOR_BASE = 0.52;

const numberWithinRange = (number: number, min: number, max: number): number => Math.min(Math.max(number, min), max);

type PropType = {
  options?: EmblaOptionsType;
  purpose: string;
  prog: string;
};

type Value = {
  img: string;
  icon: string;
  value: string;
  text: string;
};

type Testimonial = {
  name: string;
  position: string;
  quote: string;
  image: string;
};

type MMGroup = {
  name: string;
  position: string;
  image: string;
};

type PastBoard = {
  src: string;
  year: string;
};

const checkisValue = (slide: unknown): slide is Value => {
  return typeof slide === "object" && slide !== null && "img" in slide && "icon" in slide && "value" in slide && "text" in slide;
};

const checkisTestimonial = (slide: unknown): slide is Testimonial => {
  return typeof slide === "object" && slide !== null && "name" in slide && "position" in slide && "quote" in slide && "image" in slide;
};

const checkIsMMGroup = (slide: unknown): slide is MMGroup => {
  return typeof slide === "object" && slide !== null && "name" in slide && "position" in slide && "image" in slide;
};

const checkIsPastBoard = (slide: unknown): slide is PastBoard => {
  return typeof slide === "object" && slide !== null && "src" in slide;
};

const TestimonialCarousel: React.FC<PropType> = ({ prog, purpose }) => {
  const isMobile = useIsMobile();

  let slides;
  if (purpose == "Testimonials") {
    slides = Testimonials.find((t) => t.program === prog)?.testimonials ?? [];
  } else if (purpose === "Images") {
    const pastBoard = PastBoardImages.find((i) => i.program === prog)?.images;
    const program = ProgramImages.find((i) => i.program === prog)?.images;
    slides = pastBoard ?? program ?? [];
  } else {
    slides = Values;
  }
  const [currentYear, setCurrentYear] = useState<string>("");

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<Array<number>>([]);
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<Array<HTMLElement>>([]);
  const isShortCarousel = slides.length < 3;

  const { nextBtnDisabled, onNextButtonClick, onPrevButtonClick, prevBtnDisabled } = usePrevNextButtons(emblaApi);

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector(".embla__slide__image") as HTMLElement;
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenScale = useCallback((emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();
    const slidesInView = emblaApi.slidesInView();
    const isScrollEvent = eventName === "scroll";

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress;
      const slidesInSnap = engine.slideRegistry[snapIndex];

      slidesInSnap.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();

            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);

              if (sign === -1) {
                diffToTarget = scrollSnap - (1 + scrollProgress);
              }
              if (sign === 1) {
                diffToTarget = scrollSnap + (1 - scrollProgress);
              }
            }
          });
        }

        const tweenValue = 1.25 - Math.abs(diffToTarget * tweenFactor.current);
        const scale = numberWithinRange(tweenValue, 0, 1).toString();
        const tweenNode = tweenNodes.current[slideIndex];
        tweenNode.style.transform = `scale(${scale})`;
      });
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenScale(emblaApi);

    setSnaps(emblaApi.scrollSnapList());
    setSelected(emblaApi.selectedScrollSnap());

    const updateYear = () => {
      const index = emblaApi.selectedScrollSnap();
      setSelected(index);
      const slide = slides[index];
      if (checkIsPastBoard(slide)) {
        setCurrentYear(slide.year);
      }
    };

    updateYear();

    const onSelect = () => updateYear();
    const onReInit = () => {
      setSnaps(emblaApi.scrollSnapList());
      setSelected(emblaApi.selectedScrollSnap());
      setTweenNodes(emblaApi);
      setTweenFactor(emblaApi);
      tweenScale(emblaApi);
      updateYear();
    };

    emblaApi.on("select", onSelect).on("reInit", onReInit).on("scroll", tweenScale).on("slideFocus", tweenScale);
  }, [emblaApi, slides, setTweenNodes, setTweenFactor, tweenScale]);

  return (
    <div className="relative">
      <div className="relative flex flex-row">
        {/* Left arrow for desktop version */}
        {!isMobile ? (
          <div className="pointer-events-auto z-20 flex flex-col justify-center pr-[5%]">
            <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} purpose={purpose} className="static" />
          </div>
        ) : null}

        {/* Gradient Shading on left side */}
        {purpose === "Images" ? (
          <div className="absolute left-0 top-0 z-10 h-full w-[25%] bg-gradient-to-r from-white to-transparent dark:from-background" />
        ) : null}
        {purpose === "Values" ? <div className="absolute left-0 top-0 z-10 h-full w-[25%] bg-gradient-to-r from-black to-transparent" /> : null}

        {/* Carousel slides */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y touch-pinch-zoom">
            {slides.map((slide, index) => (
              <div
                className={cn(
                  {
                    "flex-[0_0_100%]": isMobile || (checkIsPastBoard(slide) && isShortCarousel),
                    "flex-[0_0_40%]": !isMobile && !(checkIsPastBoard(slide) && isShortCarousel),
                  },
                  `flex min-w-0 items-center justify-center [transform:translate3d(0,0,0)]`,
                )}
                key={index}
              >
                <div className="embla__slide__image rounded-2xl bg-gradient-to-r from-saseBlue via-[#7DC242] to-saseGreen p-[4px]">
                  {/* Carousel for Values on Home Page */}
                  {checkisValue(slide) ? (
                    <div className="rounded-[20px] bg-[linear-gradient(140deg,#7DC242_0%,#00AEEF_100%)] p-[3px]">
                      <div className="group relative h-[350px] w-full overflow-hidden rounded-[inherit] hover:cursor-pointer md:h-[450px]">
                        <img src={slide.img} alt={`${slide.value} + Image`} className="h-full w-full object-cover" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-[inherit] bg-saseGray/60 hover:bg-saseGray/85">
                          <img
                            src={slide.icon}
                            alt={`${slide.value} + Icon`}
                            className="mb-2 transition-opacity duration-300 group-hover:opacity-0"
                          />
                          <p className="text-center font-redhat text-3xl font-semibold text-black transition-opacity duration-300 group-hover:opacity-0">
                            {slide.value}
                          </p>
                          <p className="absolute bottom-[-20%] px-4 text-center font-redhat text-lg font-medium text-black opacity-0 transition-all duration-500 group-hover:bottom-1/2 group-hover:translate-y-1/2 group-hover:opacity-100">
                            {slide.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={cn({ "hover:cursor-pointer": prog != "M&M" }, `embla__slide__image group relative flex items-center justify-center`)}
                    >
                      {/* Carousel for Interns/SASE Sports Testimonials, SET Projects, SASEHacks Recap, or M&M Groups */}
                      {checkisTestimonial(slide) || checkIsMMGroup(slide) ? (
                        <>
                          <img src={slide.image} alt={`Image`} className="aspect-auto rounded-xl" />
                          <div
                            className={cn(
                              { "transition duration-300 ease-in-out hover:bg-saseGray/90": prog != "M&M" },
                              `absolute inset-0 flex flex-col items-center justify-end rounded-xl`,
                            )}
                          >
                            <p
                              className={cn(
                                { "opacity-100 transition duration-300 group-hover:opacity-0": prog != "M&M" },
                                `absolute pb-10 font-redhat text-lg font-semibold text-black`,
                              )}
                              style={{
                                textShadow: `0.7px 0 white,-0.7px 0 white,0 0.7px white,0 -0.7px white`,
                              }}
                            >
                              {slide.name}
                            </p>

                            <p
                              className={cn(
                                { "opacity-100 transition duration-300 group-hover:opacity-0": prog != "M&M" },
                                `absolute pb-4 font-redhat text-lg text-black`,
                              )}
                              style={{
                                textShadow: `0.7px 0 white,-0.7px 0 white,0 0.7px white,0 -0.7px white`,
                              }}
                            >
                              {slide.position}
                            </p>

                            {checkisTestimonial(slide) ? (
                              <p className="flex h-0 w-full items-center justify-center overflow-hidden px-4 text-center font-redhat text-lg font-medium text-black opacity-0 transition-all duration-700 ease-in-out group-hover:h-full group-hover:translate-y-0 group-hover:opacity-100">
                                "{slide.quote}"
                              </p>
                            ) : null}
                          </div>
                        </>
                      ) : typeof slide === "object" && "src" in slide ? (
                        <img src={slide.src} alt={`Image`} className="aspect-auto rounded-xl" />
                      ) : (
                        // Carousel for Program Images
                        <img src={slide} alt={`Image`} className="aspect-auto rounded-xl" />
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gradient Shading on right side */}
        {purpose === "Images" ? (
          <div className="absolute right-0 top-0 z-10 h-full w-[25%] bg-gradient-to-l from-white to-transparent dark:from-background" />
        ) : null}
        {purpose === "Values" ? <div className="absolute right-0 top-0 z-10 h-full w-[25%] bg-gradient-to-l from-black to-transparent" /> : null}

        {/* Right arrow for desktop */}
        {!isMobile ? (
          <div className="pointer-events-auto z-20 flex flex-col justify-center pl-[5%]">
            <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} purpose={purpose} className="static" />
          </div>
        ) : null}
      </div>

      {purpose === "Images" && currentYear && (
        <div className="mt-2 flex justify-center">
          <p className="font-redhat text-lg italic text-foreground">{currentYear}</p>
        </div>
      )}
      {/* Slider Icon & Arrows for mobile version */}
      {isMobile ? (
        <div className="mt-6 flex h-fit flex-row items-center justify-center gap-12">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} purpose={purpose} className="static" />
          <div className="flex items-center justify-center gap-2">
            {snaps.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`h-2 w-2 rounded-full transition-all dark:bg-white ${selected === i ? "w-6 bg-black" : "bg-black/40 hover:bg-black/70"}`}
              />
            ))}
          </div>
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} purpose={purpose} className="static" />
        </div>
      ) : (
        <div className="mt-6 flex items-center justify-center gap-2">
          {snaps.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-2 w-2 rounded-full transition-all dark:bg-white ${selected === i ? "w-6 bg-black" : "bg-black/40 hover:bg-black/70"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialCarousel;
