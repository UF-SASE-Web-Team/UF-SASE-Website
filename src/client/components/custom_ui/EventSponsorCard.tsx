import { cn } from "@/shared/utils";

interface EventSponsorCardProps {
  companyName: string;
  image: string;
  link: string;
  mobileVariant?: "default" | "compact";
  indexSizing?: boolean;
}

const EventSponsorCard = ({ companyName, image, indexSizing: _indexSizing = false, link, mobileVariant = "default" }: EventSponsorCardProps) => {
  const compact = mobileVariant === "compact";

  return (
    <div className="align-items flex h-full w-full flex-col justify-center rounded-2xl bg-white" style={{ zIndex: 10 }}>
      <div className="relative aspect-square w-full">
        <a href={link} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10" />

        {/* Logo area */}
        <div className="flex h-full w-full items-center justify-center overflow-hidden p-4">
          <img src={image} alt={companyName + " Logo"} className={cn("max-h-full max-w-full object-contain", compact && "object-contain")} />
        </div>
      </div>
    </div>
  );
};

export default EventSponsorCard;
