
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Trade, Exchange, MarketType } from '@/types/market';

export const useTradeStream = (
  exchange: Exchange,
  market: MarketType,
  symbol: string
) => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = io('http://localhost:6969');

    socket.on('connect', () => {
      setConnected(true);
      socket.emit('subscribe', { exchange, market, symbol });
      console.log(`[WS] Connected to ${exchange}/${market}/${symbol}`);
    });

    socket.on('trade', (trade: Trade) => {
      console.log(`[WS] New trade:`, trade);
      setTrades((prevTrades) => [trade, ...prevTrades].slice(0, 100));
    });

    socket.on('disconnect', () => {
      console.log(`[WS] Disconnected from ${exchange}/${market}/${symbol}`);
      setConnected(false);
    });

    socket.on('error', (error) => {
      console.error(`[WS] Error:`, error);
    });

    return () => {
      socket.emit('unsubscribe', { exchange, market, symbol });
      socket.disconnect();
    };
  }, [exchange, market, symbol]);

  return { trades, connected };
};
