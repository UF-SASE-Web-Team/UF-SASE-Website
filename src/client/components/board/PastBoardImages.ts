import { imageUrls } from "@assets/imageUrls";

export type PastBoardSlide = {
  src: string;
  year: string;
};

const PastBoardImages = [
  {
    program: "Past Board",
    images: [
      { src: imageUrls["24-25Board.jpg"], year: "2024–25" },
      { src: imageUrls["23-24Board.jpg"], year: "2023–24" },
    ],
  },
];

export default PastBoardImages;
