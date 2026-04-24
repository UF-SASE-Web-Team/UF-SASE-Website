// src/routes/profile/admin.tsx
import AccountBox from "@/client/components/profile/AccountBox";
import { useAuth } from "@hooks/AuthContext";
import { useUsers } from "@hooks/useUsers";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import React, { useEffect } from "react";

export const Route = createFileRoute("/profile/admin")({
  component: () => {
    const { id, isAdmin } = useAuth();
    const { error, isLoading, users } = useUsers(id);
    const navigate = useNavigate();

    useEffect(() => {
      if (!isAdmin) {
        navigate({ to: "/profile", replace: true });
      }
    }, [isAdmin, navigate]);

    if (!isAdmin) return null;
    if (isLoading) return <div className="p-10 text-center">Loading users…</div>;
    if (error) return <div className="p-10 text-red-600 font-bold">Error: {error.message}</div>;

    return (
      <div className="group mx-auto w-full max-w-5xl rounded-2xl bg-background px-4 py-6 shadow-xl md:px-10">
        <section className="flex w-full flex-col space-y-4">
          <h1 className="text-3xl font-bold text-saseBlue">Admin Dashboard</h1>
          <h2 className="text-xl font-semibold">User Management</h2>
          <div className="flex w-full flex-col gap-6">
            {users && users.length > 0 ? (
              users.map((user) => (
                <AccountBox key={user.id} {...user} adminView={true} />
              ))
            ) : (
              <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-gray-500">
                No users found in the system.
              </div>
            )}
          </div>
        </section>
      </div>
    );
  },
});
