import { useState, useEffect } from 'react';
<<<<<<< HEAD
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
=======
import { Candle, Exchange, MarketType } from '@/types/market';

export const useMarketData = (
  exchange: Exchange,
  market: MarketType,
  symbol: string,
  interval: string = '1m'
) => {
>>>>>>> 9dcb49d5d98b000cfa69a3a682ef1ddb322c283e
  const [data, setData] = useState<Candle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
<<<<<<< HEAD
          `${baseURL}api/${market}?symbol=${symbol}&interval=${timeFrame}&limit=${limit}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch market data');
        }
        
        const jsonData = await response.json();
=======
          `http://localhost:6969/api/${exchange}/${market}?symbol=${symbol}&interval=${interval}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        console.log(`[${exchange}/${market}] Data:`, jsonData);
>>>>>>> 9dcb49d5d98b000cfa69a3a682ef1ddb322c283e
        setData(jsonData);
        setError(null);
      } catch (err) {
        console.error(`Error fetching ${exchange}/${market} data:`, err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
<<<<<<< HEAD
  }, [symbol, market, timeFrame, limit]);
=======
    const intervalId = setInterval(fetchData, 60000); // Refresh every minute

    return () => clearInterval(intervalId);
  }, [exchange, market, symbol, interval]);
>>>>>>> 9dcb49d5d98b000cfa69a3a682ef1ddb322c283e

  return { data, loading, error };
};