import { imageUrls } from "@assets/imageUrls";

const SponsorInfo = [
  {
    company: "Blue Origin",
    tier: "Diamond",
    image: imageUrls["BlueOriginLogo.png"],
    shadow_color: "shadow-blue-500",
    link: "https://www.blueorigin.com/",
  },
  {
    company: "Sandia",
    tier: "Silver",
    image: "@assets/other/SandiaLogo.jpg",
    shadow_color: "shadow-[#FFD700]",
    link: "https://www.sandia.gov/",
  },
  {
    company: "ExxonMobil",
    tier: "Bronze",
    image: "@assets/other/ExxonMobilLogo.png",
    shadow_color: "shadow-[#CD7F32]",
    link: "https://corporate.exxonmobil.com/",
  },
  {
    company: "P&G",
    tier: "Bronze",
    image: "@assets/other/P&GLogo.jpg",
    shadow_color: "shadow-[#CD7F32]",
    link: "https://us.pg.com/",
  },
];

export default SponsorInfo;
