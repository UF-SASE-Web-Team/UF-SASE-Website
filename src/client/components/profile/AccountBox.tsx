// src/components/profile/AccountBox.tsx
import type { userSchema } from "@shared/schema/userSchema";
import { useState } from "react";
import { toast } from "react-hot-toast";
import type { z } from "zod";
import type { FieldConfig } from "./ConfigurableAccountBox";
import { ConfigurableAccountBox } from "./ConfigurableAccountBox";

type User = z.infer<typeof userSchema>;

interface AccountBoxProps {
  username: User["username"];
  email: User["email"];
  firstName?: User["firstName"];
  lastName?: User["lastName"];
  timeAdded: number;
  timeUpdated: number;
  points?: number;
  roles?: string;
  adminView: boolean;
}

export default function AccountBox(props: AccountBoxProps) {
  const [info, setInfo] = useState({
    username: props.username,
    email: props.email,
    firstName: props.firstName ?? "",
    lastName: props.lastName ?? "",
    timeAdded: props.timeAdded.toString(),
    timeUpdated: props.timeUpdated.toString(),
    points: (props.points ?? 0).toString(),
    roles: props.roles ?? "",
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
    { name: "timeAdded", label: "Time Added", type: "text", editable: false },
    { name: "timeUpdated", label: "Time Updated", type: "text", editable: false },
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
    { name: "timeAdded", label: "Time Added", type: "text", editable: true },
    { name: "timeUpdated", label: "Time Updated", type: "text", editable: true },
  ];

  const initialData: Record<string, string> = {
    username: info.username,
    email: info.email,
    password: "",
    firstName: info.firstName,
    lastName: info.lastName,
    roles: info.roles,
    points: info.points,
    timeAdded: info.timeAdded,
    timeUpdated: info.timeUpdated,
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

  return <ConfigurableAccountBox initialData={initialData} fieldConfigs={props.adminView ? adminConfigs : fieldConfigs} onSave={handleSave} />;
}
