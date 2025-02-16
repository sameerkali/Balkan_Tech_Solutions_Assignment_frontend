import { useState, useEffect, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { Trade, Market } from '../types/market';
import { baseURL } from '../BaseUrl';

interface WebSocketHook {
  trades: Trade[];
  connected: boolean;
  error: string | null;
}

export const useWebSocket = (market: Market, symbol: string): WebSocketHook => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = useCallback(() => {
    const newSocket = io(`${baseURL}`);
    setSocket(newSocket);
  }, []);

  useEffect(() => {
    connect();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [connect]);

  useEffect(() => {
    if (!socket) return;

    socket.on('connect', () => {
      setConnected(true);
      setError(null);
      socket.emit('subscribe', { market, symbol });
    });

    socket.on('disconnect', () => {
      setConnected(false);
    });

    socket.on('error', (err) => {
      setError(err.message);
    });

    socket.on('trade', (trade: Trade) => {
      setTrades((prevTrades) => [trade, ...prevTrades].slice(0, 100));
    });

    return () => {
      socket.emit('unsubscribe', { market, symbol });
      socket.off('connect');
      socket.off('disconnect');
      socket.off('error');
      socket.off('trade');
    };
  }, [socket, market, symbol]);

  return { trades, connected, error };
};