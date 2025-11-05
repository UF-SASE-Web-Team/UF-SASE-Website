import { cn } from "@/shared/utils";

interface OmbreBackgroundProps {
  innerComponent: React.ReactNode;
  isOpaque?: boolean;
}

export const OmbreBackground: React.FC<OmbreBackgroundProps> = ({ innerComponent, isOpaque = false }) => {
  return (
    <>
      <div
        className={cn(
          { "w-[100vw] from-saseBlue/40 to-saseGreen/40": isOpaque, "w-full rounded-2xl from-saseBlue to-saseGreen": !isOpaque },
          `relative h-full bg-gradient-to-r p-[4px]`,
        )}
      >
        {innerComponent}
      </div>
    </>
  );
};
