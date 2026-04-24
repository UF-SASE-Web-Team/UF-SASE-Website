import { cn } from "@/shared/utils";

const MemberCard = ({
  image,
  name,
  quote,
  role,
  size = "normal",
  textColor,
}: {
  image: string;
  name: string;
  role: string;
  textColor: string;
  quote?: string;
  size?: "normal" | "small";
}) => {
  const isSmall = size === "small";

  return (
    <div
      className={cn(
        "relative flex flex-col justify-center rounded-2xl bg-cover bg-center pb-2",
        isSmall ? "h-[315px] w-[210px]" : "h-[420px] w-[280px]",
      )}
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-2/3 rounded-b-2xl bg-gradient-to-t from-black to-transparent" />

      {/* Content */}
      <div className={cn("relative flex h-full w-full flex-col justify-end font-redhat", isSmall ? "px-4" : "px-8")}>
        <div
          className={cn(
            {
              "border-saseBlue text-saseBlue": textColor === "blue",
              "border-saseGreen text-saseGreen": textColor === "green",
            },
            "border-b-2 pb-2",
          )}
        >
          <p className={cn("text-center font-semibold", isSmall ? "text-xl" : "text-3xl")}>{name}</p>
          <p className={cn("text-center font-medium italic", isSmall ? "text-sm" : "text-lg")}>{role}</p>
        </div>
        {quote && <p className={cn("w-full p-2 text-center text-white", isSmall ? "text-xs" : "text-lg")}>"{quote}"</p>}
      </div>
    </div>
  );
};

export default MemberCard;
