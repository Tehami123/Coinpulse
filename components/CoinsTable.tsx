'use client';

import { cn, formatCurrency } from '@/lib/utils';
import { TrendingDown, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import DataTable from './DataTable';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface CoinsTableProps {
  coins: CoinMarketData[];
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}

export default function CoinsTable({
  coins,
  currentPage,
  totalPages,
  itemsPerPage,
}: CoinsTableProps) {
  const columns: DataTableColumn<CoinMarketData>[] = [
    {
      header: 'Rank',
      cellClassName: 'rank-cell',
      cell: (coins) => (
        <Link href={`/coins/${coins.id}`} className="rank-link">
          #{coins.market_cap_rank}
        </Link>
      ),
    },
    {
      header: 'Token',
      cellClassName: 'token-cell',
      cell: (coin) => (
        <div className="token-info">
          <img src={coin.image} alt={coin.name} width={36} height={36} />
          <p>
            {coin.name} ({coin.symbol.toUpperCase()})
          </p>
        </div>
      ),
    },
    {
      header: 'Price',
      cellClassName: 'price-cell',
      cell: (coin) => formatCurrency(coin.current_price),
    },
    {
      header: '24h Change',
      cellClassName: 'change-cell',
      cell: (coin) => {
        const change = coin.price_change_percentage_24h;
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
      header: 'Market Cap',
      cellClassName: 'market-cap-cell',
      cell: (coin) => formatCurrency(coin.market_cap),
    },
  ];

  return (
    <>
      <DataTable
        tableClassName="coins-table"
        columns={columns}
        data={coins}
        rowKey={(coin) => coin.id}
      />

      <div className="pagination-wrapper">
        <Pagination>
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious href={`/coins?page=${currentPage - 1}`} />
              </PaginationItem>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href={`/coins?page=${page}`}
                      isActive={page === currentPage}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              }

              if (page === currentPage - 2 || page === currentPage + 2) {
                return (
                  <PaginationItem key={`ellipsis-${page}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }

              return null;
            })}

            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext href={`/coins?page=${currentPage + 1}`} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}
