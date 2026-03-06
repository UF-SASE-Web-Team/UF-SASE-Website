import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/stemconnect")({
  component: RouteComponent,
});

function RouteComponent() {
  return "Hello /stemconnect!";
}
