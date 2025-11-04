import { imageUrls } from "@assets/imageUrls";
import React from "react";

const AboutCard = () => {
  return (
    <div className="relative w-4/5">
      {/* Shadow Card */}
      <div className="absolute left-5 top-5 h-full w-full rounded-3xl bg-saseGreen"></div>

      {/* Main Text Card */}
      <div className="relative rounded-3xl border-2 border-border bg-muted p-11 text-lg shadow-xl">
        <p className="mb-4 text-foreground">
          The <span className="font-semibold">Society of Asian Scientists and Engineers (SASE) </span> at UF was established in 2010 as a student
          organization dedicated to the advancement of Asian heritage scientists and engineers. Above all, SASE is a welcoming community of driven
          individuals that cultivates a unique balance between professional development and a supportive, fun community.
        </p>
        <p className="mb-4 text-foreground">
          Through our <span className="font-semibold">general body meetings</span>, <span className="font-semibold">socials</span>,
          <span className="font-semibold"> workshops</span>, and <span className="font-semibold">internal mentorship program</span>, we aim to build
          our members’ relationships, skills, and knowledge that will enable them to succeed. We also offer an
          <span className="font-semibold"> intramural program (SASE Sports)</span>, an <span className="font-semibold">engineering team (SET)</span>,
          and a <span className="font-semibold">leadership development program (SASE Interns)</span>.
        </p>

        {/* Gradient Line */}
        <div
          className="absolute -bottom-12 right-6 hidden h-2 w-[90%] rounded-full md:block"
          style={{
            background: "linear-gradient(to right, #0668B3 70%, white)",
          }}
        ></div>

        {/* Logo Image (Reduced Size) */}
        <img
          src={imageUrls["SASELogoStar.png"]}
          alt="Logo"
          style={{ width: "125px", height: "125px" }} // Reduced size
          className="absolute -bottom-10 -right-10 object-contain"
        />
      </div>
    </div>
  );
};

export default AboutCard;
