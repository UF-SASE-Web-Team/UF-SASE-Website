interface Member {
  role: string;
  image: string;
  name: string;
  major: string;
  contact: string;
  description: string;
}

const BoardMemberCard = ({ member }: { member: Member }) => {
  // check if role is single line or not
  const isSingleLine = member.role.length <= 20;

  return (
    <div
      className={`group relative flex w-full max-w-[110%] flex-col items-center p-4 text-center transition-transform duration-500 ease-in-out sm:max-w-[300px] md:max-w-[350px]`}
    >
      {/* role */}
      <p
        className={`mb-3 flex h-[2.5rem] items-center justify-center text-center text-lg font-medium italic leading-tight tracking-wide text-[#0668B3] sm:text-xl md:text-2xl`}
        style={{ paddingTop: isSingleLine ? "0.5rem" : "0" }}
      >
        {member.role}
      </p>

      {/* image */}
      <div
        className={`group relative aspect-square w-full max-w-[300px] transition-transform duration-500 ease-in-out sm:max-w-[300px] md:max-w-[400px]`}
      >
        <div className="absolute inset-0 rounded-[18px] bg-gradient-to-br from-[#0668B3] to-[#7DC242] pt-[0.8rem]" />
        <div className="[0.25vw] absolute inset-[4px] overflow-hidden rounded-[18px] bg-white shadow-[0.6vw_0.6vw_0_rgba(125,194,66,0.6)]">
          <img src={member.image} alt={`${member.name}'s photo`} className="h-full w-full rounded-[18px] object-cover" />
        </div>

        {/*hover overlay*/}
        <div className="absolute inset-[4px] flex items-start justify-center rounded-[18px] bg-white bg-opacity-60 pt-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="text-sm text-black underline sm:text-base md:text-[1rem]">Learn More...</span>
        </div>
      </div>

      {/* name turns invisible on click of learn more */}
      <p className={`mt-3 text-lg text-foreground sm:text-xl md:text-2xl`}>{member.name}</p>
    </div>
  );
};

export default BoardMemberCard;
