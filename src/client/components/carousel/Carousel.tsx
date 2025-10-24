import { cn } from "@/shared/utils";
import Values from "@components/home/Values";
import ProgramImages from "@components/programs/ProgramImages";
import Testimonials from "@components/programs/Testimonials";
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

const checkisValue = (slide: unknown): slide is Value => {
  return typeof slide === "object" && slide !== null && "img" in slide && "icon" in slide && "value" in slide && "text" in slide;
};

const checkisTestimonial = (slide: unknown): slide is Testimonial => {
  return typeof slide === "object" && slide !== null && "name" in slide && "position" in slide && "quote" in slide && "image" in slide;
};

const TestimonialCarousel: React.FC<PropType> = ({ prog, purpose }) => {
  let slides;
  if (purpose == "Testimonials") {
    slides = Testimonials.find((t) => t.program === prog)?.testimonials ?? [];
  } else if (purpose == "Images") {
    slides = ProgramImages.find((i) => i.program === prog)?.images ?? [];
  } else {
    slides = Values;
  }

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<Array<number>>([]);
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<Array<HTMLElement>>([]);

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

    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    const onReInit = () => {
      setSnaps(emblaApi.scrollSnapList());
      setSelected(emblaApi.selectedScrollSnap());
      setTweenNodes(emblaApi);
      setTweenFactor(emblaApi);
      tweenScale(emblaApi);
    };

    emblaApi.on("select", onSelect).on("reInit", onReInit).on("scroll", tweenScale).on("slideFocus", tweenScale);
  }, [emblaApi, setTweenNodes, setTweenFactor, tweenScale]);

  return (
    <div
      className={cn(
        {
          "flex items-center justify-center pb-8": purpose === "Testimonials",
        },
        `relative m-auto`,
      )}
    >
      <div className="relative">
        {purpose === "Images" ? (
          <div className="absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-white to-transparent dark:from-black" />
        ) : null}
        {purpose === "Values" ? <div className="absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-black to-transparent" /> : null}

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y touch-pinch-zoom">
            {slides.map((slide, index) => (
              <div className="flex min-w-0 flex-[0_0_80%] items-center justify-center [transform:translate3d(0,0,0)] md:flex-[0_0_50%]" key={index}>
                <div className="embla__slide__image rounded-2xl bg-gradient-to-r from-saseBlue via-[#7DC242] to-saseGreen p-[4px]">
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
                          <p className="text-center font-redhat text-3xl font-semibold text-black transition-opacity duration-300 group-hover:opacity-0 md:text-2xl lg:text-3xl">
                            {slide.value}
                          </p>
                          <p className="absolute bottom-[-20%] px-4 text-center font-redhat text-lg font-medium text-black opacity-0 transition-all duration-500 group-hover:bottom-1/2 group-hover:translate-y-1/2 group-hover:opacity-100 md:text-base lg:text-lg">
                            {slide.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="embla__slide__image group relative flex items-center justify-center hover:cursor-pointer">
                      {checkisTestimonial(slide) ? (
                        <>
                          <img src={slide.image} alt={`Image`} className="aspect-auto rounded-xl" />
                          <div className="absolute inset-0 flex flex-col items-center justify-end rounded-xl transition duration-300 ease-in-out hover:bg-saseGray/90">
                            <p
                              className="absolute pb-10 font-redhat text-xl font-semibold text-black opacity-100 transition duration-300 group-hover:opacity-0"
                              style={{
                                textShadow: `0.7px 0 white,-0.7px 0 white,0 0.7px white,0 -0.7px white`,
                              }}
                            >
                              {slide.name}
                            </p>

                            <p
                              className="absolute pb-4 font-redhat text-lg text-black opacity-100 transition duration-300 group-hover:opacity-0"
                              style={{
                                textShadow: `0.7px 0 white,-0.7px 0 white,0 0.7px white,0 -0.7px white`,
                              }}
                            >
                              {slide.position}
                            </p>

                            <p className="flex h-0 w-full items-center justify-center overflow-hidden px-4 text-center font-redhat text-lg font-medium text-black opacity-0 transition-all duration-700 ease-in-out group-hover:h-full group-hover:translate-y-0 group-hover:opacity-100 md:text-sm lg:text-base">
                              "{slide.quote}"
                            </p>
                          </div>
                        </>
                      ) : (
                        <img src={slide} alt={`Image`} className="aspect-auto rounded-xl" />
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {purpose === "Images" ? (
          <div className="absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-white to-transparent dark:from-black" />
        ) : null}
        {purpose === "Values" ? <div className="absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-black to-transparent" /> : null}

        {(purpose === "Testimonials" || purpose === "Values") && (
          <div className="pointer-events-none absolute inset-y-0 -left-4 -right-4 z-30 flex items-center justify-between md:-left-6 md:-right-6">
            <div className="pointer-events-auto">
              <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} purpose={purpose} className="static" />
            </div>
            <div className="pointer-events-auto">
              <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} purpose={purpose} className="static" />
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {snaps.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-2 w-2 rounded-full transition-all ${selected === i ? "w-6 bg-white" : "bg-white/40 hover:bg-white/70"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
