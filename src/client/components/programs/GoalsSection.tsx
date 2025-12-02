import { HeaderWithGreenBorder } from "@components/custom_ui/HeaderWithGreenBorder";
import { cn } from "@/shared/utils";
import { useIsMobile } from "@/client/hooks/useIsMobile";
import GoalCard from "./GoalCard";

export const GoalsSection = ({goals} : {goals: Array<{
  text: string;
  color: "blue" | "green";
  mobileAlign: "left" | "right";
  }>}
) => {

  const isMobile = useIsMobile();
  return(
     <div className="flex w-full justify-center bg-saseGrayLight py-10 dark:bg-greenBackground">
      <div className="w-full max-w-7xl">
        <HeaderWithGreenBorder text="Goals & Outcomes" type="Subheader" />
        <div className={cn({ "flex-col gap-10": isMobile, "flex-row gap-36": !isMobile }, "flex flex-nowrap items-center justify-center px-8")}>
          {goals.map((goal, index) => (
            <GoalCard text={goal.text} color={goal.color} mobileAlign={goal.mobileAlign} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}