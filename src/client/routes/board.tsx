import BoardMemberCard from "@/client/components/board/BoardMemberCard";
import BoardPic from "@assets/board/25-26Board.jpg";
import { imageUrls } from "@assets/imageUrls";
import boardInfo from "@components/board/BoardInfo";
import { OmbreDivider } from "@components/custom_ui/OmbreDivider";
import { createFileRoute, Link } from "@tanstack/react-router";
import { seo } from "../utils/seo";

export const Route = createFileRoute("/board")({
  meta: () => [
    ...seo({
      title: "Board | UF SASE",
      description: "Executive and chair board members of SASE for the current school year.",
      image: imageUrls["SASELogo.png"],
    }),
  ],
  component: () => {
    return (
      <div className="min-h-screen px-4 py-10">
        {/* title */}
        <div className="text-center">
          <h1 className="header-text ombre-text">BOARD</h1>
          <p className="pb-10 font-oswald text-3xl">Meet our 2025-2026 SASE Board Members!</p>
          <OmbreDivider />
        </div>

        {/* group picture */}
        <div className="my-10 flex justify-center">
          <div className="w-full max-w-5xl overflow-hidden rounded-2xl border-[3px] border-border shadow-[10px_10px_0px_0px_rgb(110,167,211)]">
            <img src={BoardPic} className="w-full" />
          </div>
        </div>
        <hr className="w-7/8 mb-10 mt-16 border-t-2 border-blue-500" />

        {boardInfo.map((section, idx) => (
          <div key={idx} className="mb-10">
            {section.section === "Chair Board" && <hr className="w-7/8 my-10 border-t-2 border-green-500" />}
            <h2 className="subheader-text text-center">{section.section}</h2>

            {/* Centering the grid properly */}
            <div className="flex justify-center">
              <div className="grid max-w-screen-lg grid-cols-1 justify-items-center gap-x-16 gap-y-5 md:grid-cols-3">
                {section.members.map((member, idx) => (
                  <BoardMemberCard key={idx} member={member} />
                ))}
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-center">
          <Link
            to="/past-board"
            className="flex h-10 items-center justify-center whitespace-nowrap rounded-2xl border border-black bg-gradient-to-r from-saseGreen to-white px-6 py-2 font-redhat text-lg italic tracking-wide text-black shadow-[2px_2px_2px_rgba(0,0,0,0.10)] transition duration-300 hover:scale-105"
          >
            Past Board Members
          </Link>
        </div>
      </div>
    );
  },
});
