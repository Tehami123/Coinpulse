import { fetcher } from '@/lib/coingeko.actions';
import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const CoinOverview = async () => {
  const coin = await fetcher<CoinDetailsData>('coins/bitcoin', {
    dex_pair_format: 'symbol',
  });

  return (
    <Link href={`/coins/${coin.id}`} id="coin-overview">
      <div className="header pt-2">
        <Image src={coin.image.large} alt={coin.name} width={56} height={56} />
        <div className="info">
          <p>
            {coin.name} / {coin.symbol.toUpperCase()}
          </p>
          <h1>
            {formatCurrency(coin.market_data.current_price.usd, {
              currency: 'USD',
            })}
          </h1>
        </div>
      </div>
    </Link>
  );
};

export default CoinOverview;
