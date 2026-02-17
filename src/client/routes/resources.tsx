import { imageUrls } from "@assets/imageUrls";
import { OmbreDivider } from "@components/custom_ui/OmbreDivider";
import { ResourceCard } from "@components/resources/ResourceCard";
import { ResourceHeader } from "@components/resources/ResourceHeader";
import { AcademicResources, ProfessionalResources, SaseResources, TopResources } from "@information/Resources";
import { createFileRoute } from "@tanstack/react-router";
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
      </div>
    );
  },
});
