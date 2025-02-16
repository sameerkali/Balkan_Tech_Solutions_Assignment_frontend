import React from 'react';
import { Market, TimeFrame } from '../../types/market';
import { Clock } from 'lucide-react';

interface MarketSelectorProps {
  market: Market;
  timeFrame: TimeFrame;
  symbol: string;
  onMarketChange: (market: Market) => void;
  onTimeFrameChange: (timeFrame: TimeFrame) => void;
  onSymbolChange: (symbol: string) => void;
  className?: string;
}

const timeFrames: TimeFrame[] = ['1m', '5m', '15m', '1h', '4h', '1d'];
const popularSymbols = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'AVAXUSDT'];

export const MarketSelector: React.FC<MarketSelectorProps> = ({
  market,
  timeFrame,
  symbol,
  onMarketChange,
  onTimeFrameChange,
  onSymbolChange,
  className = '',
}) => {
  return (
    <div className={`flex items-center space-x-4 bg-gray-800 p-4 rounded-lg ${className}`}>
      <div className="flex space-x-2">
        <button
          onClick={() => onMarketChange('spot')}
          className={`px-4 py-2 rounded-md ${
            market === 'spot'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Spot
        </button>
        <button
          onClick={() => onMarketChange('futures')}
          className={`px-4 py-2 rounded-md ${
            market === 'futures'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Futures
        </button>
      </div>

      <select
        value={symbol}
        onChange={(e) => onSymbolChange(e.target.value)}
        className="bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {popularSymbols.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <div className="flex items-center space-x-2 bg-gray-700 px-3 py-2 rounded-md">
        <Clock className="w-4 h-4 text-gray-400" />
        <div className="flex space-x-1">
          {timeFrames.map((tf) => (
            <button
              key={tf}
              onClick={() => onTimeFrameChange(tf)}
              className={`px-2 py-1 rounded ${
                timeFrame === tf
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-600'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};