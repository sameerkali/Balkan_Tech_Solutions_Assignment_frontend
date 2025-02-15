
import { useState } from "react";
import MarketChart from "@/components/MarketChart";
import { Button } from "@/components/ui/button";

const INTERVALS = ['1m', '5m', '15m', '1h', '4h', '1d'] as const;
const SYMBOLS = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT'] as const;

const Index = () => {
  const [interval, setInterval] = useState<typeof INTERVALS[number]>('1m');
  const [symbol, setSymbol] = useState<typeof SYMBOLS[number]>('BTCUSDT');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex flex-wrap gap-4">
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

        <MarketChart symbol={symbol} interval={interval} />
      </div>
    </div>
  );
};

export default Index;
