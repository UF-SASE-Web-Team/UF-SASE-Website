// src/components/profile/UserInfoBox.tsx
import type { professionalInfoSchema } from "@shared/schema/professionalInfoSchema";
import { useState } from "react";
import { toast } from "react-hot-toast";
import type { z } from "zod";
import { ConfigurableAccountBox, type FieldConfig } from "./ConfigurableAccountBox";

type ProfessionalInfo = z.infer<typeof professionalInfoSchema>;
type UserInfoBoxProps = Omit<ProfessionalInfo, "userId"> & {
  onSave: (updates: Partial<Omit<ProfessionalInfo, "userId">>) => Promise<void> | void;
};

export default function UserInfoBox(props: UserInfoBoxProps) {
  const [info, setInfo] = useState<Omit<ProfessionalInfo, "userId">>({
    phone: props.phone,
    discord: props.discord,
    bio: props.bio,
    resumePath: props.resumePath,
    linkedin: props.linkedin,
    portfolio: props.portfolio,
    majors: props.majors,
    minors: props.minors,
    graduationSemester: props.graduationSemester,
  });

  const initialData: Record<string, string> = {
    phone: info.phone ?? "",
    discord: info.discord ?? "",
    bio: info.bio ?? "",
    resumePath: info.resumePath ?? "",
    linkedin: info.linkedin ?? "",
    portfolio: info.portfolio ?? "",
    majors: info.majors ?? "",
    minors: info.minors ?? "",
    graduationSemester: info.graduationSemester ?? "",
  };

  const validatePhone = (phone: string): string | null => {
    if (!phone) return null;

    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    if (!phoneRegex.test(phone)) {
      return "Phone number must be in format: 123-456-7890";
    }

    return null;
  };

  const validateDiscord = (discord: string): string | null => {
    if (!discord) return null;
    const discordRegex = /^@?[\w.-]{2,32}(#\d{4})?$/;
    if (!discordRegex.test(discord)) {
      return "Discord username must be valid";
    }
    return null;
  };

  const validateBio = (bio: string): string | null => {
    if (!bio) return null;
    if (bio.length > 500) {
      return "Bio must be 500 characters or less";
    }
    return null;
  };

  const validateLinkedIn = (linkedin: string): string | null => {
    if (!linkedin) return null;
    const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|profile)\/[\w-]+\/?$/;
    if (!linkedinRegex.test(linkedin)) {
      return "LinkedIn must be a valid profile URL (e.g., https://linkedin.com/in/yourname)";
    }
    return null;
  };

  const semesterOptions = [
    { value: "Spring 2024", label: "Spring 2024" },
    { value: "Summer 2024", label: "Summer 2024" },
    { value: "Fall 2024", label: "Fall 2024" },
    { value: "Spring 2025", label: "Spring 2025" },
    { value: "Summer 2025", label: "Summer 2025" },
    { value: "Fall 2025", label: "Fall 2025" },
    { value: "Spring 2026", label: "Spring 2026" },
    { value: "Summer 2026", label: "Summer 2026" },
    { value: "Fall 2026", label: "Fall 2026" },
    { value: "Spring 2027", label: "Spring 2027" },
    { value: "Summer 2027", label: "Summer 2027" },
    { value: "Fall 2027", label: "Fall 2027" },
    { value: "Spring 2028", label: "Spring 2028" },
    { value: "Summer 2028", label: "Summer 2028" },
    { value: "Fall 2028", label: "Fall 2028" },
    { value: "Spring 2029", label: "Spring 2029" },
  ];

  const fieldConfigs: Array<FieldConfig> = [
    { name: "phone", label: "Phone Number", type: "text", editable: true, placeholder: "123-456-7890", validate: validatePhone },
    {
      name: "discord",
      label: "Discord Username",
      type: "text",
      editable: true,
      placeholder: "username",
      validate: validateDiscord,
    },
    {
      name: "bio",
      label: "Bio",
      type: "text",
      editable: true,
      multiline: true,
      placeholder: "Bio",
      validate: validateBio,
    },
    { name: "resumePath", label: "Resume", type: "text", editable: true, placeholder: "Add resume link" },
    {
      name: "linkedin",
      label: "LinkedIn URL",
      type: "text",
      editable: true,
      placeholder: "https://linkedin.com/in/yourname",
      validate: validateLinkedIn,
    },
    { name: "portfolio", label: "Portfolio URL", type: "text", editable: true, placeholder: "https://yourportfolio.com" },
    { name: "majors", label: "Major(s)", type: "text", editable: true, placeholder: "Computer Science, Biology" },
    { name: "minors", label: "Minor(s)", type: "text", editable: true, placeholder: "Philosophy, Spanish" },
    {
      name: "graduationSemester",
      label: "Graduation Semester",
      type: "select",
      editable: true,
      placeholder: "Select semester",
      options: semesterOptions,
    },
  ];

  const handleSave = async (updates: Record<string, string>) => {
    // if no updates, just show success
    if (Object.keys(updates).length === 0) {
      toast.success("Info saved successfully!");
      return;
    }

    try {
      await props.onSave(updates);
      setInfo((prev) => ({ ...prev, ...updates }));
      toast.success("Info saved successfully!");
    } catch (err) {
      console.error("Save failed", err);
      toast.error("Failed to save info.");
    }
  };

  return (
    <div className="group mx-auto mt-8 w-full max-w-5xl rounded-2xl bg-card text-foreground px-4 pb-6 pt-8 shadow-xl md:px-10">
      <ConfigurableAccountBox title="Profile Information" initialData={initialData} fieldConfigs={fieldConfigs} onSave={handleSave} />
    </div>
  );
}
