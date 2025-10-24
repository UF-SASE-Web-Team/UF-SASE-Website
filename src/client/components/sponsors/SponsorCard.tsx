import { cn } from "@/shared/utils";
import { imageUrls } from "@assets/imageUrls";
import { Link } from "@tanstack/react-router";

interface SponsorStyle {
  src: string;
  size: string;
  translateY: string;
  rotate?: string;
}

type SponsorType = "Diamond" | "Gold" | "Silver" | "Bronze";

const typeStyles: Record<SponsorType, SponsorStyle> = {
  Diamond: {
    src: imageUrls["Diamond.png"],
    size: "h-[30%]",
    translateY: "-translate-y-1/3",
    rotate: "rotate-[-15deg]",
  },
  Gold: {
    src: imageUrls["Gold.png"],
    size: "h-[30%]",
    translateY: "-translate-y-1/3",
  },
  Silver: {
    src: imageUrls["Silver.png"],
    size: "h-[30%]",
    translateY: "-translate-y-1/3",
  },
  Bronze: {
    src: imageUrls["Bronze.png"],
    size: "h-[30%]",
    translateY: "-translate-y-1/3",
  },
};

interface SponsorCardProps {
  companyName: string;
  image: string;
  link: string;
  shadowcolor: string;
  type: SponsorType;
  mobileVariant?: "default" | "compact";
}

const SponsorCard = ({ companyName, image, link, mobileVariant = "default", shadowcolor: _shadowcolor, type }: SponsorCardProps) => {
  const compact = mobileVariant === "compact";
  return (
    <div className="flex h-full w-full flex-col" style={{ zIndex: 10 }}>
      <p
        className={cn(
          {
            "text-saseBlue": type === "Diamond",
            "text-amber-300": type === "Gold",
            "text-slate-400": type === "Silver",
            "text-amber-700": type === "Bronze",
          },
          compact ? "text-lg sm:text-2xl" : "text-2xl",
          "pb-1 text-center font-redhat font-semibold",
        )}
      >
        {type}
      </p>

      <div
        className={cn(
          "relative flex h-full flex-col items-center overflow-visible rounded-2xl bg-muted duration-300 hover:scale-105",
          compact ? "border-2 p-0.5" : "border-4 p-1",
          "border-black",
          // green offset box shadow
          "before:absolute before:-z-10 before:content-['']",
          "before:inset-0 before:rounded-2xl before:bg-[#7DC242]",
          "before:translate-x-1.5 before:translate-y-1.5",
        )}
      >
        <Link to={link} className="absolute inset-0 z-10" />
        <div className={cn("overflow-hidden rounded-2xl", compact ? "h-[120px] w-[98%] sm:h-[170px] sm:w-[98%]" : "h-5/6 w-full")}>
          <img src={image} alt="Company Logo" className={cn("h-full w-full rounded-2xl object-fill", compact ? "p-0" : "")} />
        </div>
        {/* text smaller on mobile when compact */}
        <p className={cn("pb-4 pt-4 text-center font-redhat font-semibold", compact ? "text-base sm:text-3xl" : "text-3xl")}>{companyName}</p>

        {type in typeStyles && (
          <img
            src={typeStyles[type].src}
            alt={`${type} Icon`}
            className={cn(
              "absolute left-0 top-0 -translate-x-1/2",
              typeStyles[type].size,
              compact ? "h-10 sm:h-[40%]" : typeStyles[type].size,
              typeStyles[type].translateY,
              typeStyles[type].rotate ?? "",
            )}
          />
        )}
      </div>
    </div>
  );
};

export default SponsorCard;
