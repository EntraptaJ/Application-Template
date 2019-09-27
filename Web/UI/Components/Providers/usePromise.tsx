// Web/UI/Components/Providers/usePromise.tsx
import { useState, useMemo, useCallback } from 'react';

export function usePromise<T extends any>(
  promise: () => Promise<T>
): [T, false] | [undefined, true] {
  const [results, setResults] = useState<T>(undefined);
  useMemo(() => {
    if (typeof results !== 'undefined') return 
    
    promise().then((result) => {
      setResults(result)
    })
  }, [promise])

  return useMemo(() => {
    if (typeof results === 'undefined') return [undefined, true];
    else return [results as any, false];
  }, [results]);
}
