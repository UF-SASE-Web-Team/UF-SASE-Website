import { imageUrls } from "@assets/imageUrls";
import JustinDoan from "@assets/board/JustinDoan.jpg"
import LeannTang from "@assets/board/LeannTang.jpg"
import ManavSanghvi from "@assets/board/ManavSanghvi.jpg"

const MentorshipIcon = imageUrls["MentorshipIcon.png"];
const MentorshipPhoto = imageUrls["MentorshipValues.jpeg"];
const ProfDevIcon = imageUrls["ProfDevValueIcon.png"];
const ProfDevPhoto = imageUrls["ProfDevValue.jpg"];
const ServiceIcon = imageUrls["ServiceIcon.png"];
const ServicePhoto = imageUrls["ServiceValue.jpg"];
const SocialsIcon = imageUrls["SocialsIcon.png"];
const SocialsPhoto = imageUrls["SocialsValue.jpg"];
const SportsIcon = imageUrls["SportsValueIcon.png"];
const SportsPhoto = imageUrls["SportsValue.jpg"];

export const Values: Array<{
  img: string;
  icon: string;
  value: string;
  text: string;
}> = [
  {
    img: ProfDevPhoto,
    icon: ProfDevIcon,
    value: "Professional Development",
    text: "Through our meetings, conferences, and events, we shape skills that will help our members succeed in the professional world.",
  },
  {
    img: MentorshipPhoto,
    icon: MentorshipIcon,
    value: "Mentorship",
    text: "To ensure each member has the personal and academic guidance they need, we organize a semesterly mentorship program. Keep an eye on our Instagram to apply!",
  },
  {
    img: ServicePhoto,
    icon: ServiceIcon,
    value: "Service",
    text: "We believe that it is important to make meaningful contributions to the community, so we organize service events for our members to join.",
  },
  {
    img: SocialsPhoto,
    icon: SocialsIcon,
    value: "Socials",
    text: "We host multiple social events throughout the year, including a semesterly banquet, that give our members a chance to bond.",
  },
  {
    img: SportsPhoto,
    icon: SportsIcon,
    value: "Sports",
    text: "We have a year-round intramural sports program with 10+ different sports that members can participate in. No experience required!",
  },
];

export const Missions: Array<{
  image: string;
  mission: string;
  text: string;
  shadow: "green" | "blue";
}> = [
  {
    image: imageUrls["Briefcase.png"],
    mission: "Professional Development",
    text: "To prepare Asian heritage students for success in the transnational, global business world.",
    shadow: "green",
  },
  {
    image: imageUrls["People.png"],
    mission: "Diversity",
    text: "To promote diversity and tolerance on campuses and in the workplace.",
    shadow: "blue",
  },
  {
    image: imageUrls["Lightbulb.png"],
    mission: "Community",
    text: "To provide opportunities for its members to make contributions to their local communities.",
    shadow: "green",
  },
];

export const People: Array<{
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
    quote: "The SASE community is incredible 😄",
    fontColor: "blue",
    mobileAlignment: "left",
  },
];
