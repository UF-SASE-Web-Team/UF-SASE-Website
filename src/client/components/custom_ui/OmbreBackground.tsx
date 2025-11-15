import { cn } from "@/shared/utils";

interface OmbreBackgroundProps {
  innerComponent: React.ReactNode;
  isOpaque?: boolean;
  isChatBubble?: boolean;
}

export const OmbreBackground: React.FC<OmbreBackgroundProps> = ({ innerComponent, isOpaque = false, isChatBubble = false }) => {
  return (
    <>
      <div
        className={cn(
          {
            "w-[100vw] from-saseBlue/40 to-saseGreen/40 p-[4px]": isOpaque,
            "w-full rounded-2xl from-saseBlue to-saseGreen p-[4px]": !isOpaque,
            "rounded-full p-[8px]": isChatBubble,
          },
          `relative h-full bg-gradient-to-r`,
        )}
      >
        {innerComponent}
      </div>
    </>
  );
};
