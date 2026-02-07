import CandlestickChart from '@/components/CandlestickChart';
import CoinData from '@/components/CoinData';
import RecentTrades from '@/components/RecentTrades';
import { fetcher } from '@/lib/coingeko.actions';
import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';
import React from 'react'


const page = async ({params}:NextPageProps) => {

    const {id} = await params;

    const coinOHLCData = await fetcher<OHLCData[]>(`coins/${id}/ohlc`, {
        vs_currency: 'usd',
        days: '1',
        precision: 'full',
      });

        const coinData = await fetcher<CoinDetailsData>(`/coins/${id}`);
        const exchanges = await fetcher<Exchange[]>(`/exchanges`);
        

        console.log(exchanges);
        

  const markets = await fetcher<CoinMarketData[]>('/coins/markets', {
    vs_currency: 'usd',
    order: 'market_cap_desc',
    per_page: '250',
    sparkline: 'false',
  }).catch(() => []);
  // console.log(coinData);
  return (
    <main className='p-8'>
        <CoinData  id={id} coinData={coinData} markets={markets}/>

        <div>
            <CandlestickChart data={coinOHLCData} coinId={id}>
                 <div className="flex gap-2 pt-2">
                          <Image
                            src={coinData.image.large}
                            alt={coinData.name}
                            width={56}
                            height={56}
                          />
                          <div className="info">
                            <p>
                              {coinData.name} / {coinData.symbol.toUpperCase()}
                            </p>
                            <h1>
                              {formatCurrency(coinData.market_data.current_price.usd, {
                                currency: 'USD',
                              })}
                            </h1>
                          </div>
                        </div>
            </CandlestickChart>
        </div>

        <hr className='mt-10' />

       <div className='mt-14'>
        <RecentTrades exchanges={exchanges}/>

       </div>




    </main>
  )
}

export default page
