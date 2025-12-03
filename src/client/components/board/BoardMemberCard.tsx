interface Member {
  role: string;
  image: string;
  name: string;
  major: string;
  contact: string;
  description: string;
}

const BoardMemberCard = ({ member, pastMember = false }: { member: Member; pastMember?: boolean }) => {
  // check if role is single line or not
  const isSingleLine = member.role.length <= 20;

  return (
    <div className={`group relative flex w-full flex-col items-center text-center transition-transform duration-500 ease-in-out`}>
      {/* role */}
      <p
        className={`mb-3 flex h-[2.5rem] items-center justify-center text-center text-xl font-medium italic leading-tight tracking-wide text-[#0668B3]`}
        style={{ paddingTop: isSingleLine ? "0.5rem" : "0" }}
      >
        {member.role}
      </p>

      {/* image */}
      <div className={`group relative aspect-square w-full overflow-hidden transition-transform duration-500 ease-in-out`}>
        <div className="ombre-background h-full w-full rounded-2xl p-2">
          <img src={member.image} alt={`${member.name}'s photo`} className="h-full w-full rounded-2xl object-cover" />
        </div>

        {/*hover overlay*/}
        {!pastMember ? (
          <div className="absolute inset-[4px] flex items-start justify-center rounded-2xl bg-white bg-opacity-60 pt-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="text-sm text-black underline">Learn More...</span>
          </div>
        ) : null}
      </div>

      <p className={`mt-3 text-xl text-foreground`}>{member.name}</p>
    </div>
  );
};

export default BoardMemberCard;
