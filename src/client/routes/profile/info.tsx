// src/routes/profile/userinfo.tsx
import UserInfoBox from "@components/profile/UserInfoBox";
import { useAuth } from "@hooks/AuthContext";
import { useProfessionalInfo } from "@hooks/useProfessionalInfo";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile/info")({
  component: () => {
    const { id } = useAuth();
    const { error, isLoading, professionalInfo, updateProfessionalInfo } = useProfessionalInfo(id);

    if (isLoading) return <div>Loading…</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!professionalInfo) return <div>Professional info not found</div>;

    const handleSave = async (updates: Partial<typeof professionalInfo>) => {
      await updateProfessionalInfo.mutateAsync(updates);
    };

    return (
      <UserInfoBox
        discord={professionalInfo.discord ?? ""}
        phone={professionalInfo.phone ?? ""}
        bio={professionalInfo.bio ?? ""}
        resumePath={professionalInfo.resumePath ?? ""}
        linkedin={professionalInfo.linkedin ?? ""}
        portfolio={professionalInfo.portfolio ?? ""}
        majors={professionalInfo.majors ?? ""}
        minors={professionalInfo.minors ?? ""}
        graduationSemester={professionalInfo.graduationSemester ?? ""}
        onSave={handleSave}
      />
    );
  },
});
