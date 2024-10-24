import { QueryObserverResult, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { client } from '../api/client';
import { Memory } from '../types/memory.types';

const fetchMemories = async (): Promise<AxiosResponse<Memory[], any>> => {
  return await client.get<Memory[]>('/v1/memories');
};

export const useFetchMemories = (): QueryObserverResult<Memory[], any> => {
  return useQuery<Memory[], any>({
    queryFn: async () => {
      const { data } = await fetchMemories();
      return data;
    },
    queryKey: [ 'memories' ]
  });
};