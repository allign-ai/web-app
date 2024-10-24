import { useMutation, useQuery, useQueryClient, UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { memoryService } from '../services/memoryService';
import type { Memory, CreateUpdateMemory, MemoryQueryParams } from '../services/types';

interface UpdateMemoryParams {
  memoryId: string;
  memory: CreateUpdateMemory;
}

export const useMemories = () => {
  const queryClient = useQueryClient();

  return {
    useGetMemories: (params?: MemoryQueryParams): UseQueryResult<Memory[], Error> =>
      useQuery({
        queryKey: ['memories', params],
        queryFn: () => memoryService.getMemories(params),
      }),

    useGetMemory: (memoryId: string): UseQueryResult<Memory, Error> =>
      useQuery({
        queryKey: ['memories', memoryId],
        queryFn: () => memoryService.getMemory(memoryId),
        enabled: Boolean(memoryId),
      }),

    useGetUserMemories: (userId: string): UseQueryResult<Memory[], Error> =>
      useQuery({
        queryKey: ['users', userId, 'memories'],
        queryFn: () => memoryService.getUserMemories(userId),
        enabled: Boolean(userId),
      }),

    useCreateMemory: (): UseMutationResult<void, Error, CreateUpdateMemory> =>
      useMutation({
        mutationFn: (memory: CreateUpdateMemory) => memoryService.createMemory(memory),
        onSuccess: async (_, variables) => {
          try {
            await Promise.all([
              queryClient.invalidateQueries({ queryKey: ['memories'] }),
              queryClient.invalidateQueries({
                queryKey: ['users', variables.user_id, 'memories']
              })
            ]);
          } catch (error) {
            console.error('Error invalidating memory caches:', error);
          }
        },
      }),

    useUpdateMemory: (): UseMutationResult<void, Error, UpdateMemoryParams> =>
      useMutation({
        mutationFn: ({ memoryId, memory }: UpdateMemoryParams) =>
          memoryService.updateMemory(memoryId, memory),
        onSuccess: async (_, { memory }) => {
          try {
            await Promise.all([
              queryClient.invalidateQueries({ queryKey: ['memories'] }),
              queryClient.invalidateQueries({
                queryKey: ['users', memory.user_id, 'memories']
              })
            ]);
          } catch (error) {
            console.error('Error invalidating memory caches:', error);
          }
        },
      }),

    useDeleteMemory: (): UseMutationResult<void, Error, string> =>
      useMutation({
        mutationFn: (memoryId: string) => memoryService.deleteMemory(memoryId),
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ['memories'] })
            .catch(error => {
              console.error('Error invalidating memories cache:', error);
            });
        },
      }),
  };
};