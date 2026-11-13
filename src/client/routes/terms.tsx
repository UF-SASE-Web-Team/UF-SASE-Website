import { imageUrls } from "@/client/assets/imageUrls";
import TermsOfService from "@components/legal/TermsOfService";
import { createFileRoute } from "@tanstack/react-router";
import { seo } from "../utils/seo";

export const Route = createFileRoute("/terms")({
  meta: () => [
    ...seo({
      title: "Terms of Service | UF SASE",
      description: "The terms that apply when you create an account or use the UF SASE app.",
      image: imageUrls["SASELogo.png"],
    }),
  ],
  component: () => <TermsOfService />,
});
