import { DarkModeContext } from "@/client/components/custom_ui/DarkModeProvider";
import SettingsBox from "@components/profile/SettingsBox";
import { useAuth } from "@hooks/AuthContext";
import { useUsers } from "@hooks/useUsers";
import { createFileRoute } from "@tanstack/react-router";
import { useContext } from "react";

export const Route = createFileRoute("/profile/settings")({
  component: () => {
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
    const { id } = useAuth();
    const { error, isLoading, user } = useUsers(id);

    // Standardized loading state to match Dashboard
    if (isLoading) return <div className="p-10 text-center text-gray-500">Loading settings...</div>;

    // Standardized error state
    if (error) return <div className="p-10 text-red-600">Error: {error.message}</div>;
    if (!user) return <div className="p-10 text-center">User data unavailable</div>;

    return (
      <div className="group mx-auto w-full max-w-5xl rounded-2xl bg-background px-4 py-6 shadow-xl md:px-10">
        <SettingsBox
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          username={user.username}
          email={user.email}
          firstName={user.firstName}
          lastName={user.lastName}
          points={user.points}
          roles={user.roles}
        />
      </div>
    );
  },
});
