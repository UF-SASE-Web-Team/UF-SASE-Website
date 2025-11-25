import { imageUrls } from "@assets/imageUrls";

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
