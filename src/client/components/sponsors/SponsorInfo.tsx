import { imageUrls } from "@assets/imageUrls";
import { image } from "d3";

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
    image: imageUrls["SandiaLogo.jpg"],
    shadow_color: "shadow-[#FFD700]",
    link: "https://www.sandia.gov/",
  },
  {
    company: "ExxonMobil",
    tier: "Bronze",
    image: imageUrls["ExxonMobilLogo.png"],
    shadow_color: "shadow-[#CD7F32]",
    link: "https://corporate.exxonmobil.com/",
  },
  {
    company: "P&G",
    tier: "Bronze",
    image: imageUrls["P&GLogo.jpeg"],
    shadow_color: "shadow-[#CD7F32]",
    link: "https://us.pg.com/",
  },
];

export default SponsorInfo;
