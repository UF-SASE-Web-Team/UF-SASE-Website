import { useAuth } from "@hooks/AuthContext";
import { useProfessionalInfo } from "@hooks/useProfessionalInfo";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import React, { useEffect, useState } from "react";

export function AlumniBankLockedState() {
  const { id } = useAuth();
  const queryClient = useQueryClient();
  const { createProfessionalInfo, isLoading, professionalInfo, updateProfessionalInfo } = useProfessionalInfo(id ?? "");

  const [linkedin, setLinkedin] = useState("");
  const [major, setMajor] = useState("");
  const [graduationSemester, setGraduationSemester] = useState("");
  const [phone, setPhone] = useState("");
  const [discord, setDiscord] = useState("");
  const [bio, setBio] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [minors, setMinors] = useState("");

  useEffect(() => {
    if (professionalInfo) {
      setLinkedin(professionalInfo.linkedin ?? "");
      setMajor(professionalInfo.majors ?? "");
      setGraduationSemester(professionalInfo.graduationSemester ?? "");
      setPhone(professionalInfo.phone ?? "");
      setDiscord(professionalInfo.discord ?? "");
      setBio(professionalInfo.bio ?? "");
      setPortfolio(professionalInfo.portfolio ?? "");
      setMinors(professionalInfo.minors ?? "");
    }
  }, [professionalInfo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    try {
      const payload = {
        linkedin,
        majors: major,
        graduationSemester,
        phone,
        discord,
        bio,
        portfolio,
        minors,
      };

      if (professionalInfo) {
        await updateProfessionalInfo.mutateAsync(payload);
      } else {
        await createProfessionalInfo.mutateAsync({ userId: id, ...payload });
      }
      void queryClient.invalidateQueries({ queryKey: ["alumni-bank"] });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative mx-auto mt-8 w-full max-w-7xl overflow-hidden rounded-2xl bg-background pt-8 shadow-xl">
      <div className="relative z-10 flex min-h-[500px] flex-col items-center justify-center p-6 text-center backdrop-blur-sm">
        <div className="w-full max-w-lg rounded-2xl border-muted bg-muted p-8">
          <h2 className="mb-3 text-center font-oswald text-4xl font-semibold">Unlock the Alumni Bank</h2>
          <p className="mb-6 text-center text-sm font-medium italic text-saseBlue">
            Share your professional journey to gain access to the Alumni Bank.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-2 px-2 pb-2 text-left">
            <div className="relative w-full">
              <Input
                type="text"
                required
                value={linkedin}
                pattern="^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$"
                onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity("Please enter a valid LinkedIn URL")}
                onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="LinkedIn URL (https://www.linkedin.com/in/...)"
                className="mb-1 w-full rounded-lg border border-gray-300 bg-saseGreenLight p-4 text-gray-900 placeholder:text-gray-500"
              />
            </div>
            <div className="relative w-full">
              <Input
                type="text"
                required
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                placeholder="Major (e.g., Computer Science)"
                className="mb-1 w-full rounded-lg border border-gray-300 bg-saseGreenLight p-4 text-gray-900 placeholder:text-gray-500"
              />
            </div>
            <div className="relative w-full">
              <Input
                type="text"
                value={minors}
                onChange={(e) => setMinors(e.target.value)}
                placeholder="Minor (e.g., Math or N/A)"
                className="mb-1 w-full rounded-lg border border-gray-300 bg-saseGreenLight p-4 text-gray-900 placeholder:text-gray-500"
              />
            </div>
            <div className="relative w-full">
              <Input
                type="text"
                required
                value={graduationSemester}
                onChange={(e) => setGraduationSemester(e.target.value)}
                placeholder="Expected Graduation (e.g., Spring 2026)"
                className="mb-1 w-full rounded-lg border border-gray-300 bg-saseGreenLight p-4 text-gray-900 placeholder:text-gray-500"
              />
            </div>
            <div className="relative w-full">
              <Input
                type="text"
                required
                value={discord}
                onChange={(e) => setDiscord(e.target.value)}
                placeholder="Discord Username (e.g., wabinkt)"
                className="mb-1 w-full rounded-lg border border-gray-300 bg-saseGreenLight p-4 text-gray-900 placeholder:text-gray-500"
              />
            </div>
            <div className="relative w-full">
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number (Optional)"
                className="mb-1 w-full rounded-lg border border-gray-300 bg-saseGreenLight p-4 text-gray-900 placeholder:text-gray-500"
              />
            </div>
            <div className="relative w-full">
              <Input
                type="url"
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
                placeholder="Portfolio URL (Optional)"
                className="mb-1 w-full rounded-lg border border-gray-300 bg-saseGreenLight p-4 text-gray-900 placeholder:text-gray-500"
              />
            </div>
            <div className="relative w-full">
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Bio (Optional)"
                rows={3}
                className="mb-1 w-full rounded-lg border border-gray-300 bg-saseGreenLight p-4 text-gray-900 placeholder:text-gray-500 focus:border-saseBlue focus:outline-none focus:ring-1 focus:ring-saseBlue"
              />
            </div>

            <Button
              type="submit"
              disabled={createProfessionalInfo.isPending || updateProfessionalInfo.isPending || isLoading}
              className="mt-2 w-full rounded-lg border bg-saseBlueLight p-5 font-semibold text-white hover:opacity-90"
            >
              {createProfessionalInfo.isPending || updateProfessionalInfo.isPending ? "Unlocking..." : "Unlock Directory"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
