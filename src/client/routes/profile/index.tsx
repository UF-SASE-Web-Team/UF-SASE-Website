// src/routes/profile/index.tsx
import { acceptMentorMenteeInvite, deleteMentorMenteeInvite, getAllMentorMenteeInvites } from "@/client/api/mentorMentee";
import AccountBox from "@/client/components/profile/AccountBox";
import { useAuth } from "@hooks/AuthContext";
import { useUsers } from "@hooks/useUsers";
import type { User } from "@shared/schema/userSchema";
import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";

type Invite = { id: string; mentorId: string; menteeId: string };

export const Route = createFileRoute("/profile/")({
  component: () => {
    const { id, isAdmin } = useAuth();
    const { error: userError, isLoading: userLoading, isLoadingUsers, user, users } = useUsers(id);

    const [invites, setInvites] = useState<Array<Invite>>([]);
    const [allUsers, setAllUsers] = useState<Array<User>>([]);
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
      try {
        setLoading(true);
        console.log(users);
        const userArray: Array<User> = [];
        users?.forEach((user) => {
          const userObj: User = { ...user, password: "······" };
          userArray.push(userObj);
        });
        setAllUsers(userArray);
        console.log(allUsers);
      } catch {
        setError("Failed to retrieve all users list");
      }
    }, [id, isLoadingUsers]);

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

    if (userLoading || loading) return <div>Loading…</div>;
    if (userError) return <div className="text-red-600">Error: {userError.message}</div>;
    if (error) return <div className="text-red-600">Error: {error}</div>;
    if (!user) return <div>User data unavailable</div>;

    return (
      <div className="flex min-h-screen justify-center bg-gray-50 py-8">
        {/* Centered card just like AccountBox */}
        <div className="w-full max-w-4xl space-y-10 rounded-2xl bg-white px-10 py-8 shadow-xl">
          <h1 className="text-2xl font-bold">Dashboard</h1>

          {/* Pending Invites */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Pending Invites</h2>
            {invites.length === 0 ? (
              <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-gray-500">No pending invites.</div>
            ) : (
              <ul className="space-y-3">
                {invites.map((invite) => (
                  <li key={invite.id} className="flex items-center justify-between rounded-lg border px-4 py-3">
                    <span>
                      Invite from <strong>{invite.mentorId}</strong>
                    </span>
                    <div className="space-x-2">
                      <button onClick={() => handleAccept(invite.id)} className="rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600">
                        Accept
                      </button>
                      <button onClick={() => handleDecline(invite.id)} className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600">
                        Decline
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Roles (placeholder) */}
          {isAdmin && (
            <section className="flex w-full flex-col space-y-4">
              <h1 className="text-3xl font-bold text-saseBlue">Admin Dashboard</h1>
              <h2 className="text-xl font-semibold">Users</h2>
              {loading ? (
                <p>Loading users...</p>
              ) : (
                <div className="flex w-full flex-col gap-6">
                  {users != undefined ? (
                    users.length > 0 ? (
                      users.map((user) => <AccountBox key={user.id} {...user} adminView={true} />)
                    ) : (
                      <p>No Users found</p>
                    )
                  ) : (
                    <div>Users could not be loaded</div>
                  )}
                </div>
              )}
            </section>
          )}

          {/* Customization (placeholder) */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Customization</h2>
            <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-gray-500">Nothing to configure yet.</div>
          </section>
        </div>
      </div>
    );
  },
});
