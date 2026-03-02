// src/routes/profile/route.tsx
import { imageUrls } from "@assets/imageUrls";
import { seo } from "@client/utils/seo";
import ProfileNav from "@components/profile/ProfileNav";
import { useAuth } from "@hooks/AuthContext";
import { useUsers } from "@hooks/useUsers";
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";

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

    if (!isAuthenticated) {
      setTimeout(() => navigate({ to: "/login", replace: true }), 2000);
      return <div className="p-10 text-center">Not authenticated, redirecting to login page…</div>;
    }

    if (isLoading) return <div className="p-10 text-center">Loading…</div>;
    if (error) return <div className="p-10 text-red-600">Error: {error.message}</div>;
    if (!user) return <div className="p-10 text-center">User data unavailable</div>;

    return (
      <div className="flex min-h-screen w-full flex-col bg-muted md:flex-row md:gap-6 md:p-10">
        {errorMessage && (
          <div className="fixed right-4 top-4 z-50 rounded border border-red-200 bg-red-100 p-3 text-red-700 shadow-lg">{errorMessage}</div>
        )}

        {/* Navigation Container:
            - On mobile: Sticky at the top with a horizontal scroll if links overflow.
            - On desktop: Fixed width sidebar.
        */}
        <aside className="sticky top-0 z-10 w-full border-b bg-background md:relative md:top-auto md:w-64 md:flex-shrink-0 md:rounded-xl md:border-none md:bg-transparent">
          <ProfileNav profileName={user.username} />
        </aside>

        {/* Main Content Area:
            - Takes up remaining space.
        */}
        <main className="flex-1 px-4 py-6 md:p-0">
          <Outlet />
        </main>
      </div>
    );
  },
});
