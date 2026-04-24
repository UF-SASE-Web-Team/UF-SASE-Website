import { fetchAlumniBank, fetchAlumniRefreshStatus, triggerAlumniRefresh } from "@client/api/alumniBank";
import { useAuth } from "@hooks/AuthContext";
import { Icon } from "@iconify/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

export const Route = createFileRoute("/profile/alumni-bank")({
  component: AlumniBankPage,
});

function AlumniBankPage() {
  const { isAdmin } = useAuth();
  const queryClient = useQueryClient();
  const previousRefreshState = useRef<string | null>(null);

  const { data, error, isLoading } = useQuery({
    queryKey: ["alumni-bank"],
    queryFn: fetchAlumniBank,
  });

  const refreshStatusQuery = useQuery({
    queryKey: ["alumni-bank-refresh-status"],
    queryFn: fetchAlumniRefreshStatus,
    enabled: isAdmin,
    refetchInterval: (query) => {
      return query.state.data?.state === "running" ? 2_000 : false;
    },
  });

  const triggerRefresh = useMutation({
    mutationFn: triggerAlumniRefresh,
    onSuccess: async () => {
      await refreshStatusQuery.refetch();
    },
  });

  useEffect(() => {
    if (!isAdmin) return;
    const state = refreshStatusQuery.data?.state ?? null;
    if (previousRefreshState.current === "running" && state === "completed") {
      void queryClient.invalidateQueries({ queryKey: ["alumni-bank"] });
    }
    previousRefreshState.current = state;
  }, [isAdmin, queryClient, refreshStatusQuery.data?.state]);

  if (isLoading) return <div className="p-10 text-center">Loading alumni bank...</div>;
  if (error) return <div className="p-10 text-center text-red-600">Error: {(error as Error).message}</div>;

  return (
    <div className="group mx-auto w-full max-w-7xl rounded-2xl border border-white bg-transparent px-4 py-6 shadow-xl md:px-10">
      <h1 className="pb-6 text-xl font-bold">Alumni Bank</h1>

      {isAdmin && (
        <section className="mb-6 rounded-xl border p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold">Alumni Bank Update</h2>
              <p className="text-sm italic">Manual refresh from configured LinkedIn MCP.</p>
            </div>
            <button
              onClick={() => triggerRefresh.mutate()}
              disabled={
                triggerRefresh.isPending ||
                refreshStatusQuery.isFetching ||
                refreshStatusQuery.data?.state === "running" ||
                refreshStatusQuery.data?.pipelineReady === false
              }
              className="rounded-md bg-saseBlue px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {refreshStatusQuery.data?.state === "running" ? "Refreshing..." : "Run Alumni Bank Update"}
            </button>
          </div>

          <div className="mt-4 space-y-2 text-sm">
            {refreshStatusQuery.error && <p className="text-red-600">Status error: {(refreshStatusQuery.error as Error).message}</p>}

            {refreshStatusQuery.data && (
              <>
                <p>
                  State: <span className="font-semibold">{refreshStatusQuery.data.state}</span>
                </p>
                <p>
                  Progress:{" "}
                  <span className="font-semibold">
                    {refreshStatusQuery.data.processed}/{refreshStatusQuery.data.total}
                  </span>{" "}
                  | Success: {refreshStatusQuery.data.succeeded} | Failed: {refreshStatusQuery.data.failed} | Skipped:{" "}
                  {refreshStatusQuery.data.skipped}
                </p>
                <p>
                  Newly Added Graduates This Run: <span className="font-semibold">{refreshStatusQuery.data.added}</span>
                </p>
                {refreshStatusQuery.data.currentName && (
                  <p>
                    Current: {refreshStatusQuery.data.currentName} ({refreshStatusQuery.data.currentLinkedin})
                  </p>
                )}
                {refreshStatusQuery.data.lastError && <p className="text-red-600">Last error: {refreshStatusQuery.data.lastError}</p>}
                {refreshStatusQuery.data.pipelineReady === false && refreshStatusQuery.data.pipelineReason && (
                  <p className="text-red-600">Pipeline config issue: {refreshStatusQuery.data.pipelineReason}</p>
                )}
                {refreshStatusQuery.data.logs.length > 0 && (
                  <div className="max-h-48 overflow-y-auto rounded-md border bg-muted p-3 font-mono text-xs">
                    {refreshStatusQuery.data.logs.slice(0, 12).map((log, index) => (
                      <div key={`${log.timestamp}-${index}`} className={log.level === "error" ? "text-red-600" : "text-gray-700"}>
                        [{new Date(log.timestamp).toLocaleTimeString()}] {log.level.toUpperCase()}: {log.message}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      )}

      {data && data.length > 0 ? (
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-200 dark:text-black">
              <tr>
                <th className="px-4 py-2 font-semibold">Name</th>
                <th className="px-4 py-2 font-semibold">Major</th>
                <th className="px-4 py-2 font-semibold">Graduation</th>
                <th className="px-4 py-2 font-semibold">Current Role</th>
                <th className="px-4 py-2 font-semibold">Past Companies</th>
                <th className="px-4 py-2 font-semibold">Email</th>
                <th className="px-4 py-2 font-semibold">LinkedIn</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.map((row) => (
                <tr key={row.id}>
                  <td className="px-4 py-2">{row.name}</td>
                  <td className="px-4 py-2">{row.major}</td>
                  <td className="px-4 py-2">
                    {row.graduationMonth} {row.graduationYear}
                  </td>
                  <td className="px-4 py-2">
                    {row.currentRole} @ {row.currentCompany}
                  </td>
                  <td className="px-4 py-2">{row.pastCompanies.join(", ") || "—"}</td>
                  <td className="px-4 py-2">{row.email}</td>
                  <td className="px-4 py-2">
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
