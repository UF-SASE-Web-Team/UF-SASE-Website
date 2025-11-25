import MissionCard from "@/client/components/custom_ui/MissionCard";
import { Missions } from "@/client/information/Missions";
import { cn } from "@/shared/utils";

const MissionSection: React.FC = () => {
  return (
    <div className="px-4 font-redhat">
      <p className={cn("mb-8 text-center text-3xl")}>To create a welcoming community where members:</p>

      <div className={cn("mx-auto grid max-w-7xl grid-cols-3 items-stretch gap-10 px-6")}>
        {Missions.map((s) => (
          <MissionCard image={s.image} mission="" text={s.aboutText} shadow={s.shadow} />
        ))}
      </div>
    </div>
  );
};

export default MissionSection;
