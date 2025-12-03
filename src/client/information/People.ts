import JustinDoan from "@assets/board/JustinDoan.jpg";
import LeannTang from "@assets/board/LeannTang.jpg";
import ManavSanghvi from "@assets/board/ManavSanghvi.jpg";
import AadithiArjun from "@assets/webdev/AadithiArjun.jpg";
import GurleenDhillon from "@assets/webdev/GurleenDhillon.jpeg";
import HelenZou from "@assets/webdev/HelenZou.png";
import JordanKusuda from "@assets/webdev/JordanKusuda.jpeg";
import JuliaLe from "@assets/webdev/JuliaLe.jpeg";
import KenzoFukuda from "@assets/webdev/KenzoFukuda.jpg";
import LynetteHemingway from "@assets/webdev/LynetteHemingway.png";
import MarenHeck from "@assets/webdev/MarenHeck.jpeg";
import RickyZhang from "@assets/webdev/RickyZhang.jpg";
import RJTabelon from "@assets/webdev/RJTabelon.jpeg";
import StephanieFong from "@assets/webdev/StephanieFong.png";
import ThuyLe from "@assets/webdev/ThuyLe.png";
import VincentLin from "@assets/webdev/VincentLin.jpeg";

export const PIEBoard: Array<{
  fullName: string;
  position: string;
  image: string;
  quote?: string;
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
    quote: "The SASE community is incredible 😄",
    fontColor: "blue",
    mobileAlignment: "left",
  },
];

export const Webmasters: Array<{
  team: "Current" | "Past";
  information: Array<{
    name: string;
    image: string;
    quote: string;
    year: string;
    textColor: "green" | "blue";
    mobileAlign: "left" | "right";
  }>;
}> = [
  {
    team: "Current",
    information: [
      {
        name: "Thuy Le",
        image: ThuyLe,
        quote: "SWT is sweet",
        year: "2025-26",
        textColor: "green",
        mobileAlign: "left",
      },
      {
        name: "Lynette Hemingway",
        image: LynetteHemingway,
        quote: "...sandwiches",
        year: "2025-26",
        textColor: "blue",
        mobileAlign: "right",
      },
    ],
  },
  {
    team: "Past",
    information: [
      {
        name: "Ricky Zhang",
        image: RickyZhang,
        quote: "",
        year: "2024-25",
        textColor: "blue",
        mobileAlign: "left",
      },
      {
        name: "Gurleen Dhillon",
        image: GurleenDhillon,
        quote: "",
        year: "2023-24",
        textColor: "green",
        mobileAlign: "right",
      },
      {
        name: "Maren Heck",
        image: MarenHeck,
        quote: "",
        year: "2022-23",
        textColor: "blue",
        mobileAlign: "left",
      },
      {
        name: "Julia Le",
        image: JuliaLe,
        quote: "",
        year: "2021-22",
        textColor: "green",
        mobileAlign: "right",
      },
    ],
  },
];

export const SWTTeamLeads: Array<{
  team: "Website" | "Semester Project";
  information: Array<{
    name: string;
    image: string;
    quote: string;
    role: string;
    mobileAlign: "left" | "right";
    mobileColor: "blue" | "green";
  }>;
}> = [
  {
    team: "Website",
    information: [
      {
        name: "Stephanie Fong",
        image: StephanieFong,
        quote: "food, family, friends, front-end",
        role: "Frontend",
        mobileAlign: "left",
        mobileColor: "green",
      },
      {
        name: "RJ Tabelon",
        image: RJTabelon,
        quote: "Lynette thinks we're doing quotes together",
        role: "Backend",
        mobileAlign: "right",
        mobileColor: "blue",
      },
      {
        name: "Helen Zou",
        image: HelenZou,
        quote: "herm",
        role: "UI/UX",
        mobileAlign: "left",
        mobileColor: "green",
      },
    ],
  },
  {
    team: "Semester Project",
    information: [
      {
        name: "Kenzo Fukuda",
        image: KenzoFukuda,
        quote: "skating into the codebase",
        role: "Frontend & UI/UX",
        mobileAlign: "left",
        mobileColor: "green",
      },
      {
        name: "Aadithi Arjun",
        image: AadithiArjun,
        quote: "it's a moo point",
        role: "Frontend & UI/UX",
        mobileAlign: "right",
        mobileColor: "blue",
      },
      {
        name: "Vincent Lin",
        image: VincentLin,
        quote: "i love my goated swt",
        role: "Backend",
        mobileAlign: "left",
        mobileColor: "green",
      },
      {
        name: "Jordan Kusuda",
        image: JordanKusuda,
        quote: "Because bread tastes better than key",
        role: "Backend",
        mobileAlign: "right",
        mobileColor: "blue",
      },
    ],
  },
];
