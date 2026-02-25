import { cn } from "@/shared/utils";
import { Link } from "@tanstack/react-router";

interface HackathonCardProps {
  companyName: string;
  image: string;
  link: string;
  mobileVariant?: "default" | "compact";
  indexSizing?: boolean;
}

const HackathonCard = ({ companyName, image, indexSizing = false, link, mobileVariant = "default" }: HackathonCardProps) => {
  const compact = mobileVariant === "compact";

  return (
    <div className="align-items flex h-full w-full flex-col justify-center rounded-2xl bg-white" style={{ zIndex: 10 }}>
      <div>
        <Link to={link} className="absolute inset-0 z-10" />

        {/* Logo area */}
        <div className="w-full overflow-hidden">
          <img src={image} alt={companyName + " Logo"} className={cn("h-full w-full", (compact || indexSizing) && "object-contain")} />
        </div>
      </div>
    </div>
  );
};

export default HackathonCard;
