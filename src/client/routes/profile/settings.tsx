// src/routes/profile/settings.tsx
import { DarkModeContext } from "@/client/components/custom_ui/DarkModeProvider";
import AccountBox from "@components/profile/AccountBox";
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

    if (isLoading) return <div>Loading…</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!user) return <div>User data unavailable</div>;

    return (
      <>
        {/* Account Box */}
        <AccountBox
          username={user.username}
          email={user.email}
          firstName={user.firstName}
          lastName={user.lastName}
          timeAdded={user.timeAdded}
          timeUpdated={user.timeUpdated}
          points={user.points}
          roles={user.roles}
          adminView={false}
        />

        {/* Preferences Section */}
        <SettingsBox darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </>
    );
  },
});
