import { imageUrls } from "@assets/imageUrls";

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
    image: imageUrls["JustinDoan.jpg"],
    quote: "Advance your career with SASE!",
    fontColor: "blue",
    mobileAlignment: "left",
  },
  {
    fullName: "Leann Tang",
    position: "Internal Vice President",
    image: imageUrls["LeannTang.jpg"],
    quote: "💖⋆˙⟡ I love SASE!! ⋆˙⟡💖",
    fontColor: "green",
    mobileAlignment: "right",
  },
  {
    fullName: "Manav Sanghvi",
    position: "External Vice President",
    image: imageUrls["ManavSanghvi.jpg"],
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
        image: imageUrls["ThuyLe.png"],
        quote: "SWT is sweet",
        year: "2025-26",
        textColor: "green",
        mobileAlign: "left",
      },
      {
        name: "Lynette Hemingway",
        image: imageUrls["LynetteHemingway.png"],
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
        image: imageUrls["RickyZhang.jpg"],
        quote: "",
        year: "2024-25",
        textColor: "blue",
        mobileAlign: "left",
      },
      {
        name: "Gurleen Dhillon",
        image: imageUrls["GurleenDhillon.jpeg"],
        quote: "",
        year: "2023-24",
        textColor: "green",
        mobileAlign: "right",
      },
      {
        name: "Maren Heck",
        image: imageUrls["MarenHeck.jpeg"],
        quote: "",
        year: "2022-23",
        textColor: "blue",
        mobileAlign: "left",
      },
      {
        name: "Julia Le",
        image: imageUrls["JuliaLe.jpeg"],
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
        image: imageUrls["StephanieFong.png"],
        quote: "food, family, friends, front-end",
        role: "Frontend",
        mobileAlign: "left",
        mobileColor: "green",
      },
      {
        name: "RJ Tabelon",
        image: imageUrls["RJTabelon.jpeg"],
        quote: "Lynette thinks we're doing quotes together",
        role: "Backend",
        mobileAlign: "right",
        mobileColor: "blue",
      },
      {
        name: "Jiexi",
        image: imageUrls["Jiexi.jpg"],
        quote: "cool quote coming soon",
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
        image: imageUrls["KenzoFukuda.jpeg"],
        quote: "skating into the codebase",
        role: "Frontend",
        mobileAlign: "left",
        mobileColor: "green",
      },
      {
        name: "Helen Zou",
        image: imageUrls["HelenZou.png"],
        quote: "herm",
        role: "Frontend",
        mobileAlign: "left",
        mobileColor: "green",
      },
      {
        name: "Jonathan Tang",
        image: imageUrls["JonathanTang.png"],
        quote: "SWT 是第一!",
        role: "Backend",
        mobileAlign: "left",
        mobileColor: "green",
      },
      {
        name: "Grace Zhao",
        image: imageUrls["GraceZhao.jpg"],
        quote: "Figma <3",
        role: "UI/UX",
        mobileAlign: "right",
        mobileColor: "blue",
      },
    ],
  },
];
