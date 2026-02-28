import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/serc")({
  component: RouteComponent,
});

function RouteComponent() {
  return "Hello /serc!";
}
