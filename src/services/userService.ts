import { apiClient, handleApiError, getResponseData } from './apiClient';
import { User, CreateUpdateUser } from './types';

export const userService = {
  getUsers: async (): Promise<User[]> => {
    try {
      const response = await apiClient.get<User[]>('/v1/users');
      return getResponseData(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  getUser: async (userId: string): Promise<User> => {
    try {
      const response = await apiClient.get<User>(`/v1/users/${userId}`);
      return getResponseData(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  createUser: async (user: CreateUpdateUser): Promise<void> => {
    try {
      await apiClient.post<void>('/v1/users', user);
    } catch (error) {
      return handleApiError(error);
    }
  },

  updateUser: async (userId: string, user: CreateUpdateUser): Promise<void> => {
    try {
      await apiClient.put<void>(`/v1/users/${userId}`, user);
    } catch (error) {
      return handleApiError(error);
    }
  },

  deleteUser: async (userId: string): Promise<void> => {
    try {
      await apiClient.delete<void>(`/v1/users/${userId}`);
    } catch (error) {
      return handleApiError(error);
    }
  },
};