"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Status = "loading" | "error" | "success";

export function useFetch<T>(fetcher: () => Promise<T>, deps: unknown[] = []) {
  const [status, setStatus] = useState<Status>("loading");
  const [data, setData] = useState<T | null>(null);
  const [reloadIndex, setReloadIndex] = useState(0);
  const fetcherRef = useRef(fetcher);

  useEffect(() => {
    fetcherRef.current = fetcher;
  });

  useEffect(() => {
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- standard data-fetching pattern: reset to loading before the async call resolves
    setStatus("loading");
    fetcherRef
      .current()
      .then((result) => {
        if (cancelled) return;
        setData(result);
        setStatus("success");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- deps controlled by caller
  }, [...deps, reloadIndex]);

  const refetch = useCallback(() => setReloadIndex((i) => i + 1), []);

  return { status, data, refetch };
}
