
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

interface Trade {
  symbol: string;
  price: number;
  quantity: number;
  timestamp: string;
}

export const useTradeStream = (market: 'spot' | 'futures', symbol: string) => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = io('http://localhost:6969');

    socket.on('connect', () => {
      setConnected(true);
      socket.emit('subscribe', { market, symbol });
    });

    socket.on('trade', (trade: Trade) => {
      setTrades((prevTrades) => [trade, ...prevTrades].slice(0, 100));
    });

    socket.on('disconnect', () => {
      setConnected(false);
    });

    return () => {
      socket.emit('unsubscribe', { market, symbol });
      socket.disconnect();
    };
  }, [market, symbol]);

  return { trades, connected };
};
