import { cn } from "@/shared/utils";
import MissionCard from "@/client/components/custom_ui/MissionCard";
import { Missions } from "@/client/information/Missions";

const MissionSection: React.FC = () => {

  return (
    <div className="px-4 font-redhat">
      <p className={cn("mb-8 text-center text-3xl")}>To create a welcoming community where members:</p>

      <div className={cn("mx-auto grid max-w-7xl grid-cols-3 items-stretch gap-10 px-6")}>
{Missions.map((s) => (
                  <div key={s.mission} className="flex justify-center">
                    <div
                      className={[
                        "relative h-full w-full",
                        "[&>div]:h-full",
                        "[&>div>div:nth-child(2)]:h-full",
                        "[&>div>div:nth-child(2)>div]:h-full",
                        // hide the background copy on desktop
                        "[&>div>div:first-child]:hidden",
                        // scale whole card on hover
                        "[&>div]:transition-transform",
                        "[&>div]:duration-300",
                        "[&>div]:transform-gpu",
                        "hover:[&>div]:scale-105",
                        s.shadow === "blue"
                          ? "hover:[&>div>div:nth-child(2)]:shadow-[12px_12px_0_#0668B3]"
                          : "hover:[&>div>div:nth-child(2)]:shadow-[12px_12px_0_#7DC242]",
                        // prevent inner double-scale
                        "[&>div>div:nth-child(2)>div:hover]:scale-100",
                      ].join(" ")}
                    >
                      <MissionCard image={s.image} mission="" text={s.aboutText} shadow={s.shadow} />
                    </div>
                  </div>
                ))}

      </div>
    </div>
  );
};

export default MissionSection;
