import React from "react";

type SlideshowIndicatorProps = {
  label: string;
};

const SlideshowIndicator = ({ label }: SlideshowIndicatorProps) => {
  // remove spaces so it stacks nicely
  const chars = label.replace(/\s+/g, "").split("");

  return (
    <div className="flex select-none flex-col items-center gap-2 sm:gap-3 md:gap-4">
      {chars.map((c, idx) => {
        const isYearChar = /\d/.test(c); // digits -> year

        const baseClasses =
          "flex items-center justify-center rounded-full font-redhat font-semibold text-white font-muted" +
          "h-10 w-10 border-[2px] text-base " +
          "sm:h-11 sm:w-11 sm:border-[3px] sm:text-lg" +
          "md:h-12 md:w-12 md:border-[4px] md:text-xl";

        const colorClasses = isYearChar ? "bg-saseGreen border-saseGreen" : "bg-saseBlue border-saseBlue";

        return (
          <div key={idx} className={`${baseClasses} ${colorClasses}`}>
            {c}
          </div>
        );
      })}
    </div>
  );
};

export default SlideshowIndicator;
