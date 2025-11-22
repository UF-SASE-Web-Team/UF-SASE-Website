import { imageUrls } from "@/client/assets/imageUrls";
import InternsCard from "@assets/programs/SaseInternsCard.png";
import SaseSportsCard from "@assets/programs/SaseSportsCard.png";
import SetCard from "@assets/programs/SetCard.png";
import WebDevCard from "@assets/programs/WebDevCard.png";

export const GeneralProgramsInfo: Array<{ program: string; description: string | React.ReactNode; image: string; link: string; number: string }> = [
  {
    program: "SASE Interns",
    description: (
      <p>
        <span className="font-semibold text-saseBlue">SASE Interns</span> collaborate directly with board members in committees to plan events for the
        SASE community. Interns gain a behind-the-scenes look at how SASE operates and, in the process, are given the opportunity to develop their
        professional and leadership skill
      </p>
    ),
    image: InternsCard,
    link: "/interns",
    number: "1",
  },
  {
    program: "SASE Engineering Team (SET)",
    description: (
      <p>
        The <span className="font-semibold text-saseGreen">SASE Engineering Team</span> works together on a year-long project to explore technical
        creativity and problem-solving. Members gain hands-on experience, sharpen engineering and collaboration skills, and build impactful projects
        while growing in a supportive team environment.
      </p>
    ),
    image: SetCard,
    link: "/set",
    number: "2",
  },
  {
    program: "SASE Web Team (SWT)",
    description: (
      <p>
        The <span className="font-semibold text-saseBlue">SASE Web Development Team</span> brings together UI/UX, Frontend, and Backend members to
        develop and enhance the UF SASE website. Team members gain hands-on experience with agile workflows and collaborate to create a self-hosted
        platform, sharpening technical and teamwork skills along the way.
      </p>
    ),
    image: WebDevCard,
    link: "/webdev",
    number: "3",
  },
  {
    program: "Intramural Sports",
    description: (
      <p>
        <span className="font-semibold text-saseGreen">SASE Intramurals</span> offer sports like Volleyball, Soccer, Basketball, Ultimate Frisbee, and
        Pickleball year-round. It’s a fun way to meet new people, stay active, and enjoy friendly competition—no experience needed!
      </p>
    ),
    image: SaseSportsCard,
    link: "/sports",
    number: "4",
  },
  {
    program: "Mentor-Mentee",
    description: (
      <p>
        SASE's <span className="font-semibold text-saseBlue">Mentor-Mentee Program</span> allows underclassmen to build a close-knit community within
        SASE through their mentor and mentee groups. By participating in M&M challenges, socials, and profesional developement, mentorshiop provides
        underclassmen the chance to find their footing in SASE and college life.
      </p>
    ),
    image: imageUrls["MentorshipValues.jpeg"],
    link: "/mentor-mentee",
    number: "5",
  },
];
