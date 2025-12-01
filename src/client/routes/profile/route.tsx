// src/routes/profile/route.tsx
import { imageUrls } from "@assets/imageUrls";
import { seo } from "@client/utils/seo";
import ProfileNav from "@components/profile/ProfileNav";
import { useAuth } from "@hooks/AuthContext";
import { useUsers } from "@hooks/useUsers";
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/profile")({
  meta: () => [
    ...seo({
      title: "Profile | UF SASE",
      description: "Profile page for user information, must be logged in to UF SASE account view.",
      image: imageUrls["SASELogo.png"],
    }),
  ],
  component: () => {
    const { errorMessage, id, isAuthenticated } = useAuth();
    const { error, isLoading, user } = useUsers(id);
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState<string>("account");

    if (!isAuthenticated) {
      // We want to replace the navigation history on this redirect
      setTimeout(() => navigate({ to: "/login", replace: true }), 2000);
      return <div>Not authenticated, redirecting to login page…</div>;
    }
    if (isLoading) return <div>Loading…</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!user) return <div>User data unavailable</div>;

    const updateComponent = (section: string) => {
      setActiveSection(section);
    };

    return (
      <div className="flex min-h-screen w-full flex-col gap-6 bg-muted p-4 md:flex-row md:p-10">
        {errorMessage && <div className="mb-4 rounded bg-red-100 p-2 text-red-700">{errorMessage}</div>}
        <div className="w-full flex-shrink-0 md:w-60">
          <ProfileNav profileName={user.username} update={updateComponent} activeSection={activeSection} />
        </div>
        <div className="flex w-full flex-1 flex-col items-center py-6">
          <Outlet />
        </div>
      </div>
    );
  },
});
