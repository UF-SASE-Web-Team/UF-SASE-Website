import { alumniBankRowSchema } from "@shared/schema";
import { apiFetch } from "@shared/utils";

export type AlumniBankEntry = {
  id: string;
  name: string;
  major: string;
  minor: string;
  graduationMonth: string;
  graduationYear: number;
  currentRole: string;
  currentCompany: string;
  pastCompanies: Array<string>;
  email: string;
  linkedin: string;
};

export const fetchAlumniBank = async (): Promise<Array<AlumniBankEntry>> => {
  const response = await apiFetch(
    "/api/alumni-bank",
    {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    },
    alumniBankRowSchema.array(),
  );

  return response.data;
};
