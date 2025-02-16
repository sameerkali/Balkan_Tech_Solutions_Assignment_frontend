
import { useState, useEffect } from 'react';
import { Candle, Exchange, MarketType } from '@/types/market';

export const useMarketData = (
  exchange: Exchange,
  market: MarketType,
  symbol: string,
  interval: string = '1m'
) => {
  const [data, setData] = useState<Candle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:6969/api/${exchange}/${market}?symbol=${symbol}&interval=${interval}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        console.log(`[${exchange}/${market}] Data:`, jsonData);
        setData(jsonData);
      } catch (err) {
        console.error(`Error fetching ${exchange}/${market} data:`, err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 60000); // Refresh every minute

    return () => clearInterval(intervalId);
  }, [exchange, market, symbol, interval]);

  return { data, loading, error };
};
