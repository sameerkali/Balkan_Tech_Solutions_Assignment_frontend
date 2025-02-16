import { useState } from 'react';
import { Market, TimeFrame } from './types/market';
import { TradingChart } from './components/Chart/TradingChart';
import { TradesList } from './components/TradesList/TradesList';
import { MarketSelector } from './components/MarketSelector/MarketSelector';
import { useMarketData } from './hooks/useMarketData';
import { useWebSocket } from './hooks/useWebSocket';

function App() {
  const [market, setMarket] = useState<Market>('spot');
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('1m');
  const [symbol, setSymbol] = useState('BTCUSDT');

  const { data: candleData, loading, error: dataError } = useMarketData(symbol, market, timeFrame, 100);
  const { trades, connected, error: wsError } = useWebSocket(market, symbol);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Crypto Trading View</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <MarketSelector
          market={market}
          timeFrame={timeFrame}
          symbol={symbol}
          onMarketChange={setMarket}
          onTimeFrameChange={setTimeFrame}
          onSymbolChange={setSymbol}
          className="mb-6"
        />

        {(dataError || wsError) && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg mb-6">
            {dataError || wsError}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            {loading ? (
              <div className="h-[500px] bg-gray-800 rounded-lg flex items-center justify-center">
                <div className="text-gray-400">Loading chart data...</div>
              </div>
            ) : (
              <TradingChart data={candleData} className="bg-gray-800 rounded-lg p-4" />
            )}
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-gray-400">WebSocket Status</span>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                    connected ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                  }`}
                >
                  {connected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
              <TradesList trades={trades} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;