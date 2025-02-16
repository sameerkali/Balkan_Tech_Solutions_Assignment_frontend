
import { useState, useEffect } from 'react';

interface Candle {
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export const useMarketData = (symbol: string, interval: string = '1m') => {
  const [data, setData] = useState<Candle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:6969/api/spot?symbol=${symbol}&interval=${interval}`
        );
        const jsonData = await response.json();
        console.log("jsonData: ---- ::", jsonData)
        setData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, [symbol, interval]);

  return { data, loading, error };
};
