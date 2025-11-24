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
  Diamond: { src: imageUrls["Diamond.png"], size: "w-[30%]", translateY: "-translate-y-1/3", rotate: "rotate-[-15deg]" },
  Gold: { src: imageUrls["Gold.png"], size: "w-[30%]", translateY: "-translate-y-1/3" },
  Silver: { src: imageUrls["Silver.png"], size: "w-[30%]", translateY: "-translate-y-1/3" },
  Bronze: { src: imageUrls["Bronze.png"], size: "w-[30%]", translateY: "-translate-y-1/3" },
};

interface SponsorCardProps {
  companyName: string;
  image: string;
  link: string;
  shadowcolor: string;
  type: SponsorType;
  mobileVariant?: "default" | "compact";
  indexSizing?: boolean;
  location?: "home" | "sponsors";
}

const SponsorCard = ({
  companyName,
  image,
  indexSizing = false,
  link,
  location = "sponsors",
  mobileVariant = "default",
  shadowcolor: _shadowcolor,
  type,
}: SponsorCardProps) => {
  const compact = mobileVariant === "compact";

  return (
    <div className="flex h-full w-full flex-col" style={{ zIndex: 10 }}>
      {/* Tier Label */}
      <p
        className={cn(
          {
            "text-saseBlue": type === "Diamond",
            "text-amber-300": type === "Gold",
            "text-slate-400": type === "Silver",
            "text-amber-700": type === "Bronze",
            "text-2xl": compact && location == "home",
            "text-3xl": !compact && location == "home",
            "text-5xl": location != "home",
          },
          "w-full pb-4 text-center font-redhat font-semibold",
        )}
      >
        {type}
      </p>

      {/* Main Card with solid opaque shadow */}
      <div
        className={cn(
          "relative isolate flex h-full flex-col items-center rounded-2xl border-foreground bg-muted duration-300 hover:scale-105",
          // solid green shadow
          "shadow-[4px_4px_0_#7DC242]",
          "sm:shadow-[5px_5px_0_#7DC242] md:shadow-[6px_6px_0_#7DC242]",
          compact ? "border-2" : "border-4",
        )}
      >
        <Link to={link} className="absolute inset-0 z-10" />

        {/* Logo area */}
        <div className="aspect-3/2 w-full overflow-hidden rounded-2xl">
          <img src={image} alt="Company Logo" className={cn("h-full w-full rounded-2xl", (compact || indexSizing) && "object-contain")} />
        </div>

        {/* Company name */}
        <p
          className={cn(
            "text-center font-redhat font-semibold",
            compact ? "pb-3 pt-3 text-base sm:text-3xl" : indexSizing ? "pb-3 pt-3 text-2xl sm:text-3xl" : "pb-4 pt-4 text-3xl",
          )}
        >
          {companyName}
        </p>

        {/* Tier icon */}
        {type in typeStyles && (
          <img
            src={typeStyles[type].src}
            alt={`${type} Icon`}
            className={cn(
              "absolute left-0 top-0 -translate-x-1/2",
              typeStyles[type].size,
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
