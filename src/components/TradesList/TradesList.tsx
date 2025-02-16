import React from 'react';
import { format } from 'date-fns';
import { Trade } from '../../types/market';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

interface TradesListProps {
  trades: Trade[];
  className?: string;
}

export const TradesList: React.FC<TradesListProps> = ({ trades, className = '' }) => {
  return (
    <div className={`bg-gray-900 rounded-lg overflow-hidden ${className}`}>
      <div className="px-4 py-3 bg-gray-800">
        <h2 className="text-lg font-semibold text-white">Recent Trades</h2>
      </div>
      <div className="divide-y h-[27rem] divide-gray-800 overflow-y-auto">
        {trades.map((trade, index) => {
          const isPositive = index > 0 ? trade.price > trades[index - 1].price : true;
          return (
            <div
              key={`${trade.timestamp}-${index}`}
              className="px-4 py-2 flex items-center justify-between hover:bg-gray-800/50"
            >
              <div className="flex items-center space-x-2">
                {isPositive ? (
                  <ArrowUpCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <ArrowDownCircle className="w-4 h-4 text-red-500" />
                )}
                <span className={`font-mono ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                  {trade.price.toFixed(2)}
                </span>
              </div>
              <span className="text-gray-400 font-mono">{trade.quantity.toFixed(6)}</span>
              <span className="text-gray-500 text-sm">
                {format(new Date(trade.timestamp), 'HH:mm:ss')}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};