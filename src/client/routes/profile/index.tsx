// src/routes/profile/index.tsx
import { acceptMentorMenteeInvite, deleteMentorMenteeInvite, getAllMentorMenteeInvites } from "@/client/api/mentorMentee";
import { useAuth } from "@hooks/AuthContext";
import { useUsers } from "@hooks/useUsers";
import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";

type Invite = { id: string; mentorId: string; menteeId: string };

export const Route = createFileRoute("/profile/")({
  component: () => {
    const { id } = useAuth();
    const { error: userError, isLoading: userLoading, user } = useUsers(id);

    const [invites, setInvites] = useState<Array<Invite>>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      if (!id) return;
      setLoading(true);
      setError(null);
      getAllMentorMenteeInvites(id)
        .then(setInvites)
        .catch(() => setError("Failed to load invites"))
        .finally(() => setLoading(false));
    }, [id]);

    const handleAccept = async (inviteId: string) => {
      try {
        await acceptMentorMenteeInvite(inviteId);
        setInvites((prev) => prev.filter((i) => i.id !== inviteId));
      } catch {
        setError("Failed to accept invite");
      }
    };
    const handleDecline = async (inviteId: string) => {
      try {
        await deleteMentorMenteeInvite(inviteId);
        setInvites((prev) => prev.filter((i) => i.id !== inviteId));
      } catch {
        setError("Failed to decline invite");
      }
    };

    if (userLoading || loading) return <div className="p-10 text-center">Loading dashboard…</div>;
    if (userError) return <div className="p-10 text-red-600 font-bold text-center">Error: {userError.message}</div>;
    if (error) return <div className="p-10 text-red-600 font-bold text-center">Error: {error}</div>;
    if (!user) return <div className="p-10 text-center text-gray-500">User data unavailable</div>;

    return (
      <div className="mx-auto w-full max-w-6xl px-2 py-4 md:px-4 md:py-8">
        <div className="flex flex-col gap-6 md:flex-row md:gap-8">
          {/* Left Subbox - 1/3 width */}
          <aside className="w-full md:w-1/3">
            <div className="h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-xl shadow-gray-200/40 md:rounded-3xl md:p-8 md:shadow-2xl md:shadow-gray-200/50">
              <div className="mb-6 md:mb-8">
                <h2 className="text-xl font-bold tracking-tight text-saseBlue md:text-2xl">SASE Points</h2>
                <div className="mt-2 h-1 w-12 rounded-full bg-saseGreen"></div>
              </div>

              <div className="space-y-8">
                <div className="text-center">
                  <p className="text-6xl font-black text-saseBlue md:text-8xl">4</p>
                  <p className="mt-2 font-bold uppercase tracking-widest text-saseBlue/40">Total Points</p>
                </div>

                <hr className="border-gray-100" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900">Get more!</h3>
                  </div>
                  
                  <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-saseBlue py-3 font-bold text-white shadow-lg shadow-saseBlue/20 transition-all hover:scale-[1.02] hover:bg-blue-700 active:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Input Code
                  </button>

                  <p className="text-xs leading-relaxed text-gray-400">
                    Get point codes by attending <span className="font-semibold text-gray-600">SASE events</span> like GBMs, Workshops, and <span className="italic text-saseGreen">MORE!</span>
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Subbox - 2/3 width */}
          <main className="w-full md:w-2/3">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl shadow-gray-200/40 md:rounded-3xl md:p-12 md:shadow-2xl md:shadow-gray-200/50">
              <header className="mb-6 md:mb-8">
                <h1 className="text-2xl font-black tracking-tighter text-saseBlue md:text-4xl">SASE Leaderboard</h1>
              </header>

              <div className="space-y-10">
                {/* Podium Section */}
                <section>
                  <div className="flex items-end justify-center gap-2 pt-10 md:gap-4">
                    {/* 2nd Place */}
                    <div className="flex flex-col items-center">
                      <div className="flex h-24 w-20 flex-col items-center justify-start rounded-t-2xl bg-gray-100 shadow-inner md:w-28 md:h-32">
                        <span className="mt-4 text-3xl font-black text-gray-300">2</span>
                      </div>
                      <div className="mt-3 text-center">
                        <p className="text-sm font-bold text-gray-700">Leann T.</p>
                        <p className="text-xs font-medium text-saseBlue">24 pts</p>
                      </div>
                    </div>

                    {/* 1st Place */}
                    <div className="flex flex-col items-center">
                      <div className="relative flex h-36 w-24 flex-col items-center justify-start rounded-t-2xl bg-saseBlue shadow-xl md:w-32 md:h-44">
                        <span className="mt-8 text-4xl font-black text-white/20">1</span>
                      </div>
                      <div className="mt-3 text-center">
                        <p className="text-base font-black text-gray-900">Justin D.</p>
                        <p className="text-sm font-bold text-saseBlue">29 pts</p>
                      </div>
                    </div>

                    {/* 3rd Place */}
                    <div className="flex flex-col items-center">
                      <div className="flex h-16 w-20 flex-col items-center justify-start rounded-t-2xl bg-orange-50 shadow-inner md:w-28 md:h-24">
                        <span className="mt-4 text-3xl font-black text-orange-200">3</span>
                      </div>
                      <div className="mt-3 text-center">
                        <p className="text-sm font-bold text-gray-700">Manav S.</p>
                        <p className="text-xs font-medium text-saseBlue">21 pts</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Leaderboard List */}
                <section className="rounded-3xl bg-gray-50/50 p-3 md:p-6">
                  <div className="space-y-2">
                    {[
                      { rank: 4, name: "Kevin T.", points: "20" },
                      { rank: 5, name: "Helen Z.", points: "18" },
                      { rank: 6, name: "Adriel P.", points: "17" },
                      { rank: 7, name: "Michael H.", points: "15" },
                      { rank: 8, name: "Logan T.", points: "14" },
                      { rank: 9, name: "Kayla C.", points: "12" },
                      { rank: 10, name: "Pryanna P.", points: "10" },
                    ].map((entry) => (
                      <div key={entry.rank} className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm transition-all hover:scale-[1.01] hover:shadow-md">
                        <div className="flex items-center gap-4">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-sm font-bold text-gray-500">{entry.rank}</span>
                          <p className="font-semibold text-gray-900">{entry.name}</p>
                        </div>
                        <p className="font-bold text-saseBlue">{entry.points} pts</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Personal Actions */}
                <div className="space-y-12 border-t border-gray-100 pt-16">
                  {/* Pending Invites */}
                  <section>
                    <div className="mb-6 flex items-center justify-between">
                      <h2 className="text-xl font-bold text-gray-900 md:text-2xl">Personal Invites</h2>
                      <span className="rounded-full bg-saseGreen/10 px-3 py-1 text-xs font-bold text-saseGreen">{invites.length} New</span>
                    </div>

                    {invites.length === 0 ? (
                      <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50/50 p-8 text-center md:p-10">
                        <p className="text-sm font-medium text-gray-400 md:text-base">No pending invites at the moment.</p>
                      </div>
                    ) : (
                      <ul className="grid gap-4">
                        {invites.map((invite) => (
                          <li
                            key={invite.id}
                            className="flex flex-col gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md sm:flex-row sm:items-center sm:justify-between md:rounded-2xl md:p-6"
                          >
                            <div className="flex items-center gap-3 md:gap-4">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-saseBlue/10 text-saseBlue md:h-12 md:w-12">
                                <span className="text-sm font-bold md:text-base">{invite.mentorId.charAt(0).toUpperCase()}</span>
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="truncate font-semibold text-gray-900">Invite from {invite.mentorId}</p>
                                <p className="text-xs text-gray-500 md:text-sm">Mentor Request</p>
                              </div>
                            </div>
                            <div className="flex gap-2 sm:shrink-0">
                              <button
                                onClick={() => handleAccept(invite.id)}
                                className="flex-1 rounded-lg bg-saseGreen px-4 py-2 text-xs font-bold text-white transition-all hover:bg-green-600 hover:shadow-lg active:scale-95 sm:flex-none md:rounded-xl md:px-5 md:py-2 md:text-sm"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => handleDecline(invite.id)}
                                className="flex-1 rounded-lg bg-gray-100 px-4 py-2 text-xs font-bold text-gray-600 transition-all hover:bg-red-50 hover:text-red-600 active:scale-95 sm:shrink-0 sm:flex-none md:rounded-xl md:px-5 md:py-2 md:text-sm"
                              >
                                Decline
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>

                  {/* Customization */}
                  <section>
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-gray-900 md:text-2xl">Customization</h2>
                    </div>
                    <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50/30 p-8 text-center md:p-12">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                        </svg>
                      </div>
                      <p className="font-medium text-gray-500">More customization options coming soon!</p>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  },
});
