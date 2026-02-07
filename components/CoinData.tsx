import { fetcher } from '@/lib/coingeko.actions';
import { cn, formatCurrency } from '@/lib/utils';
import { TrendingDown, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import Converter from './Converter';

const CoinData = async ({ id,coinData,markets }: { id: string,coinData: CoinDetailsData,markets: CoinMarketData[] }) => {


  // Use percentage change (24h) rather than absolute USD change
  const percentChange =
    coinData.market_data.price_change_percentage_24h_in_currency?.usd ??
    coinData.market_data.price_change_percentage_24h ??
    null;

  const isTrendingUp = (percentChange ?? 0) > 0;
  const formatted =
    percentChange === null || Number.isNaN(percentChange)
      ? '-'
      : `${percentChange > 0 ? '+' : ''}${percentChange.toFixed(2)}%`;

  const thirtyDayPercent =
    coinData.market_data.price_change_percentage_30d_in_currency?.usd ??
    null;

  const priceChange24hAbs =
    coinData.market_data.price_change_24h_in_currency?.usd ??
    coinData.market_data.price_change_24h ??
    null;

  const todayDisplay =
    percentChange === null || Number.isNaN(percentChange)
      ? '-'
      : `${percentChange > 0 ? '+' : ''}${percentChange.toFixed(2)}%`;

  const thirtyDisplay =
    thirtyDayPercent === null || Number.isNaN(thirtyDayPercent)
      ? '-'
      : `${thirtyDayPercent > 0 ? '+' : ''}${thirtyDayPercent.toFixed(2)}%`;

  const price24Display =
    priceChange24hAbs === null || Number.isNaN(priceChange24hAbs)
      ? '-'
      : `${priceChange24hAbs > 0 ? '+' : ''}${formatCurrency(priceChange24hAbs)}`;

  const isUpToday = (percentChange ?? 0) > 0;
  const isUp30 = (thirtyDayPercent ?? 0) > 0;
  const isUp24Abs = (priceChange24hAbs ?? 0) > 0;


  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
      {/* Left Section - Coin Info */}
      <div className="lg:col-span-2">
        <h1 className="font-bold text-5xl sm:text-7xl">{coinData.name}</h1>

        <div className="flex flex-col sm:flex-row items-start sm:items-center mt-6 gap-4">
          <Image
            src={coinData.image.large}
            width={140}
            height={140}
            className="w-28 sm:w-36"
            alt={coinData.name}
          />

          <div className="flex flex-col gap-4">
            <span className="text-6xl sm:text-8xl font-semibold">
              {formatCurrency(coinData.market_data.current_price.usd)}
            </span>

            <div
              className={cn(
                'flex items-center rounded-xl justify-center px-3 py-2 gap-2 text-sm w-fit',
                isTrendingUp ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'
              )}
            >
              <span>{formatted}</span>
              {isTrendingUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span className="text-xs">(24h)</span>
            </div>
          </div>
        </div>

        <div className="price-overview flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mt-8 pt-4 overflow-x-auto">
          <div className="flex flex-col items-center px-6 py-5">
            <h3 className="text-sm text-gray-300">Today</h3>
            <div className={cn('font-medium flex items-center gap-2', isUpToday ? 'text-green-500' : 'text-red-500')}>
              {isUpToday ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span>{todayDisplay}</span>
            </div>
          </div>

          <div className="flex flex-col items-center px-6 border-t sm:border-t-0 sm:border-l border-gray-700 pt-4 sm:pt-0">
            <h3 className="text-sm text-gray-300">30 Days</h3>
            <div className={cn('font-medium flex items-center gap-2', isUp30 ? 'text-green-500' : 'text-red-500')}>
              {isUp30 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span>{thirtyDisplay}</span>
            </div>
          </div>

          <div className="flex flex-col items-center px-6 border-t sm:border-t-0 sm:border-l border-gray-700 pt-4 sm:pt-0">
            <h3 className="text-sm text-gray-300">Price Change (24h)</h3>
            <div className={cn('font-medium flex items-center gap-2', isUp24Abs ? 'text-green-500' : 'text-red-500')}>
              {isUp24Abs ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span>{price24Display}</span>
            </div>
          </div>
        </div>

        <hr className="mt-6 border-gray-700" />
      </div>

      {/* Right Section - Converter Card */}
      <div className="lg:col-span-1 mt-10">
        <div className="bg-dark-500 rounded-lg p-6 sticky top-24">
          <h3 className="text-xl font-semibold mb-6">{coinData.symbol.toUpperCase()} Converter</h3>
          <Converter
            symbol={coinData.symbol}
            icon={coinData.image?.small ?? coinData.image?.large}
            priceList={coinData.market_data.current_price}
          />
        </div>
      </div>
    </div>
  );
}

export default CoinData;
