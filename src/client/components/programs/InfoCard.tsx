import { useIsMobile } from "@/client/hooks/useIsMobile";
import { cn } from "@/shared/utils";
import React from "react";

interface SimpleCardProps {
  text: React.ReactNode;
}

const InfoCard: React.FC<SimpleCardProps> = ({ text }) => {
  const isMobile = useIsMobile();

  return (
    <div className="relative mx-auto w-full max-w-4xl font-redhat">
      {/* Gradient Border Background */}
      <div className="ombre-background rounded-2xl p-2">
        <div className="flex flex-col items-center rounded-2xl bg-muted p-4">
          {/* Text Content */}
          <div className="flex flex-col justify-between">
            <p className={cn({ "text-sm": isMobile, "text-lg": !isMobile })}>{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
