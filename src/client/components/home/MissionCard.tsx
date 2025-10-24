import { cn } from "@/shared/utils";

const MissionCard = ({ image, mission, shadow: _shadow, text }: { image: string; mission: string; text: string; shadow: "blue" | "green" }) => {
  return (
    // local stacking context
    <div className="relative z-0 w-full">
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 z-0 rounded-2xl border-[4px] bg-muted",
          "translate-x-[20px] translate-y-[20px]",
          "border-[black]",
        )}
      />

      <div className="relative z-10 rounded-2xl border-[4px] border-black bg-muted">
        <div className="flex flex-col items-center p-6 duration-300 hover:scale-105">
          <p className="pb-4 text-center font-redhat text-2xl font-semibold">{mission}</p>
          <img src={image} alt="Icon" className="pb-4" />
          <p className="text-center font-redhat text-2xl">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default MissionCard;
