import { imageUrls } from "@assets/imageUrls";
import React, { useEffect, useRef } from "react";

interface TimelineItem {
  date: string;
  title: string;
  description: string;
}

interface TimelineProps {
  items?: Array<TimelineItem>;
}

const defaultItems: Array<TimelineItem> = [
  {
    title: "Silver Chapter 2010-11",
    description: "Won National SASE Gold Chapter of the Year",
    date: "Jan 2011",
  },
  {
    title: "Silver Chapter 2011-12",
    description: "Won National SASE Silver Chapter of the Year",
    date: "Jan 2012",
  },
  {
    title: "SRC 2014 Host",
    description: "Hosted SASE Southeastern Regional Conference: Connecting the Dots",
    date: "Jan 2014",
  },
  {
    title: "SRC 2015 Host",
    description: "Hosted SASE Southeastern Regional Conference: Ignite, Innovate, Inspire",
    date: "Jan 2015",
  },
  {
    title: "Game Night Winner, NC 2015",
    description: "UF SASE team “Chompions” wins Game Night at National Conference 2015",
    date: "Jan 2015",
  },
  {
    title: "SRC 2016 Host",
    description: "Host of SASE Southeastern Regional Conference: Beyond Expectations",
    date: "Mar 2016",
  },
  {
    title: "Inspire Awards 2018-2019",
    description: "SASE Inspire Awards: Most Philanthropic – Honorable Mention",
    date: "Jan 2019",
  },
  {
    title: "Inspire Awards 2019-20",
    description: "SASE Inspire Awards: Most Influential Chapter Honorable Mention",
    date: "Jan 2020",
  },
  {
    title: "SRC 2021 Host",
    description: "Hosted SASE South Regional Conference: Future in Focus",
    date: "Mar 2021",
  },
  {
    title: "Inspire Awards 2021-22",
    description: "Collegiate Star Honorable Mention: Ian Lai (Social Chair ’21-’22, President ’22-’23)",
    date: "Jan 2022",
  },
  {
    title: "Award of Excellence 2021-22",
    description: "Gator Engineering Student Society Recognition Award of Excellence",
    date: "Jan 2022",
  },
  {
    title: "Inspire Awards 2022-23",
    description: "SASE Inspire Awards: Most Improved Chapter",
    date: "Jun 2023",
  },
  {
    title: "UF Student Organization Awards 2023-24",
    description: "Member of the Year: Sophia Dong (AASA Choreographer, SERC Programming Lead)",
    date: "Apr 2024",
  },
  {
    title: "UF Student Organization Awards 2023-24",
    description: "“Life Long Learner” Excellence in Career Readiness",
    date: "Apr 2024",
  },
  {
    title: "UF Student Organization Awards 2023-24",
    description: "Student Organization of the Year USSO",
    date: "Apr 2024",
  },
  {
    title: "Inspire Awards 2023-24",
    description: "Collegiate Star: Emely Chhu (UF SASE President)",
    date: "May 2024",
  },
  {
    title: "Inspire Awards 2023-24",
    description: "Strongest SASE Chapter",
    date: "May 2024",
  },
];
const Timeline: React.FC<TimelineProps> = ({ items = defaultItems }) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const scrollInterval = useRef<number | null>(null);

  useEffect(() => {
    const timelineElement = timelineRef.current;

    let scrollAccumulator = 0;

    const scrollTimeline = () => {
      if (timelineElement) {
        scrollAccumulator += 0.3;

        if (scrollAccumulator >= 1) {
          timelineElement.scrollLeft += Math.floor(scrollAccumulator);
          scrollAccumulator = scrollAccumulator % 1;
        }

        scrollInterval.current = requestAnimationFrame(scrollTimeline);
      }
    };

    const observerCallback = (entries: Array<IntersectionObserverEntry>) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        scrollInterval.current = requestAnimationFrame(scrollTimeline);
      } else {
        if (scrollInterval.current) {
          cancelAnimationFrame(scrollInterval.current);
          scrollInterval.current = null;
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      threshold: 0.5,
    });

    if (timelineElement) {
      observer.observe(timelineElement);
    }

    return () => {
      if (scrollInterval.current) {
        cancelAnimationFrame(scrollInterval.current);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative mx-auto h-[35rem] max-w-7xl">
      {/* Gradient Overlay Container */}
      <div className="pointer-events-none absolute inset-0 z-20 flex justify-between">
        {/* Left Gradient Overlay */}
        <div className="h-full w-16 bg-gradient-to-r from-white to-transparent dark:from-black" />

        {/* Right Gradient Overlay */}
        <div className="h-full w-16 bg-gradient-to-l from-white to-transparent dark:from-black" />
      </div>

      {/* Scrollable Timeline Container */}
      <div ref={timelineRef} className="scrollbar-custom flex h-full items-center justify-center overflow-x-auto">
        <div className="absolute top-[49%] z-10 h-1 w-full -translate-y-1/2 bg-saseBlue" />
        <div className="relative w-full px-32">
          {/* Main Timeline Line */}

          {/* Background SASE Logos */}
          <div className="z-15 absolute -left-2">
            <img src={imageUrls["SASELogoStar.png"]} className="h-50 w-50 drop-shadow-md"></img>
          </div>
          <div className="z-15 absolute -right-2">
            <img src={imageUrls["SASELogoStar.png"]} className="h-50 w-50 drop-shadow-md"></img>
          </div>
          <div className="z-15 absolute -bottom-2 right-[50%]">
            <img src={imageUrls["SASELogoStar.png"]} className="h-50 w-50 drop-shadow-md"></img>
          </div>

          {/* Timeline Items Container */}
          <div className="relative flex items-center space-x-44 pl-8">
            {items.map((item, index) => {
              const isTop = index % 2 === 0;
              const showBottomSASELogo = index % 3 === 0;
              const showTopStar = index % 3 !== 0;

              return (
                <div key={index} className="relative flex flex-col items-center" style={{ width: `${100 / items.length}%` }}>
                  {/* Card */}
                  <div
                    className={`absolute flex h-[180px] w-[300px] transform flex-col rounded-2xl border-2 border-border bg-muted p-4 shadow-[0px_10px_0px_#7DC242] duration-300 hover:scale-105 hover:shadow-[0px_10px_0px_#0668B3] ${
                      isTop ? "bottom-full mb-14" : "top-full mt-14"
                    }`}
                  >
                    <div className="text-xs text-muted-foreground">{item.date}</div>
                    <div className="mt-1 text-lg font-bold text-foreground">{item.title}</div>
                    <p className="mt-2 overflow-auto text-foreground">{item.description}</p>

                    {/* Optional SASE Logos */}
                    {showBottomSASELogo && (
                      <div className="absolute -bottom-7 -right-7 z-20">
                        <img src={imageUrls["SASELogoStar.png"]} className="h-20 w-20 drop-shadow-md"></img>
                      </div>
                    )}

                    {/* Optional Stars */}
                    {showTopStar && (
                      <div className="absolute -left-5 -top-6 z-20">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#0668B3" viewBox="0 0 24 24" className="h-14 w-14 drop-shadow-md">
                          <path d="M12 3l2.5 6.5L21 10l-5 4 1.5 7L12 17l-5.5 4L8 14 3 10l6.5-.5L12 3z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Connector Line */}
                  <div className={`absolute w-1 bg-saseBlue ${isTop ? "bottom-1/2 h-14" : "top-1/2 h-14"}`}>
                    {/* Connecting Dot */}
                    <div className={`${isTop ? "bottom-12" : "top-12"} absolute -left-1.5 h-4 w-4 rounded-full bg-saseBlue`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
