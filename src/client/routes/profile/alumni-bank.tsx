import { fetchAlumniBank } from "@client/api/alumniBank";
import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile/alumni-bank")({
  component: AlumniBankPage,
});

function AlumniBankPage() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["alumni-bank"],
    queryFn: fetchAlumniBank,
  });

  if (isLoading) return <div className="p-10 text-center">Loading alumni bank...</div>;
  if (error) return <div className="p-10 text-center text-red-600">Error: {(error as Error).message}</div>;

  return (
    <div className="group mx-auto w-full max-w-7xl rounded-2xl bg-background px-4 py-6 shadow-xl md:px-10">
      <h1 className="pb-6 text-xl font-bold">Alumni Bank</h1>

      {data && data.length > 0 ? (
        <div className="overflow-x-auto rounded-xl border">
          <table className="min-w-[1200px] divide-y divide-gray-200 text-left text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Major</th>
                <th className="px-4 py-3 font-semibold">Minor</th>
                <th className="px-4 py-3 font-semibold">Graduation Month</th>
                <th className="px-4 py-3 font-semibold">Graduation Year</th>
                <th className="px-4 py-3 font-semibold">Current Role</th>
                <th className="px-4 py-3 font-semibold">Current Company</th>
                <th className="px-4 py-3 font-semibold">Past Companies</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">LinkedIn</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.map((row) => (
                <tr key={row.id}>
                  <td className="px-4 py-3">{row.name}</td>
                  <td className="px-4 py-3">{row.major}</td>
                  <td className="px-4 py-3">{row.minor}</td>
                  <td className="px-4 py-3">{row.graduationMonth}</td>
                  <td className="px-4 py-3">{row.graduationYear}</td>
                  <td className="px-4 py-3">{row.currentRole}</td>
                  <td className="px-4 py-3">{row.currentCompany}</td>
                  <td className="px-4 py-3">{row.pastCompanies.join(", ") || "—"}</td>
                  <td className="px-4 py-3">{row.email}</td>
                  <td className="px-4 py-3">
                    {row.linkedin.trim() ? (
                      <a href={row.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center text-[#0A66C2] hover:opacity-80">
                        <Icon icon="mdi:linkedin" className="text-xl" />
                      </a>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-gray-500">No graduated alumni to display yet.</div>
      )}
    </div>
  );
}
