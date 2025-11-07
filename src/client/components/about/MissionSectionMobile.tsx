import { imageUrls } from "@/client/assets/imageUrls";
import { cn } from "@/shared/utils";

const MissionSectionMobile: React.FC = () => (
  <section className={cn("mx-auto mb-12 w-full max-w-7xl")}>
    <div className={cn("mb-10 mt-10 flex w-full max-w-7xl items-center px-4 sm:justify-start")}>
      <div className={cn("mr-3 h-12 w-1.5 rounded-sm bg-saseGreen")}></div>
      <h2 className={cn("font-oswald text-5xl text-foreground")}>Mission Statement</h2>
    </div>

    <p className={cn("mb-6 flex justify-center text-lg text-foreground")}>To create a welcoming community where members:</p>

    {/* Mobile-Specific Stacked Cards */}
    <div className={cn("flex flex-col items-center gap-6")}>
      {/* Professional Development */}
      <div className={cn("bg-muted-background relative w-full max-w-md rounded-lg p-5 shadow-lg")}>
        {/* Icon */}
        <div className={cn("absolute -top-3 right-5 h-12 w-12")}>
          <img src={imageUrls["Suitcase.png"]} alt="Suitcase Icon" className={cn("w-full")} />
        </div>
        <h3 className={cn("text-lg font-bold text-foreground")}>Professional Development:</h3>
        <p className={cn("text-foreground")}>To prepare Asian heritage students for success in the global business world.</p>
        {/* Edges */}
        <div className={cn("absolute -left-2 -top-2 h-7 w-7 border-l-2 border-t-2 border-green-500")}></div>
        <div className={cn("absolute -right-2 bottom-[-8px] h-7 w-7 border-b-2 border-r-2 border-green-500")}></div>
      </div>

      {/* Diversity */}
      <div className={cn("bg-muted-background relative w-full max-w-md rounded-lg p-5 shadow-lg")}>
        <div className={cn("absolute -top-3 left-5 h-12 w-12")}>
          <img src={imageUrls["People.png"]} alt="Diversity Icon" className={cn("w-full")} />
        </div>
        <h3 className={cn("text-right text-lg font-bold text-foreground")}>Diversity:</h3>
        <p className={cn("text-foreground")}>To promote diversity and tolerance on campuses and in the workplace.</p>
        <div className={cn("absolute -right-2 -top-2 h-7 w-7 border-r-2 border-t-2 border-blue-500")}></div>
        <div className={cn("absolute -left-2 bottom-[-8px] h-7 w-7 border-b-2 border-l-2 border-blue-500")}></div>
      </div>

      {/* Community */}
      <div className={cn("bg- shadomuted-background-lg relative w-full max-w-md rounded-lg p-5")}>
        <div className={cn("absolute -top-3 right-5 h-12 w-12")}>
          <img src={imageUrls["Lightbulb.png"]} alt="Community Icon" className={cn("w-full")} />
        </div>
        <h3 className={cn("text-lg font-bold text-foreground")}>Community:</h3>
        <p className={cn("text-foreground")}>To provide opportunities for our members to contribute to their local communities.</p>
        <div className={cn("absolute -left-2 -top-2 h-7 w-7 border-l-2 border-t-2 border-green-500")}></div>
        <div className={cn("absolute -right-2 bottom-[-8px] h-7 w-7 border-b-2 border-r-2 border-green-500")}></div>
      </div>
    </div>
  </section>
);

export default MissionSectionMobile;
