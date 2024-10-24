export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export type CreateUpdateUser = Omit<User, 'id'>;

export interface Memory {
  id: string;
  user_id: string;
  content: string;
  remembered_date: string;
}

export type CreateUpdateMemory = Omit<Memory, 'id'>;

export interface MemoryQueryParams {
  remembered_date?: string;
  sort?: string;
  order?: 'asc' | 'desc';
  user_id?: string;
}

// Add API response types
export type ApiResponse<T> = {
  data: T;
  status: number;
};

// Add error types
export interface ApiError {
  message: string;
  status: number;
}