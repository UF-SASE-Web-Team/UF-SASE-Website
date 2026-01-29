import { cn } from "@/shared/utils";

export const ChatBubble = ({ children, tailSide, upsideDown }: { children: React.ReactNode; tailSide: "left" | "right"; upsideDown?: true }) => {
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
          {
            "left-24": tailSide == "left",
            "right-28 ml-auto": tailSide == "right",
            "absolute bottom-32 -rotate-[135deg] bg-saseBlue sm:bottom-52 md:bottom-64": upsideDown,
            "relative bottom-11 rotate-45 bg-saseGreen": !upsideDown,
          },
          "h-20 w-20 rounded-br-lg",
        )}
      >
        <div className="absolute bottom-2 right-2 h-full w-full rounded-br-lg bg-muted" />
      </div>
    </>
  );
};
