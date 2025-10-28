import { cn } from "@/shared/utils";

interface CardProps {
  title: string;
  text: string;
  shadowColor: string;
  logo: string;
}

const MissionCard = ({ logo, shadowColor, text, title }: CardProps) => {
  return (
    <div className="flex-none">
      <div
        className={cn(
          `flex h-56 w-56 transform flex-col items-center rounded-2xl border-2 border-border bg-muted p-4 transition duration-300 hover:scale-105`,
          {
            "hover:shadow-[12px_12px_0px_#0668B3]": shadowColor === "blue",
            "hover:shadow-[12px_12px_0px_#7DC242]": shadowColor === "green",
          },
        )}
      >
        <h3 className="text-center text-lg font-bold text-foreground">{title}</h3>
        <img src={logo} alt="Logo" className="my-2 h-14 w-14 object-contain" />
        <p className="text-m text-center text-foreground">{text}</p>
      </div>
    </div>
  );
};

export default MissionCard;
