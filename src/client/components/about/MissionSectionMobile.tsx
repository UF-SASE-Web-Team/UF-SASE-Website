import { cn } from "@/shared/utils";
import { Missions } from "@information/Missions";

const MissionSectionMobile: React.FC = () => (
  <div>
    <p className={cn("mb-6 flex justify-center text-center text-lg text-foreground")}>To create a welcoming community where members:</p>

    {/* Mobile-Specific Stacked Cards */}
    <div className={cn("flex flex-col items-center gap-6")}>
      {Missions.map((mission) => (
        <div className={cn("bg-muted-background relative w-11/12 max-w-md rounded-lg p-5 shadow-lg")}>
        {/* Icon */}
        <div className={cn({"right-5" : mission.shadow == "green", "left-5" : mission.shadow == "blue"}, "absolute top-0 h-12 w-12")}>
          <img src={mission.image} alt="Suitcase Icon" className={cn("w-full")} />
        </div>
        <h3 className={cn({"text-right" : mission.shadow == "blue"}, "text-lg font-bold text-foreground")}>{mission.mission}:</h3>
        <p className={cn("text-sm text-foreground")}>{mission.aboutText}</p>
        {/* Edges */}
        <div className={cn({"border-saseGreen" : mission.shadow == "green", "border-saseBlue" : mission.shadow == "blue"},"absolute -left-2 -top-2 h-7 w-7 border-l-2 border-t-2")}></div>
        <div className={cn({"border-saseGreen" : mission.shadow == "green", "border-saseBlue" : mission.shadow == "blue"}, "absolute -right-2 -bottom-2 h-7 w-7 border-b-2 border-r-2")}></div>
      </div>
      ))}
    </div>
  </div>
);

export default MissionSectionMobile;
