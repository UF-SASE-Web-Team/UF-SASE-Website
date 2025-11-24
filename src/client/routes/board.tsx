import BoardMemberCard from "@/client/components/board/BoardMemberCard";
import BoardPic from "@assets/board/25-26Board.jpg";
import { imageUrls } from "@assets/imageUrls";
import boardInfo from "@components/board/BoardInfo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { seo } from "../utils/seo";
import { OmbreDivider } from "@components/custom_ui/OmbreDivider";

interface Member {
  role: string;
  image: string;
  name: string;
  major: string;
  contact: string;
  description: string;
}

export const Route = createFileRoute("/board")({
  meta: () => [
    ...seo({
      title: "Board | UF SASE",
      description: "Executive and chair board members of SASE for the current school year.",
      image: imageUrls["SASELogo.png"],
    }),
  ],
  component: () => {
    const [openMember, setOpenMember] = useState<Member | null>(null);
    useEffect(() => {
      applyOmbreDivider();
    }, []);
    return (
      <div className="min-h-screen px-4 py-10">
        {/* title */}
        <div className="text-center">
          <h1 className="header-text ombre-text">BOARD</h1>
          <p className="font-oswald text-3xl pb-10">Meet our 2025-2026 SASE Board Members!</p>
          <OmbreDivider/>
        </div>

        {/* group picture */}

        <div className="mb-16 mt-10 flex justify-center font-[Poppins]">
          {/*Gradient/shadow*/}
          <div className="relative w-full max-w-5xl">
            <div className="pointer-events-none absolute inset-0 translate-x-4 translate-y-4 rounded-2xl bg-gradient-to-tr from-[#7DC242] to-[#0668B3] opacity-75" />
            <div className="relative overflow-hidden rounded-2xl border-[2px] border-border bg-black">
              <img src={BoardPic} className="block h-auto w-full" />
            </div>
            <img
              src="https://moqsegbvdj.ufs.sh/f/2ipokchyMOTKKkbiQJRau5S173OCZMnlcgUAzrajkIEisoLt"
              alt="Gear Logo"
              className="w-50 absolute bottom-[-79px] right-[-105px] hidden drop-shadow-lg md:block"
            />
          </div>
        </div>
        <hr className="w-7/8 mb-10 mt-16 border-t-2 border-blue-500" />

        {boardInfo.map((section, idx) => (
          <div key={idx} className="mb-10">
            {section.section === "Chair Board" && <hr className="w-7/8 my-10 border-t-2 border-green-500" />}
            <h2 className="text-center subheader-text">{section.section}</h2>

            {/* Centering the grid properly */}
            <div className="flex justify-center">
              <div className="grid max-w-screen-lg grid-cols-1 justify-items-center gap-x-16 gap-y-5 md:grid-cols-3">
                {section.members.map((member, idx) => (
                  <div
                    key={idx}
                    id={`member-${member.name}`}
                    className="flex aspect-square w-full max-w-[300px] cursor-pointer items-center justify-center"
                    onClick={() => setOpenMember(member)}
                  >
                    <BoardMemberCard member={member} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {openMember && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[1px] md:items-center"
            onClick={() => {
              const name = openMember?.name;
              setOpenMember(null);

              requestAnimationFrame(() => {
                setTimeout(() => {
                  const target = document.getElementById(`member-${name}`);
                  if (target) {
                    target.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                  }
                }, 200);
              });
            }}
          >
            <div
              className="relative mx-auto w-[min(95vw,1100px)] rounded-2xl border border-black/5 bg-white p-4 shadow-[0_15px_40px_rgba(0,0,0,0.2)] sm:p-6 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  const name = openMember?.name;
                  setOpenMember(null);

                  requestAnimationFrame(() => {
                    setTimeout(() => {
                      const target = document.getElementById(`member-${name}`);
                      if (target) {
                        target.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                      }
                    }, 200);
                  });
                }}
                className="absolute right-3 top-3 rounded-full p-2 text-black/60 hover:bg-black/5"
              >
                ×
              </button>

              <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[1fr_340px] md:gap-8">
                <div>
                  <p className="font-oswald text-xl font-semibold text-[#0668B3] md:text-2xl">{openMember.role}</p>
                  <p className="mt-1 font-oswald text-lg font-semibold md:text-xl">{openMember.name}</p>
                  {openMember.major && <p className="font-redhat text-base italic text-black">{openMember.major}</p>}
                  {openMember.contact && (
                    <p className="mt-1 text-sm md:text-base">
                      <a className="font-oswald text-lg text-[#0668B3]" href={`mailto:${openMember.contact}`}>
                        {openMember.contact}
                      </a>
                    </p>
                  )}
                  <div className="mt-4 space-y-2 font-redhat text-sm leading-relaxed md:mt-6 md:text-base">
                    {openMember.description?.split("\n").map((p, i) => <p key={i}>{p}</p>)}
                  </div>
                </div>

                <div className="relative aspect-square w-full max-w-[340px] justify-self-center">
                  <div className="absolute inset-0 rounded-[22px] bg-gradient-to-br from-[#0668B3]/90 to-[#7DC242]/90" />
                  <div className="bg-white] absolute inset-[6px] overflow-hidden rounded-[18px]">
                    <img src={openMember.image} alt={`${openMember.name}'s photo`} className="h-full w-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-center">
          <Link
            to="/past-board"
            className="font-redhat flex h-10 items-center justify-center whitespace-nowrap rounded-2xl border border-black bg-gradient-to-r from-saseGreen to-white px-6 py-2 text-lg italic tracking-wide text-black shadow-[2px_2px_2px_rgba(0,0,0,0.10)] transition duration-300 hover:scale-105"
          >
            Past Board Members
          </Link>
        </div>
      </div>
    );
  },
});
