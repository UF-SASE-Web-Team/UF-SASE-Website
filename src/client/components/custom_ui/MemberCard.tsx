import { cn } from "@/shared/utils";

const MemberCard = ({ image, name, quote, role, textColor }: { image: string; name: string; role: string; textColor: string; quote?: string }) => {
  return (
    <div
      className="relative flex h-[420px] w-[280px] flex-col justify-center rounded-2xl bg-cover bg-center pb-2"
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-2/3 rounded-b-2xl bg-gradient-to-t from-black to-transparent" />

      {/* Content */}
      <div className="relative flex h-full w-full flex-col justify-end px-8 font-redhat">
        <div
          className={cn(
            {
              "text-saseBlue": textColor == "blue",
              "border-saseBlue": textColor == "blue",
              "text-saseGreen": textColor == "green",
              "border-saseGreen": textColor == "green",
              "text-2xl": quote,
              "text-3xl": !quote,
            },
            `border-b-2 pb-2`,
          )}
        >
          <p className="text-center font-semibold text-3xl">{name}</p>
          <p className="text-center text-lg font-medium italic">{role}</p>
        </div>
        {quote && (
          <>
            <p className="w-full p-2 text-center text-lg text-white">"{quote}"</p>
          </>
        )}
      </div>
    </div>
  );
};

export default MemberCard;
