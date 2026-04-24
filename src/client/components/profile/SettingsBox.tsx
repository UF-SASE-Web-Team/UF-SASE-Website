import DarkButton from "@/client/components/custom_ui/DarkButton";
import type { userSchema } from "@shared/schema/userSchema";
import { useState } from "react";
import { toast } from "react-hot-toast";
import type { z } from "zod";
import type { FieldConfig } from "./ConfigurableAccountBox";
import { ConfigurableAccountBox } from "./ConfigurableAccountBox";

type User = z.infer<typeof userSchema>;

interface SettingsBoxProps {
  darkMode: boolean;
  email: User["email"];
  firstName?: User["firstName"];
  lastName?: User["lastName"];
  points?: number;
  roles?: string;
  toggleDarkMode: () => void;
  username: User["username"];
}

const SettingsBox: React.FC<SettingsBoxProps> = ({ darkMode, email, firstName, lastName, points, roles, toggleDarkMode, username }) => {
  const [emailNotifications, setEmailNotifications] = useState(false);

  const handleEmailToggle = () => {
    setEmailNotifications(!emailNotifications);
    alert(`Email notifications ${!emailNotifications ? "enabled" : "disabled"}`);
  };

  const fieldConfigs: Array<FieldConfig> = [
    { name: "username", label: "Username", type: "text", editable: false },
    { name: "email", label: "Email", type: "email", editable: false },
    {
      name: "password",
      label: "Password",
      type: "password",
      editable: false,
      showResetLink: true,
      resetLinkUrl: "/api/email/password-reset",
    },
    { name: "firstName", label: "First Name", type: "text", editable: true },
    { name: "lastName", label: "Last Name", type: "text", editable: true },
    { name: "roles", label: "Roles", type: "text", editable: roles != undefined && roles.match(/(admin|board)/) != null },
    { name: "points", label: "Points", type: "number", editable: false },
  ];

  const initialData: Record<string, string> = {
    email,
    firstName: firstName ?? "",
    lastName: lastName ?? "",
    password: "",
    points: (points ?? 0).toString(),
    roles: roles ?? "",
    username,
  };

  const handleSave = async (updates: Record<string, string>) => {
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      toast.success("Info saved successfully!");
    } catch (err) {
      console.error("Save failed", err);
      toast.error("Failed to save info.");
    }
  };

  return (
    <div className="mt-8 w-full rounded-2xl bg-card text-foreground px-4 pb-6 pt-8 shadow-xl md:px-10">
      {/* Main Header */}
      <h1 className="mb-6 text-xl font-bold">Settings</h1>

      {/* Account Section */}
      <div className="mb-8">
        <ConfigurableAccountBox fieldConfigs={fieldConfigs} initialData={initialData} onSave={handleSave} showHeader={true} />
      </div>

      {/* Preferences Section */}
      <div className="border-t border-border pt-8">
        <h2 className="mb-6 text-xl font-bold text-foreground">Preferences</h2>

        {/* Dark Mode Toggle */}
        <div className="mb-6 flex items-center justify-between">
          <span className="text-lg font-medium text-foreground">Theme (Light/Dark)</span>
          <DarkButton darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>

        {/* Email Notifications */}
        <div className="mb-6 flex items-center justify-between">
          <span className="text-lg font-medium text-foreground">Email Notifications</span>
          <label className="relative inline-flex cursor-pointer items-center">
            <input type="checkbox" className="peer sr-only" checked={emailNotifications} onChange={handleEmailToggle} />
            <div className="h-6 w-11 rounded-full bg-gray-300 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-saseGreen peer-checked:after:translate-x-full" />
          </label>
        </div>

        {/* Delete Account Button (Dummy) */}
        <div className="mt-10 flex justify-center">
          <button className="rounded-full bg-red-500 px-4 py-2 text-white transition hover:bg-red-600" disabled>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsBox;
