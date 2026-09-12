import { imageUrls } from "@/client/assets/imageUrls";

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
    image: imageUrls["SaseInternsCard.png"],
    link: "/interns",
    number: "1",
  },
  {
    program: "Gator Rover",
    description: (
      <p>
        The <span className="font-semibold text-saseGreen">SASE Engineering Team</span> works together on a year-long project to explore technical
        creativity and problem-solving. Members gain hands-on experience, sharpen engineering and collaboration skills, and build impactful projects
        while growing in a supportive team environment.
      </p>
    ),
    image: imageUrls["SetCard.png"],
    link: "/set",
    number: "2",
  },
  {
    program: "SWEET",
    description: (
      <p>
        The <span className="font-semibold text-saseBlue">SASE Web Development Team</span> brings together UI/UX, Frontend, and Backend members to
        develop and enhance the UF SASE website. Team members gain hands-on experience with agile workflows and collaborate to create a self-hosted
        platform, sharpening technical and teamwork skills along the way.
      </p>
    ),
    image: imageUrls["WebDevCard.png"],
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
    image: imageUrls["SaseSportsCard.png"],
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
  {
    program: "SASE Projects",
    description: (
      <p>
        <span className="font-semibold text-saseGreen">SASE Projects</span> brings together small, multidisciplinary groups of 5–6 students to design
        and execute approachable technical and research initiatives. Members of all majors and skill levels "learn by doing," building hands-on
        technical and project management experience to highlight on their resumes.
      </p>
    ),
    image: imageUrls["SASELogo.png"],
    link: "/projects",
    number: "6",
  },
  {
    program: "SASEHacks",
    description: (
      <p>
        <span className="font-semibold text-saseGreen">SASEHacks</span> is a 24-hour hackathon where students from any university can learn new
        skills, network, attend workshops, build innovative projects, and compete for exciting category prizes.
      </p>
    ),
    image: imageUrls["SaseHacksPoster.png"],
    link: "/sasehacks",
    number: "7",
  },
  {
    program: "Community Outreach",
    description: (
      <p>
        <span className="font-semibold text-saseBlue">SASE Community Outreach</span> connects members with the Gainesville community through service
        and volunteering opportunities. More details coming soon!
      </p>
    ),
    image: imageUrls["SASELogo.png"],
    link: "/community-outreach",
    number: "8",
  },
  {
    program: "SASE PCR",
    description: (
      <p>
        <span className="font-semibold text-saseGreen">SASE PCR (Program for Collaborative Research)</span> gives members the chance to get involved
        in research.
      </p>
    ),
    image: "/images/SasePcrGraphic.png",
    link: "/sase-pcr",
    number: "9",
  },
];
