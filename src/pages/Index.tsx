
import { useState } from "react";
import { Button } from "@/components/ui/button";
import MarketChart from "@/components/MarketChart";
import { Exchange, MarketType, Interval } from "@/types/market";

const INTERVALS: Interval[] = ['1m', '5m', '15m', '1h', '4h', '1d'];
const SYMBOLS = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT'] as const;
const EXCHANGES: Exchange[] = ['binance', 'bybit', 'mexc', 'kucoin'];
const MARKET_TYPES: MarketType[] = ['spot', 'futures'];

const Index = () => {
  const [interval, setInterval] = useState<Interval>('1m');
  const [symbol, setSymbol] = useState<typeof SYMBOLS[number]>('BTCUSDT');
  const [exchange, setExchange] = useState<Exchange>('binance');
  const [marketType, setMarketType] = useState<MarketType>('spot');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex flex-wrap gap-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Exchange</h3>
            <div className="flex gap-2">
              {EXCHANGES.map((e) => (
                <Button
                  key={e}
                  variant={exchange === e ? "default" : "outline"}
                  onClick={() => setExchange(e)}
                  className="capitalize"
                >
                  {e}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Market</h3>
            <div className="flex gap-2">
              {MARKET_TYPES.map((m) => (
                <Button
                  key={m}
                  variant={marketType === m ? "default" : "outline"}
                  onClick={() => setMarketType(m)}
                  className="capitalize"
                >
                  {m}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Symbol</h3>
            <div className="flex gap-2">
              {SYMBOLS.map((s) => (
                <Button
                  key={s}
                  variant={symbol === s ? "default" : "outline"}
                  onClick={() => setSymbol(s)}
                >
                  {s}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Interval</h3>
            <div className="flex gap-2">
              {INTERVALS.map((i) => (
                <Button
                  key={i}
                  variant={interval === i ? "default" : "outline"}
                  onClick={() => setInterval(i)}
                >
                  {i}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <MarketChart 
          exchange={exchange}
          market={marketType}
          symbol={symbol} 
          interval={interval}
        />
      </div>
    </div>
  );
};

export default Index;
