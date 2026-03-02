import { imageUrls } from "@/client/assets/imageUrls";
import FreshmenFAQ from "@components/resources/FreshmenFAQ";
import { createFileRoute } from "@tanstack/react-router";
import { seo } from "../utils/seo";

export const Route = createFileRoute("/freshman-faq")({
  meta: () => [
    ...seo({
      title: "Freshman FAQ | UF SASE",
      description: "Frequently asked questions for incoming UF SASE freshmen.",
      image: imageUrls["SASELogo.png"],
    }),
  ],
  component: () => <FreshmenFAQ />,
});
