import { apiClient, handleApiError, getResponseData } from './apiClient';
import { Memory, CreateUpdateMemory, MemoryQueryParams } from './types';

export const memoryService = {
  getMemories: async (params?: MemoryQueryParams): Promise<Memory[]> => {
    try {
      const response = await apiClient.get<Memory[]>('/v1/memories', { params });
      console.log(getResponseData(response))
      return getResponseData(response) ?? [];
    } catch (error) {
      return handleApiError(error);
    }
  },

  getMemory: async (memoryId: string): Promise<Memory> => {
    try {
      const response = await apiClient.get<Memory>(`/v1/memories/${memoryId}`);
      return getResponseData(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  createMemory: async (memory: CreateUpdateMemory): Promise<void> => {
    try {
      await apiClient.post<void>('/v1/memories', memory);
    } catch (error) {
      return handleApiError(error);
    }
  },

  updateMemory: async (memoryId: string, memory: CreateUpdateMemory): Promise<void> => {
    try {
      await apiClient.put<void>(`/v1/memories/${memoryId}`, memory);
    } catch (error) {
      return handleApiError(error);
    }
  },

  deleteMemory: async (memoryId: string): Promise<void> => {
    try {
      await apiClient.delete<void>(`/v1/memories/${memoryId}`);
    } catch (error) {
      return handleApiError(error);
    }
  },

  getUserMemories: async (userId: string): Promise<Memory[]> => {
    try {
      const response = await apiClient.get<Memory[]>(`/users/${userId}/memories`);
      return getResponseData(response);
    } catch (error) {
      return handleApiError(error);
    }
  },
};