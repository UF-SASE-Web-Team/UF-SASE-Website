import { cn } from "@/shared/utils";
import { useIsMobile } from "@hooks/useIsMobile";

interface GoalCardProps {
  text: string;
  color: "blue" | "green";
  mobileAlign: "left" | "right";
}

const GoalCard = ({ color, mobileAlign, text }: GoalCardProps) => {
  const isMobile = useIsMobile();

  return (
    <div className={cn({"justify-end" : mobileAlign == "right" && isMobile, "justify-center" : !isMobile}, "w-full flex")}>
      <div
        className={cn(
          `flex h-56 w-56 transform flex-col items-center justify-center rounded-2xl border-2 border-border bg-black p-6 transition duration-300 hover:scale-105`,
          {
            "hover:shadow-[18px_18px_0px_#0668B3]": color === "blue",
            "hover:shadow-[18px_18px_0px_#7DC242]": color === "green",
          },
        )}
      >
        <p className="font-redhat text-lg text-white font-medium">{text}</p>
      </div>
    </div>
  );
};

export default GoalCard;
