import BlueStar from "@assets/other/BlueStar.png";
import GreenStar from "@assets/other/GreenStar.png";
import React from "react";
import { useIsMobile } from "@hooks/useIsMobile";
import { cn } from "@/shared/utils";

interface ProgramCardProps {
  name: string;
  image: string;
  text: React.ReactNode;
  link: string;
  number: string;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ image, link, name, number, text }) => {
  const isMobile = useIsMobile();

  return (
    <div className="ombre-background p-1 rounded-2xl max-h-[960px]">
        <div className="h-full w-full">
          {/* Number in Corner */}
          <div className="absolute -left-3 -top-3 z-20 flex h-10 w-14 items-center justify-center rounded-2xl border-l-4 border-t-4 border-border border-saseBlue bg-saseGrayLight dark:bg-black">
            <p className="pb- inline-block bg-gradient-to-r from-saseBlue to-saseGreen bg-clip-text font-redhat text-xl font-bold text-saseGreen text-transparent">
              {number}/5
            </p>
          </div>

          <div className="relative z-10 flex h-full w-full flex-col items-center gap-4 rounded-2xl bg-muted bg-saseGrayLight p-6 shadow-saseGreen drop-shadow-[4px_4px_6px_var(--tw-shadow-color)] dark:bg-black">
            {/* Image */}
            <div className={cn({"h-[360px]" : !isMobile, "h-[280px]" : isMobile}, "w-full")}>
              <img src={image} alt="Program Image" className="h-full w-full rounded-2xl object-fill" />
            </div>

            {/* Stars */}
            <div className="flex w-full flex-row items-center justify-center">
              <img src={BlueStar} alt="Blue star icon" />
              <img src={GreenStar} alt="Green star icon" />
              <img src={BlueStar} alt="Blue star icon" />
            </div>

            {/* Text Content */}
            <div className="flex w-full flex-1 flex-col items-center justify-between gap-4">
              <h1 className="w-full pb-2 text-center font-oswald text-3xl font-medium">{name}</h1>
              <p className={cn({"text-lg" : !isMobile, "text-sm" : isMobile}, "font-redhat text-foreground")}>{text}</p>
              <a href={link} target="_blank" rel="noopener noreferrer">
                <button className="mt-4 w-40 rounded-full bg-saseBlueLight py-2 text-center font-redhat text-lg italic text-white transition duration-300 hover:scale-105 hover:bg-saseBlue focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Learn More ...
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ProgramCard;
