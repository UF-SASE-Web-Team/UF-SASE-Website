import React from "react";

interface TimelineItem {
  date: string;
  title: string;
  description: string;
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

const TimelineMobile = () => {
  return (
    <div className="scrollbar-custom max-h-[42rem] overflow-y-auto px-6 py-10">
      <div className="flex flex-col items-center gap-20">
        {defaultItems.map((item, index) => {
          const isTop = index % 2 === 0;
          const showTopLeftStar = index % 2 === 0;
          const showBottomRightStar = index % 3 === 0;
          const lastCard = index === defaultItems.length - 1;

          return (
            <div
              key={index}
              className={`relative w-full max-w-[300px] transition-transform duration-500 ease-in-out hover:scale-[1.03] ${isTop ? "mr-8" : "ml-8"}`}
            >
              {/* Glow background */}
              <div className="absolute inset-0 z-0 rounded-2xl bg-gradient-to-br from-saseBlue/20 to-saseGreen/10 opacity-70 blur-lg"></div>

              {/* Timeline Card */}
              <div className="bg-muted-background relative z-10 flex h-[180px] w-[300px] transform flex-col rounded-2xl border-2 border-border p-4 shadow-[0px_10px_0px_#7DC242] duration-300 hover:shadow-[0px_10px_0px_#0668B3]">
                {/* Optional Stars */}
                {showTopLeftStar && (
                  <div className="absolute -left-5 -top-5 z-20 animate-pulse">
                    <svg xmlns="@assets/programs/StarBulletPoint.png" fill="#0668B3" viewBox="0 0 24 24" className="h-12 w-12 drop-shadow-md">
                      <path d="M12 3l2.5 6.5L21 10l-5 4 1.5 7L12 17l-5.5 4L8 14 3 10l6.5-.5L12 3z" />
                    </svg>
                  </div>
                )}
                {showBottomRightStar && (
                  <div className="absolute -bottom-5 -right-5 z-20 animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#0668B3" viewBox="0 0 24 24" className="h-14 w-14 drop-shadow-md">
                      <path d="M12 3l2.5 6.5L21 10l-5 4 1.5 7L12 17l-5.5 4L8 14 3 10l6.5-.5L12 3z" />
                    </svg>
                  </div>
                )}

                <div className="text-xs text-muted-foreground">{item.date}</div>
                <h3 className="mt-1 text-lg font-bold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-snug text-foreground">{item.description}</p>
              </div>

              {/* Connector Line */}
              {!lastCard && (
                <div className={`absolute -bottom-20 right-1/2 h-20 w-1 bg-saseBlue`}>
                  {/* Connecting Dot */}
                  <div className={`absolute -left-1.5 bottom-1/2 h-4 w-4 rounded-full bg-saseBlue`} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimelineMobile;
