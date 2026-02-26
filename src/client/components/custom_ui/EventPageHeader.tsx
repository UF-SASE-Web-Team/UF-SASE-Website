import { DarkModeContext } from "@/client/components/custom_ui/DarkModeProvider";
import { cn } from "@/shared/utils";
import Calendar from "@assets/Calendar.png";
import Pinpoint from "@assets/Pinpoint.png";
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
}

export const EventPageHeader = ({ buttonHref, buttonText, date, location, subtitle, title }: EventPageHeaderProps) => {
  const isMobile = useIsMobile();
  const { darkMode } = useContext(DarkModeContext);
  const showDateLocation = date || location;

  return (
    <>
      <p className="header-text ombre-text text-center">{title}</p>
      <div className="text-center text-xl font-bold text-saseBlue">{subtitle}</div>
      <a
        className={cn("mb-12 mt-8 rounded-2xl bg-saseBlue py-5 text-2xl font-semibold text-white shadow-xl", isMobile ? "px-16" : "px-28")}
        href={buttonHref}
        target="_blank"
        rel="noopener noreferrer"
      >
        {buttonText}
      </a>
      <OmbreDivider />
      {showDateLocation && (
        <>
          <div className="relative my-6 flex flex-row justify-center text-xl font-thin sm:gap-2 md:gap-32 2xl:text-2xl">
            {date && (
              <div className={cn("flex items-center gap-6 text-center", isMobile ? "flex-[40%] flex-col" : "flex-row")}>
                <img src={Calendar} alt="Calendar" style={{ width: isMobile ? "40px" : "50px" }} className={cn({ invert: darkMode })} />
                {date}
              </div>
            )}
            {location && (
              <div className={cn("flex items-center gap-6 text-center", isMobile ? "flex-[60%] flex-col" : "flex-row")}>
                <img src={Pinpoint} alt="Pinpoint" style={{ width: isMobile ? "30px" : "35px" }} className={cn({ invert: darkMode })} />
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
