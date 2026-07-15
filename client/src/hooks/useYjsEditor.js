import { useMemo } from 'react';
import createYjsProvider from '../services/yjs/provider';

export const useYjsEditor = (roomId) => {

  const yjs = useMemo(() => {
    const provider = createYjsProvider(roomId);
    return provider;
  }, [roomId]);

  return yjs;
};