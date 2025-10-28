import { useIsMobile } from "@hooks/useIsMobile";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

const HistorySection = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();

  return (
    <section className="mb-8">
      <div className={isMobile ? "max-w-full px-4" : "max-w-5xl"}>
        <p className={isMobile ? "mb-3 text-sm text-foreground" : "mb-4 text-lg text-foreground"}>
          <strong>Since being founded during the summer of 2010,</strong> the University of Florida chapter has had an abundant effort put forth for
          the development of our members.
        </p>
        <p className={isMobile ? "mb-3 text-sm text-foreground" : "mb-4 text-lg text-foreground"}>
          This development is centered on <strong>five core values</strong> of our mission statement:{" "}
          <strong>leadership, professionalism, service, academics,</strong> and <strong>diversity.</strong> Our meetings and events are catered to
          ensure that not only our mission is being fulfilled, but also that a community of support among Asian heritage students is being built. We
          pride ourselves on our measurable successes but could not have done so without the help of our members, faculty, and sponsors.
        </p>

        {/* Full description always shown on desktop */}
        {!isMobile && (
          <>
            <p className="mb-4 text-lg text-foreground">
              Through <strong>events</strong> we have hosted in the past, such as our annual Quick Race or the Southeast Regional Conferences of
              2014-2016, many of our members have been able to get involved in committees and take on leadership roles. Many of our other events allow
              students to <strong>develop professional skills</strong> that are essential for positions in industry.
            </p>
            <p className="mb-4 text-lg text-foreground">
              Our SASE chapter is not only active on campus, but also within the <strong>Gainesville community</strong>, such as when we participated
              in a 5K raising money for a local robotics team. We are also heavily involved in the <strong>Asian American Student Union</strong> at
              the University of Florida, taking part in their annual welcome assembly and hosting events with cultural and professional
              sub-organizations.
            </p>
          </>
        )}

        {/* Read More Toggle (Only on Mobile) */}
        {isMobile && !isExpanded && (
          <div className="flex w-fit cursor-pointer items-center text-blue-600 hover:underline" onClick={() => setIsExpanded(true)}>
            <span>Read more</span>
            <FaChevronDown className="ml-1 h-4 w-4" />
          </div>
        )}

        {/* Expandable Content (Only on Mobile) */}
        {isMobile && (
          <div className={`transition-all duration-300 ${isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 overflow-hidden opacity-0"}`}>
            <p className="mb-3 text-sm text-foreground">
              Through <strong>events</strong> we have hosted in the past, such as our annual Quick Race or the Southeast Regional Conferences of
              2014-2016, many of our members have been able to get involved in committees and take on leadership roles. Many of our other events allow
              students to <strong>develop professional skills</strong> that are essential for positions in industry.
            </p>
            <p className="mb-3 text-sm text-foreground">
              Our SASE chapter is not only active on campus, but also within the <strong>Gainesville community</strong>, such as when we participated
              in a 5K raising money for a local robotics team. We are also heavily involved in the <strong>Asian American Student Union</strong> at
              the University of Florida, taking part in their annual welcome assembly and hosting events with cultural and professional
              sub-organizations.
            </p>

            {/* Read Less Link (Only on Mobile) */}
            <div className="flex w-fit cursor-pointer items-center text-blue-600 hover:underline" onClick={() => setIsExpanded(false)}>
              <span>Read less</span>
              <FaChevronUp className="ml-1 h-4 w-4" />
            </div>
          </div>
        )}
      </div>

      {/* Constitution Link */}
      <div className="mt-4 text-center">
        <a
          href="2024-2025-SASE-Constitution.docx.pdf"
          className="mt-6 inline-block transform rounded-full border-2 border-black bg-[#0f6cb6] px-12 py-2 italic text-white underline transition duration-300 hover:scale-105"
          target="_blank"
          rel="noopener noreferrer"
        >
          2024-2025 SASE Constitution
        </a>
      </div>
    </section>
  );
};

export default HistorySection;
