// src/components/profile/AccountBox.tsx
import type { userSchema } from "@shared/schema/userSchema";
import { useState } from "react";
import { toast } from "react-hot-toast";
import type { z } from "zod";
import type { FieldConfig } from "./ConfigurableAccountBox";
import { ConfigurableAccountBox } from "./ConfigurableAccountBox";

type User = z.infer<typeof userSchema>;

interface AccountBoxProps {
  adminView: boolean;
  email: User["email"];
  firstName?: User["firstName"];
  lastName?: User["lastName"];
  points?: number;
  roles?: string;
  username: User["username"];
}

export default function AccountBox(props: AccountBoxProps) {
  const [info, setInfo] = useState({
    email: props.email,
    firstName: props.firstName ?? "",
    lastName: props.lastName ?? "",
    points: (props.points ?? 0).toString(),
    roles: props.roles ?? "",
    username: props.username,
  });

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
    { name: "roles", label: "Roles", type: "text", editable: props.roles != undefined && props.roles.match(/(admin|board)/) != null },
    { name: "points", label: "Points", type: "number", editable: false },
  ];

  const adminConfigs: Array<FieldConfig> = [
    { name: "username", label: "Username", type: "text", editable: true },
    { name: "email", label: "Email", type: "email", editable: true },
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
    { name: "roles", label: "Roles", type: "text", editable: true },
    { name: "points", label: "Points", type: "number", editable: true },
  ];

  const initialData: Record<string, string> = {
    email: info.email,
    firstName: info.firstName,
    lastName: info.lastName,
    password: "",
    points: info.points,
    roles: info.roles,
    username: info.username,
  };

  const handleSave = async (updates: Record<string, string>) => {
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      setInfo((prev) => ({ ...prev, ...updates }));
      toast.success("Info saved successfully!");
    } catch (err) {
      console.error("Save failed", err);
      toast.error("Failed to save info.");
    }
  };

  return (
    <div className="group w-full rounded-2xl bg-background px-4 py-6 shadow-xl md:w-3/4 md:px-10">
      <ConfigurableAccountBox initialData={initialData} fieldConfigs={props.adminView ? adminConfigs : fieldConfigs} onSave={handleSave} />
    </div>
  );
}
