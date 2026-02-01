import { fetcher } from '@/lib/coingeko.actions';
import { cn, formatCurrency } from '@/lib/utils';
import { TrendingDown, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import DataTable from '../DataTable';

const columns: DataTableColumn<TrendingCoin>[] = [
  {
    header: 'Name',
    cellClassName: 'name-cell',
    cell: (coin) => {
      const item = coin.item;

      return (
        <Link
          href={`/coins/${item.id}`}
          className="flex items-center gap-2"
        >
          <Image
            src={item.large}
            alt={item.name}
            width={36}
            height={36}
          />
          <span>{item.name}</span>
        </Link>
      );
    },
  },
  {
    header: '24h Change',
    cellClassName: 'change-cell',
    cell: (coin) => {
      const item = coin.item;
      const change = item.data.price_change_percentage_24h.usd;
      const isTrendingUp = change > 0;
      const formatted = `${change > 0 ? '+' : ''}${change.toFixed(2)}%`;

      return (
        <div
          className={cn(
            'flex items-center gap-2 text-sm',
            isTrendingUp ? 'text-green-500' : 'text-red-500'
          )}
        >
          {isTrendingUp ? (
            <TrendingUp size={16} />
          ) : (
            <TrendingDown size={16} />
          )}
          <span>{formatted}</span>
        </div>
      );
    },
  },
  {
    header: 'Price',
    cellClassName: 'price-cell',
    cell: (coin) => (
      <span>
        {formatCurrency(coin.item.data.price, { currency: 'USD' })}
      </span>
    ),
  },
];

const TrendingCoins = async () => {
  const trendingCoins = await fetcher<{ coins: TrendingCoin[] }>(
    'search/trending',
    undefined,
    300
  );

  return (
    <div id="trending-coins">
      <h4>Trending Coins</h4>
      <DataTable
        data={trendingCoins.coins.slice(0, 6) || []}
        columns={columns}
        rowKey={(row) => row.item.id}
        tableClassName="trending-coins-table"
        headerCellClassName="py-3"
        bodyCellClassName="py-2"
      />
    </div>
  );
};

export default TrendingCoins;
