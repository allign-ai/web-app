import { useState } from 'react';
// import { useMemories } from '../../hooks/useMemories';
// import type { MemoryQueryParams } from '../../services/types';
import {useFetchMemories} from "../../hooks/useFetchMemories.ts";

export default function ListMemories() {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  //const { useGetMemories } = useMemories();

  // const params: MemoryQueryParams = {
  //   sort: 'remembered_date',
  //   order: sortOrder
  // };

  const { data: memories, isLoading, isError } = useFetchMemories();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-gray-500">Loading memories...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">Error loading memories: {isError.message}</p>
      </div>
    );
  }

  if (!memories?.length) {
    return (
      <div className="p-6 text-center bg-gray-50 rounded-lg">
        <p className="text-gray-500">No memories found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Memories</h2>
        <button
          onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
          className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900
                   border rounded-md hover:bg-gray-50 transition-colors"
        >
          Sort {sortOrder === 'asc' ? '↓' : '↑'}
        </button>
      </div>

      <div className="grid gap-4">
        {memories.map(memory => (
          <div
            key={memory.id}
            className="p-4 bg-white rounded-lg border border-gray-200
                     shadow-sm hover:shadow-md transition-shadow"
          >
            <p className="text-gray-900 mb-2">{memory.content}</p>
            <div className="flex items-center text-sm text-gray-500">
              <time dateTime={memory.remembered_date}>
                {new Date(memory.remembered_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}