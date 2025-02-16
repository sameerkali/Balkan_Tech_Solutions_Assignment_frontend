import { useState, useEffect } from 'react';
import { Candle, Market, TimeFrame } from '../types/market';
import { baseURL } from '../BaseUrl';

interface MarketDataHook {
  data: Candle[];
  loading: boolean;
  error: string | null;
}

export const useMarketData = (
  symbol: string,
  market: Market,
  timeFrame: TimeFrame,
  limit: number = 100
): MarketDataHook => {
  const [data, setData] = useState<Candle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${baseURL}api/${market}?symbol=${symbol}&interval=${timeFrame}&limit=${limit}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch market data');
        }
        
        const jsonData = await response.json();
        setData(jsonData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol, market, timeFrame, limit]);

  return { data, loading, error };
};