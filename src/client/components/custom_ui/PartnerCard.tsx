import { cn } from "@/shared/utils";
import { Link } from "@tanstack/react-router";

interface SponsorStyle {
  src: string;
  size: string;
  translateY: string;
  rotate?: string;
}

interface SponsorCardProps {
  companyName: string;
  image: string;
  link: string;
  shadowcolor: string;
  mobileVariant?: "default" | "compact";
  indexSizing?: boolean;
}

const SponsorCard = ({ companyName, image, indexSizing = false, link, mobileVariant = "default", shadowcolor: _shadowcolor }: SponsorCardProps) => {
  const compact = mobileVariant === "compact";

  return (
    <div className="flex h-full w-full flex-col" style={{ zIndex: 10 }}>
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
        <div className="aspect-3/2 my-auto w-full overflow-hidden rounded-2xl">
          <img src={image} alt="Company Logo" className={cn("my-auto h-full w-full rounded-2xl", (compact || indexSizing) && "object-contain")} />
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
      </div>
    </div>
  );
};

export default SponsorCard;
