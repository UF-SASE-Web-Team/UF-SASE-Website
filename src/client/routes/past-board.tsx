import BoardMemberCard from "@/client/components/board/BoardMemberCard";
import PastBoardDropDown from "@/client/components/board/PastBoardDropDown";
import { imageUrls } from "@assets/imageUrls";
import pastBoardInfo from "@components/board/PastBoardInfo";
import Carousel from "@components/carousel/Carousel";
import { OmbreDivider } from "@components/custom_ui/OmbreDivider";
import { createFileRoute, Link } from "@tanstack/react-router";
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
    return (
      <div className="flex min-h-screen flex-col items-center px-4 py-10">
        <div className="text-center">
          <h1 className="header-text ombre-text">PAST BOARD</h1>
          <p className="pb-10 font-oswald text-3xl">Meet our past Board Members from previous years!</p>
        </div>

        <OmbreDivider />
        <div className="mb-8 mt-10 flex justify-center font-[Poppins]">
          <Carousel purpose="Images" prog="Past Board" />
        </div>
        <OmbreDivider />

        <PastBoardDropDown title="2024-25">
          {pastBoardInfo.map((section, idx) => (
            <div key={idx} className="mb-12">
              <h2 className="text-center font-oswald text-3xl font-semibold">{section.section}</h2>
              <div className="flex justify-center">
                <div className="grid max-w-screen-lg grid-cols-1 justify-items-center gap-x-16 gap-y-5 md:grid-cols-3">
                  {section.members.map((member, idx) => (
                    <BoardMemberCard key={idx} member={member} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </PastBoardDropDown>

        <div className="flex justify-center">
          <Link
            to="/board"
            className="flex h-9 w-40 items-center justify-center whitespace-nowrap rounded-xl border border-black bg-gradient-to-r from-saseGreen to-white px-6 py-2 text-xs italic tracking-wide text-black shadow-[2px_2px_2px_rgba(0,0,0,0.10)] transition duration-300 hover:scale-105 sm:h-10 sm:w-60 sm:px-7 sm:text-[18px]"
          >
            CURRENT BOARD
          </Link>
        </div>
      </div>
    );
  },
});
