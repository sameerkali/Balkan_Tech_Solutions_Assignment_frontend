
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

export type MarketType = 'spot' | 'futures';
export type Exchange = 'binance' | 'bybit' | 'mexc' | 'kucoin';
export type Interval = '1m' | '5m' | '15m' | '1h' | '4h' | '1d';
