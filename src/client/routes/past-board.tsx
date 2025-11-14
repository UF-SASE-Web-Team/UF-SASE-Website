import BoardMemberCard from "@/client/components/board/BoardMemberCard";
import PastBoardDropDown from "@/client/components/board/PastBoardDropDown";
import BoardPic from "@assets/board/24-25Board.jpg";
import { imageUrls } from "@assets/imageUrls";
import pastBoardInfo from "@components/board/PastBoardInfo";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { applyOmbreDivider } from "../utils/ombre-divider";
import { seo } from "../utils/seo";

export const Route = createFileRoute("/past-board")({
  meta: () => [
    ...seo({
      title: "Past Board | UF SASE",
      description: "Past executive and chair board members of SASE.",
      image: imageUrls["SASELogo.png"],
    }),
  ],
  component: () => {
    useEffect(() => {
      applyOmbreDivider();
    }, []);
    return (
      <div className="min-h-screen px-4 py-8 font-[Poppins] md:px-16">
        <div className="text-center">
          <h1 className="font-oswald text-5xl font-medium sm:text-6xl md:text-7xl">PAST BOARD</h1>
          <p className="mb-8 mt-8 text-lg text-foreground sm:text-xl md:text-2xl">Meet our past Board Members from previous years!</p>
          <hr className="w-7/8 mx-auto my-4 border-t-2 border-green-500" />
        </div>

        <div className="mb-8 mt-10 flex justify-center font-[Poppins]">
          <div className="w-full max-w-5xl overflow-hidden rounded-2xl border-[3px] border-border shadow-[10px_10px_0px_0px_rgb(110,167,211)]">
            <img src={BoardPic} className="w-full" />
          </div>
        </div>
        <div className="text-center">
          <p className="mb-8 mt-8 text-lg italic text-foreground sm:text-xl md:text-2xl">2024-25</p>
          <hr className="w-7/8 mb-10 mt-16 border-t-2 border-blue-500" />
        </div>
        <PastBoardDropDown title="2024-25">
          {pastBoardInfo.map((section, idx) => (
            <div key={idx} className="mb-12">
              <h2 className="mb-6 text-center font-oswald text-3xl sm:text-4xl md:text-5xl">{section.section}</h2>
              <div className="flex justify-center">
                <div className="grid max-w-screen-lg grid-cols-2 justify-items-center gap-x-10 gap-y-12 sm:grid-cols-2 md:grid-cols-3">
                  {section.members.map((member, idx) => (
                    <BoardMemberCard key={idx} member={member} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </PastBoardDropDown>
      </div>
    );
  },
});
