import { cn } from "@/shared/utils";
import { imageUrls } from "@assets/imageUrls";
import { ResourceCard } from "@components/resources/ResourceCard";
import { ResourceHeader } from "@components/resources/ResourceHeader";
import { AcademicResources, ProfessionalResources, SaseResources, TopResources } from "@components/resources/Resources";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { IoMdLink } from "react-icons/io";
import { applyOmbreDivider } from "../utils/ombre-divider";
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
    useEffect(() => {
      applyOmbreDivider();
    }, []);

    return (
      <div className="w-full">
        <div className="text-center">
          <h1 className="mt-4 pb-8 font-oswald text-5xl font-medium sm:text-6xl md:text-7xl">RESOURCES</h1>
        </div>

        <div className="ombre-divider"></div>

        <div className="pt-8">
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
          <div className="mx-auto mb-12 max-w-5xl px-4">
            <div className="flex flex-wrap items-stretch justify-center gap-6">
              {ProfessionalResources.map((r) => (
                <ResourceCard key={r.title} {...r} />
              ))}
            </div>
          </div>
        </div>

        <div className="ombre-divider"></div>

        <div className="flex justify-center py-8">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <div
              className={cn(
                "mx-auto flex h-10 w-fit items-center justify-center rounded-full border-2",
                "border-gray-700 bg-saseBlue px-4 text-white shadow-[0px_5px_0px_0px_rgb(203,203,212)]",
                "transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-saseGreen hover:text-black",
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
