import { imageUrls } from "@assets/imageUrls";
import ExxonMobilLogo from "@assets/other/ExxonMobilLogo.png";
import ProctorGambleLogo from "@assets/other/P&GLogo.jpeg";

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
    image: ExxonMobilLogo,
    shadow_color: "shadow-[#CD7F32]",
    link: "https://corporate.exxonmobil.com/",
  },
  {
    company: "P&G",
    tier: "Bronze",
    image: ProctorGambleLogo,
    shadow_color: "shadow-[#CD7F32]",
    link: "https://us.pg.com/",
  },
];

export default SponsorInfo;
