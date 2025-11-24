import { cn } from "@/shared/utils";
import { useIsMobile } from "@hooks/useIsMobile";

interface MMGoalCarProps {
  text: string;
  cardColor: "blue" | "green";
  mobileAlign: "left" | "right";
}

export const MMGoalCard = ({ cardColor, mobileAlign, text }: MMGoalCarProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={cn({"justify-end" : mobileAlign == "right" && isMobile, "justify-center" : !isMobile}, "w-full flex")}>
      <div
        className={cn(
          {
            "bg-saseGreen shadow-[0_25px_4px_rgba(125,194,66,0.5)]": cardColor == "green",
            "bg-saseBlue shadow-[0_25px_4px_rgba(6,104,79,0.5)]": cardColor == "blue",
          },
          `relative flex h-72 w-72 items-center justify-center rounded-full`,
        )}
      >
        <p className="w-full p-6 text-center font-redhat text-lg font-medium text-white">{text}</p>
      </div>
    </div>
  );
};
