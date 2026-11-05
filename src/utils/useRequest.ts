import { useCallback, useEffect, useState } from "react";
import { getApiErrorMessage } from "../api/errors";

export function useRequest<T>(
  request: () => Promise<T>,
  deps: React.DependencyList,
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoRequest = useCallback(request, deps);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);

    memoRequest()
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch((e: unknown) => {
        if (!cancelled) setError(getApiErrorMessage(e));
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [memoRequest, reloadKey]);

  const reload = useCallback(() => setReloadKey((k) => k + 1), []);

  return { data, error, isLoading, reload };
}
