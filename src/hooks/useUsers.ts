import { useMutation, useQuery, useQueryClient, UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { userService } from '../services/userService';
import type { User, CreateUpdateUser } from '../services/types';

interface UpdateUserParams {
  userId: string;
  user: CreateUpdateUser;
}

export const useUsers = () => {
  const queryClient = useQueryClient();

  return {
    useGetUsers: (): UseQueryResult<User[], Error> =>
      useQuery({
        queryKey: ['users'],
        queryFn: userService.getUsers,
      }),

    useGetUser: (userId: string): UseQueryResult<User, Error> =>
      useQuery({
        queryKey: ['users', userId],
        queryFn: () => userService.getUser(userId),
        enabled: Boolean(userId),
      }),

    useCreateUser: (): UseMutationResult<void, Error, CreateUpdateUser> =>
      useMutation({
        mutationFn: (user: CreateUpdateUser) => userService.createUser(user),
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ['users'] })
            .catch(error => {
              console.error('Error invalidating users cache:', error);
            });
        },
      }),

    useUpdateUser: (): UseMutationResult<void, Error, UpdateUserParams> =>
      useMutation({
        mutationFn: ({ userId, user }: UpdateUserParams) =>
          userService.updateUser(userId, user),
        onSuccess: async (_, { userId }) => {
          try {
            await Promise.all([
              queryClient.invalidateQueries({ queryKey: ['users'] }),
              queryClient.invalidateQueries({ queryKey: ['users', userId] })
            ]);
          } catch (error) {
            console.error('Error invalidating user caches:', error);
          }
        },
      }),

    useDeleteUser: (): UseMutationResult<void, Error, string> =>
      useMutation({
        mutationFn: (userId: string) => userService.deleteUser(userId),
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ['users'] })
            .catch(error => {
              console.error('Error invalidating users cache:', error);
            });
        },
      }),
  };
};