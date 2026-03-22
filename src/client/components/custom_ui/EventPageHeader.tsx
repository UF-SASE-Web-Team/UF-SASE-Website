import { DarkModeContext } from "@/client/components/custom_ui/DarkModeProvider";
import { cn } from "@/shared/utils";
import { imageUrls } from "@assets/imageUrls";
import { OmbreDivider } from "@components/custom_ui/OmbreDivider";
import { useIsMobile } from "@hooks/useIsMobile";
import { useContext } from "react";

interface EventPageHeaderProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonHref: string;
  date?: string;
  location?: string;
  buttonClassName?: string;
}

export const EventPageHeader = ({ buttonClassName, buttonHref, buttonText, date, location, subtitle, title }: EventPageHeaderProps) => {
  const isMobile = useIsMobile();
  const { darkMode } = useContext(DarkModeContext);
  const showDateLocation = date || location;

  return (
    <>
      <p className="header-text ombre-text text-center">{title}</p>
      <div className="text-center text-xl font-bold text-saseBlue">{subtitle}</div>
      <a
        className={cn(
          "mx-2 mb-12 mt-8 rounded-2xl bg-saseBlue py-5 text-2xl font-semibold text-white shadow-xl",
          isMobile ? "px-12" : "px-20",
          buttonClassName,
        )}
        href={buttonHref}
        target="_blank"
        rel="noopener noreferrer"
      >
        {buttonText}
      </a>
      <OmbreDivider />
      {showDateLocation && (
        <>
          <div className="relative my-6 flex flex-row justify-center text-lg font-thin sm:gap-2 md:gap-32 2xl:text-2xl">
            {date && (
              <div className={cn("flex items-center gap-6 text-center", isMobile ? "flex-[40%] flex-col" : "flex-row")}>
                <img
                  src={imageUrls["Calendar.png"]}
                  alt="Calendar"
                  style={{ width: isMobile ? "40px" : "50px" }}
                  className={cn({ invert: darkMode })}
                />
                {date}
              </div>
            )}
            {location && (
              <div className={cn("flex items-center gap-6 text-center", isMobile ? "flex-[60%] flex-col" : "flex-row")}>
                <img
                  src={imageUrls["Pinpoint.png"]}
                  alt="Pinpoint"
                  style={{ width: isMobile ? "28px" : "35px" }}
                  className={cn({ invert: darkMode })}
                />
                {location}
              </div>
            )}
          </div>
          <OmbreDivider />
        </>
      )}
    </>
  );
};
