import { useState, useEffect } from 'react';

export function useRateLimit() {
  const [remaining, setRemaining] = useState<number | null>(null);
  const [resetTime, setResetTime] = useState<Date | null>(null);

  useEffect(() => {
    // TODO: Fetch rate limit status from GitHub API
  }, []);

  return { remaining, resetTime };
}
