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