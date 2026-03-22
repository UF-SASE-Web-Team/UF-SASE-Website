import { cn } from "@/shared/utils";
import { imageUrls } from "@assets/imageUrls";
import { EventPageHeader } from "@components/custom_ui/EventPageHeader";
import { useIsMobile } from "@hooks/useIsMobile";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/stemconnect")({
  component: () => {
    const isMobile = useIsMobile();

    return (
      <div className="flex flex-col items-center py-10 font-redhat">
        <EventPageHeader
          title="STEM CONNECT"
          subtitle="For more information, please visit the STEM Connect website!"
          buttonText="STEM Connect WEBSITE"
          buttonHref="https://stemconnect.events/"
          date="TBA"
          location="TBA"
          buttonClassName="text-lg sm:text-2xl"
        />
        <div
          className={cn(
            "max-w-8xl my-16 flex gap-16 font-thin",
            isMobile ? "mx-6 flex-col items-center gap-16 text-center text-sm sm:px-12 md:px-40" : "flex-col items-center text-lg sm:px-12 md:px-40",
          )}
        >
          <p>
            The <span className="font-semibold text-saseBlue">STEM Connect</span> is is SASE’s premier professional and leadership development
            conference, designed to equip STEM students, professionals, and employers with the skills, networks, and insights needed to succeed in
            today’s workforce. It brings together collegiate and professional attendees through workshops, networking opportunities, and
            career-focused experiences.
            <div className="items-start text-left">
              <p className="mt-6 text-saseBlue sm:mt-2">Conference Highlights</p>
              <ul className="ml-6 list-disc">
                <li>Collegiate workshops, panels, and networking events</li>
                <li>Resume reviews and career fair with leading employers</li>
                <li>Hospitality suites for casual connections</li>
                <li>Science symposium featuring student research</li>
                <li>Professional leadership sessions and executive panels</li>
                <li>Professional leadership sessions and executive panels</li>
              </ul>
            </div>
          </p>
          <img
            src={imageUrls["StemConnectBanner.png"]}
            alt="STEM Connect promotional poster"
            className="flex-shrink-0 rounded-2xl shadow-xl sm:w-[350px] md:w-[150px]"
            style={{ width: "auto", height: "auto" }}
          />
        </div>
        <p className="subheader-text">EVENT GALLERY</p>
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
          <img
            src={imageUrls["StemConnectPhoto1.jpg"]}
            alt="SERC promotional poster"
            className="flex-shrink-0 rounded-2xl shadow-xl sm:w-[350px] md:w-[150px]"
            style={{ width: "350px", height: "auto" }}
          />
          <img
            src={imageUrls["StemConnectPhoto3.jpeg"]}
            alt="SERC promotional poster"
            className="flex-shrink-0 rounded-2xl shadow-xl sm:w-[350px] md:w-[150px]"
            style={{ width: "350px", height: "260px", objectFit: "cover", objectPosition: "center" }}
          />
          <img
            src={imageUrls["StemConnectPhoto2.jpeg"]}
            alt="SERC promotional poster"
            className="flex-shrink-0 rounded-2xl shadow-xl sm:w-[350px] md:w-[150px]"
            style={{ width: "350px", height: "auto" }}
          />
        </div>
      </div>
    );
  },
});
