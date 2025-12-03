import { cn } from "@/shared/utils";
import { imageUrls } from "@assets/imageUrls";
import { OmbreDivider } from "@components/custom_ui/OmbreDivider";
import { ResourceCard } from "@components/resources/ResourceCard";
import { ResourceHeader } from "@components/resources/ResourceHeader";
import { AcademicResources, ProfessionalResources, SaseResources, TopResources } from "@information/Resources";
import { createFileRoute } from "@tanstack/react-router";
import { IoMdLink } from "react-icons/io";
import { seo } from "../utils/seo";

export const Route = createFileRoute("/resources")({
  meta: () => [
    ...seo({
      title: "Resources | UF SASE",
      description:
        "Resources for students provided by UF SASE, such as study materials, workshop slides, career resources, and class connector forms.",
      image: imageUrls["SASELogo.png"],
    }),
  ],
  component: () => {
    return (
      <div className="w-full py-10">
        <div className="text-center">
          <h1 className="header-text ombre-text">RESOURCES</h1>
        </div>

        <OmbreDivider />

        <div className="py-10">
          <ResourceHeader label="Top Resources" />
          <div className="mx-auto mb-12 max-w-5xl px-4">
            <div className="flex flex-wrap items-stretch justify-center gap-6">
              {TopResources.map((r) => (
                <ResourceCard key={r.title} {...r} />
              ))}
            </div>
          </div>

          <ResourceHeader label="SASE Resources" />
          <div className="mx-auto mb-12 max-w-5xl px-4">
            <div className="flex flex-wrap items-stretch justify-center gap-6">
              {SaseResources.map((r) => (
                <ResourceCard key={r.title} {...r} />
              ))}
            </div>
          </div>

          <ResourceHeader label="Academic Resources" />
          <div className="mx-auto mb-12 max-w-5xl px-4">
            <div className="flex flex-wrap items-stretch justify-center gap-6">
              {AcademicResources.map((r) => (
                <ResourceCard key={r.title} {...r} />
              ))}
            </div>
          </div>

          <ResourceHeader label="Professional Resources" />
          <div className="mx-auto max-w-5xl px-4">
            <div className="flex flex-wrap items-stretch justify-center gap-6">
              {ProfessionalResources.map((r) => (
                <ResourceCard key={r.title} {...r} />
              ))}
            </div>
          </div>
        </div>

        <OmbreDivider />

        <div className="flex justify-center py-10">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <div
              className={cn(
                "mx-auto flex h-10 w-fit items-center justify-center rounded-full border-2",
                "border-gray-700 bg-saseBlue px-4 text-white shadow-[0px_5px_0px_0px_rgb(203,203,212)]",
                "transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-saseGreen hover:text-black",
              )}
            >
              <div className="pr-2 font-redhat">Linktree Default</div>
              <IoMdLink size={15} />
            </div>
          </a>
        </div>
      </div>
    );
  },
});
