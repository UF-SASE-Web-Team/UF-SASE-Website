import React, { useState } from "react";

interface Member {
  role: string;
  image: string;
  name: string;
  major: string;
  contact: string;
  description: string;
}

const BoardMemberCard = ({ member }: { member: Member }) => {
  const [isExpanded, setExpanded] = useState(false);

  const handleToggleExpand = () => {
    setExpanded(!isExpanded);
  };

  // check if role is single line or not
  const isSingleLine = member.role.length <= 20;

  return (
    <div
      className={`group relative flex flex-col items-center p-4 text-center transition-transform duration-500 ease-in-out ${isExpanded ? "scale-105 cursor-default" : "scale-100 cursor-pointer"} w-full max-w-[110%] sm:max-w-[300px] md:max-w-[350px]`}
      onClick={() => !isExpanded && handleToggleExpand()}
    >
      {/* role */}
      <p
        className={`my-2 flex h-10 w-48 items-center justify-center whitespace-nowrap text-center ${isExpanded ? "invisible" : "font-medium italic text-blue-500"} text-base sm:text-lg md:text-2xl`}
        style={{ paddingTop: isSingleLine ? "0.5rem" : "0" }}
      >
        {member.role}
      </p>

      {/* image */}
      <div
        className={`relative overflow-hidden rounded-2xl border-[0.15vw] border-black shadow-[0.5vw_0.5vw_0px_0px_rgb(61,137,196)] transition-transform duration-500 ease-in-out ${
          isExpanded ? "scale-110" : "scale-100"
        } aspect-square w-full max-w-[300px] sm:max-w-[300px] md:max-w-[400px]`}
        onClick={handleToggleExpand}
      >
        <img src={member.image} alt={`${member.name}'s photo`} className="h-full w-full object-cover" />

        {/* learn more */}
        {!isExpanded && (
          <div className="absolute inset-0 flex items-start justify-center bg-white bg-opacity-60 p-[1vw] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="text-base font-semibold text-black underline sm:text-lg md:text-xl">Learn More</span>
          </div>
        )}

        {isExpanded && (
          <div
            className="scrollbar-thinner absolute inset-0 flex cursor-pointer flex-col overflow-y-auto bg-background bg-opacity-95 p-[1vw] pt-[0.5vw] transition-opacity duration-500 ease-in-out"
            onClick={() => setExpanded(false)}
          >
            {/* expanded content */}
            <div className="mt-[1.5vw] cursor-pointer text-left" onClick={(e) => e.stopPropagation()}>
              <h3 className="cursor-pointer text-base font-bold sm:text-lg md:text-xl" onClick={() => setExpanded(false)}>
                {member.role}
              </h3>
              <h4 className="cursor-pointer text-sm font-semibold sm:text-base md:text-lg" onClick={() => setExpanded(false)}>
                {member.name}
              </h4>
              <p className="cursor-pointer text-xs text-black dark:text-saseGray sm:text-sm md:text-base" onClick={() => setExpanded(false)}>
                {member.major}
              </p>
              <a
                href={`mailto:${member.contact}`}
                className="cursor-pointer text-xs text-blue-500 underline sm:text-sm md:text-base"
                onClick={(e) => e.stopPropagation()}
              >
                {member.contact}
              </a>
              <p
                className="mt-[1vw] cursor-pointer text-xs text-black dark:text-saseGray sm:text-xs md:text-xs"
                onClick={() => setExpanded(false)}
                style={{ marginTop: "1vw" }}
              >
                {member.description}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* name turns invisible on click of learn more */}
      <p className={`mt-[1.5vw] text-base sm:text-lg md:text-2xl ${isExpanded ? "invisible" : "text-foreground"}`}>{member.name}</p>
    </div>
  );
};

export default BoardMemberCard;
