import BoardPic2 from "@assets/board/23-24Board.jpg";
import BoardPic1 from "@assets/board/24-25Board.jpg";

export type PastBoardSlide = {
  src: string;
  year: string;
};

const PastBoardImages = [
  {
    program: "Past Board",
    images: [
      { src: BoardPic1, year: "2024–25" },
      { src: BoardPic2, year: "2023–24" },
    ],
  },
];

export default PastBoardImages;
