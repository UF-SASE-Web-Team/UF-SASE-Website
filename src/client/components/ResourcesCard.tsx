import React from "react";

export interface ResourceCardProps {
  title: string;
  description: string;
  link: string;
  icon?: JSX.Element;
  shadowColor?: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ description, icon, link, shadowColor, title }) => {
  return (
    <div className="relative mb-14 w-full max-w-md p-5 font-redhat">
      {/* Wrap entire card in anchor to make the whole card clickable */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`relative flex flex-col rounded-3xl border-2 border-foreground bg-background p-12 ${shadowColor || ""} transition duration-300 hover:scale-105`}
      >
        {/* Title & Icon Row */}
        <div className="flex w-full items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          {icon}
        </div>

        {/* Description */}
        <p className="mt-4 text-left font-semibold text-foreground">{description}</p>
      </a>
    </div>
  );
};

export default ResourceCard;
