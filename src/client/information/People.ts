import JustinDoan from "@assets/board/JustinDoan.jpg";
import LeannTang from "@assets/board/LeannTang.jpg";
import ManavSanghvi from "@assets/board/ManavSanghvi.jpg";

export const PIEBoard: Array<{
  fullName: string;
  position: string;
  image: string;
  quote: string;
  fontColor: "green" | "blue";
  mobileAlignment: "left" | "right";
}> = [
  {
    fullName: "Justin Doan",
    position: "President",
    image: JustinDoan,
    quote: "Advance your career with SASE!",
    fontColor: "blue",
    mobileAlignment: "left",
  },
  {
    fullName: "Leann Tang",
    position: "Internal Vice President",
    image: LeannTang,
    quote: "💖⋆˙⟡ I love SASE!! ⋆˙⟡💖",
    fontColor: "green",
    mobileAlignment: "right",
  },
  {
    fullName: "Manav Sanghvi",
    position: "External Vice President",
    image: ManavSanghvi,
    quote: "SASE community's great 😄",
    fontColor: "blue",
    mobileAlignment: "left",
  },
];
