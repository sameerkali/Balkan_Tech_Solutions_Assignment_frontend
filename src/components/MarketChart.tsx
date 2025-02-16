
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useMarketData } from '@/hooks/useMarketData';
import { useTradeStream } from '@/hooks/useTradeStream';
import { Exchange, MarketType } from '@/types/market';

interface MarketChartProps {
  exchange: Exchange;
  market: MarketType;
  symbol: string;
  interval: string;
}

const MarketChart = ({ exchange, market, symbol, interval }: MarketChartProps) => {
  const { data, loading, error } = useMarketData(exchange, market, symbol, interval);
  const { trades, connected } = useTradeStream(exchange, market, symbol);

  const formatData = data.map((item) => ({
    ...item,
    time: new Date(item.timestamp).toLocaleTimeString(),
  }));

  if (loading) return <div className="flex items-center justify-center h-64">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {exchange.toUpperCase()} {market.toUpperCase()} - {symbol}
        </h2>
        <div className={`px-3 py-1 rounded-full text-sm ${connected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {connected ? 'Connected' : 'Disconnected'}
        </div>
      </div>
      
      <div className="h-96 bg-white rounded-lg shadow p-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={formatData}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="close" stroke="#8884d8" fillOpacity={1} fill="url(#colorPrice)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-xl font-semibold mb-4">Live Trades</h3>
        <div className="max-h-60 overflow-y-auto">
          {trades.map((trade, index) => (
            <div 
              key={index}
              className="flex justify-between py-2 border-b last:border-0"
            >
              <span>{new Date(trade.timestamp).toLocaleTimeString()}</span>
              <span className="font-mono">{trade.price.toFixed(2)}</span>
              <span className="text-gray-600">{trade.quantity.toFixed(6)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketChart;
