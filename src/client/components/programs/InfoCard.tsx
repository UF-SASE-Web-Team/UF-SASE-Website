import React from "react";
import { useIsMobile } from "@/client/hooks/useIsMobile";
import { cn } from "@/shared/utils";

interface SimpleCardProps {
  text: React.ReactNode;
}

const InfoCard: React.FC<SimpleCardProps> = ({ text }) => {
  const isMobile = useIsMobile();

  return (
    <div className="relative mx-auto w-full max-w-4xl font-redhat">
      {/* Gradient Border Background */}
      <div className="rounded-2xl ombre-background p-2">
        <div className="flex flex-col items-center bg-muted p-4 rounded-2xl">
          {/* Text Content */}
          <div className="flex flex-col justify-between">
            <p className={cn({"text-sm" : isMobile, "text-lg" : !isMobile})}>{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
