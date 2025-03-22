import { useState, useEffect, useCallback } from "react";
import { UseQueryResult } from "../interfaces";
import { QueryFunction } from "../types";

function useQuery<T>(
  queryFn: QueryFunction<T>,
  dependencies: any[] = [],
  options?: { enabled?: boolean }
): UseQueryResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    setIsFetching(true);
    setError(null);
    try {
      if (options?.enabled) {
        const result = await queryFn();
        setData(result);
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsFetching(false);
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, isFetching, refetch: fetchData };
}

export default useQuery;
