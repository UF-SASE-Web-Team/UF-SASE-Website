import { useIsMobile } from "@/client/hooks/useIsMobile";
import { cn } from "@/shared/utils";

const MissionCard = ({ image, mission, shadow, text }: { image: string; mission: string; text: string; shadow: "blue" | "green" }) => {
  const isMobile = useIsMobile();

  return (
    <div className="relative z-0 h-full w-full">
      {isMobile ? (
        <div className="pointer-events-none absolute inset-0 z-0 translate-x-[20px] translate-y-[20px] rounded-2xl border-4 border-black bg-muted" />
      ) : null}

      <div
        className={cn(
          {
            "hover:scale-105 hover:shadow-[12px_12px_0_#0668B3]": !isMobile && shadow == "blue",
            "hover:scale-105 hover:shadow-[12px_12px_0_#7DC242]": !isMobile && shadow == "green",
          },
          "relative z-10 h-full transform-gpu rounded-2xl border-[4px] border-black bg-muted transition duration-300",
        )}
      >
        <div className="flex flex-col items-center p-6 duration-300">
          <p className="pb-4 text-center font-redhat text-3xl font-semibold">{mission}</p>
          <img src={image} alt="Icon" className="pb-4" />
          <p className={cn({ "text-lg": !isMobile, "text-sm": isMobile }, "text-center font-redhat")}>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default MissionCard;
