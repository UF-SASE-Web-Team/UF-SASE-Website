import { imageUrls } from "@/client/assets/imageUrls";
import PrivacyPolicy from "@components/legal/PrivacyPolicy";
import { createFileRoute } from "@tanstack/react-router";
import { seo } from "../utils/seo";

export const Route = createFileRoute("/privacy")({
  meta: () => [
    ...seo({
      title: "Privacy Policy | UF SASE",
      description: "What the UF SASE app collects, why, who receives it, and how to have it deleted.",
      image: imageUrls["SASELogo.png"],
    }),
  ],
  component: () => <PrivacyPolicy />,
});
