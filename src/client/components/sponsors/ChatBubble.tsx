import { cn } from "@/shared/utils";

export const ChatBubble = ({ children, tailSide }: { children: React.ReactNode; tailSide: "left" | "right" }) => {
  return (
    <>
      <div className="rounded-full bg-gradient-to-b from-saseBlue to-saseGreen p-2">
        <div className="rounded-full bg-muted p-10 font-redhat font-medium">
          <div className="relative z-10 sm:text-2xl md:text-3xl">{children}</div>
        </div>
      </div>

      {/* Message Tail */}
      <div
        className={cn(
          { "left-24": tailSide == "left", "right-28 ml-auto": tailSide == "right" },
          "relative bottom-11 h-20 w-20 rotate-45 rounded-br-lg bg-saseGreen",
        )}
      >
        <div className="absolute bottom-2 right-2 h-full w-full rounded-br-lg bg-muted" />
      </div>
    </>
  );
};
