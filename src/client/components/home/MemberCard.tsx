import { cn } from "@/shared/utils";

const MemberCard = ({ image, name, quote, role, textColor }: { image: string; name: string; role: string; textColor: string; quote: string }) => {
  return (
    <div
      className="relative flex h-[420px] w-[250px] flex-col justify-center rounded-2xl bg-cover bg-center pb-2"
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-2/3 rounded-b-2xl bg-gradient-to-t from-black to-transparent" />

      {/* Content */}
      <div
        className={cn(
          {
            "text-saseBlue": textColor == "blue",
            "border-saseBlue": textColor == "blue",
            "text-saseGreen": textColor == "green",
            "border-saseGreen": textColor == "green",
          },
          `relative ml-8 mr-8 border-b-2 pb-2 pt-[100%] font-redhat text-2xl`,
        )}
      >
        <p className="text-center font-semibold">{name}</p>
        <p className="text-center italic">{role}</p>
      </div>
      <div className=".flex-center z-10">
        <p className="w-full p-2 text-center font-redhat text-xl text-white">"{quote}"</p>
      </div>
    </div>
  );
};

export default MemberCard;
