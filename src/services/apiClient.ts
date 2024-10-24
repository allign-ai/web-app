// client.ts
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios';
import { ApiError } from './types';

const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000') as string;

export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = sessionStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiError>;

    // Handle 401 Unauthorized
    if (axiosError.response?.status === 401) {
      sessionStorage.removeItem('token');
      // window.location.href = '/sign-in';
    }

    throw new Error(
      axiosError.response?.data?.message ||
      axiosError.message ||
      'An error occurred'
    );
  }
  throw error;
};

// Type-safe response wrapper
export const getResponseData = <T>(response: AxiosResponse<T>): T => response.data;