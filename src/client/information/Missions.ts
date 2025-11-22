import { imageUrls } from "@assets/imageUrls";

export const Missions: Array<{
  image: string;
  mission: string;
  homeText: string;
  aboutText: string;
  shadow: "green" | "blue";
}> = [
  {
    image: imageUrls["Briefcase.png"],
    mission: "Professional Development",
    homeText: "To prepare Asian heritage students for success in the transnational, global business world",
    aboutText: "Are able to help each other develop professionally, foster leadership skills, and excel academically",
    shadow: "green",
  },
  {
    image: imageUrls["People.png"],
    mission: "Diversity",
    homeText: "To promote diversity and tolerance on campuses and in the workplace",
    aboutText: "Learn and understand how their own culture affects the workplace",
    shadow: "blue",
  },
  {
    image: imageUrls["Lightbulb.png"],
    mission: "Community",
    homeText: "To provide opportunities for its members to make contributions to their local communities.",
    aboutText: "Actively contribute to the local community",
    shadow: "green",
  },
];