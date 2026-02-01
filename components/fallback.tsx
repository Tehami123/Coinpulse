import React from 'react';
import DataTable from './DataTable';
import { cn } from '@/lib/utils';

export const CoinOverviewFallback = () => {
  return (
    <div id="coin-overview-fallback">
      <div className="header">
        <div className={cn('skeleton header-image')} />
        <div className="info">
          <div className={cn('skeleton header-line-sm')} />
          <div className={cn('skeleton header-line-lg')} />
        </div>
      </div>
    </div>
  );
};

export const TrendingCoinsFallback = () => {
  const columns: DataTableColumn<any>[] = [
    {
      header: 'Name',
      cellClassName: 'name-cell',
      cell: () => (
        <div className="name-link">
          <div className={cn('skeleton name-image')} />
          <div className={cn('skeleton name-line')} />
        </div>
      ),
    },
    {
      header: '24h Change',
      cellClassName: 'change-cell',
      cell: () => (
        <div className="price-change">
          <div className={cn('skeleton change-icon')} />
          <div className={cn('skeleton change-line')} />
        </div>
      ),
    },
    {
      header: 'Price',
      cellClassName: 'price-cell',
      cell: () => <div className={cn('skeleton price-line')} />,
    },
  ];

  return (
    <div id="trending-coins-fallback">
      <h4>Trending Coins</h4>
      <div className="trending-coins-table">
        <DataTable
          data={Array(6).fill({})}
          columns={columns}
          rowKey={(row, i) => i}
          tableClassName="trending-coins-table"
          headerCellClassName="py-3"
          bodyCellClassName="py-2"
        />
      </div>
    </div>
  );
};
