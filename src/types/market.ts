<<<<<<< HEAD
=======

>>>>>>> 9dcb49d5d98b000cfa69a3a682ef1ddb322c283e
export interface Candle {
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface Trade {
  symbol: string;
  price: number;
  quantity: number;
  timestamp: string;
}

<<<<<<< HEAD
export type Market = 'spot' | 'futures';
export type TimeFrame = '1m' | '5m' | '15m' | '1h' | '4h' | '1d';

export interface MarketState {
  symbol: string;
  market: Market;
  timeFrame: TimeFrame;
}
=======
export type MarketType = 'spot' | 'futures';
export type Exchange = 'binance' | 'bybit' | 'mexc' | 'kucoin';
export type Interval = '1m' | '5m' | '15m' | '1h' | '4h' | '1d';
>>>>>>> 9dcb49d5d98b000cfa69a3a682ef1ddb322c283e
