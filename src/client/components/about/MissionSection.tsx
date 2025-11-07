import { imageUrls } from "@/client/assets/imageUrls";
import { useIsMobile } from "@/client/hooks/useIsMobile";
import { cn } from "@/shared/utils";
import MissionCard from "./MissionCard";
import MissionSectionMobile from "./MissionSectionMobile";

const MissionSection: React.FC = () => {
  const isMobile = useIsMobile();

  return isMobile ? (
    <MissionSectionMobile />
  ) : (
    <section className={cn("mx-auto mb-32 w-full max-w-7xl px-4")}>
      <div className={cn("mb-12 mt-12 flex w-full items-center")}>
        <div className={cn("mr-3 h-12 w-1.5 rounded-sm bg-saseGreen")}></div>
        <h2 className={cn("font-oswald text-5xl text-foreground")}>Mission Statement</h2>
      </div>

      <p className={cn("mb-8 text-center text-3xl")}>To create a welcoming community where members:</p>

      {/* Desktop Layout */}
      <div className={cn("flex flex-nowrap justify-center gap-20")}>
        <MissionCard
          title=""
          logo={imageUrls["Suitcase.png"]}
          text="Are able to help each other develop professionally, foster leadership skills, and excel academically"
          shadowColor="green"
        />
        <MissionCard
          title=""
          logo={imageUrls["People.png"]}
          text="Learn and understand how their own culture affects the workplace"
          shadowColor="blue"
        />
        <MissionCard title="" logo={imageUrls["Lightbulb.png"]} text="Actively contribute to the local community" shadowColor="green" />
      </div>
    </section>
  );
};

export default MissionSection;
