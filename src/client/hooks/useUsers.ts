import type { InsertUser, UpdateUser } from "@schema/userSchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, deleteUser, fetchUser, fetchUsers, updateUser } from "../api/users";

export const useUsers = (id: string) => {
  const queryClient = useQueryClient();

  // Fetch a specific user
  const userQuery = useQuery({
    queryKey: ["user", id],
    queryFn: () => (id ? fetchUser(id) : Promise.reject("User ID is required")),
  });

  // Fetch all users
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const createUserMutation = useMutation({
    mutationFn: (newUser: InsertUser) => createUser(newUser),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const updateUserMutation = useMutation({
    mutationFn: (updatedUser: UpdateUser) => updateUser(updatedUser),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const deleteUserMutation = useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  return {
    // single‐user
    user: userQuery.data,
    isLoading: userQuery.isLoading,
    error: userQuery.error,

    // all‐users
    users: usersQuery.data,
    isLoadingUsers: usersQuery.isLoading,
    errorUsers: usersQuery.error,

    // mutations
    createUser: createUserMutation,
    updateUser: updateUserMutation,
    deleteUser: deleteUserMutation,
  };
};
