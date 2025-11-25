import { cn } from "@/shared/utils";
import { useIsMobile } from "@/client/hooks/useIsMobile";

const MissionCard = ({ image, mission, shadow, text }: { image: string; mission: string; text: string; shadow: "blue" | "green" }) => {
  const isMobile = useIsMobile();

  return (
    <div className="relative z-0 w-full h-full">
      {isMobile ? <div className="pointer-events-none absolute inset-0 z-0 rounded-2xl border-4 bg-muted translate-x-[20px] translate-y-[20px] border-black"/> : null}

      <div className={cn({
        "hover:shadow-[12px_12px_0_#0668B3] hover:scale-105" : !isMobile && shadow == "blue",
        "hover:shadow-[12px_12px_0_#7DC242] hover:scale-105" : !isMobile && shadow == "green"
      },"transition duration-300 transform-gpu relative z-10 rounded-2xl border-[4px] border-black bg-muted h-full"
      )}>
        <div className="flex flex-col items-center p-6 duration-300">
          <p className="pb-4 text-center font-redhat text-3xl font-semibold">{mission}</p>
          <img src={image} alt="Icon" className="pb-4" />
          <p className={cn({"text-lg" : !isMobile, "text-sm" : isMobile},"text-center font-redhat")}>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default MissionCard;
