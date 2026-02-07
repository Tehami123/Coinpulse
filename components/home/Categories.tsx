import { fetcher } from '@/lib/coingeko.actions';
import React from 'react';
import DataTable from '../DataTable';
import Image from 'next/image';
import { cn, formatCurrency } from '@/lib/utils';
import { TrendingDown, TrendingUp } from 'lucide-react';

const Categories = async () => {
  const categories = await fetcher<Category[]>('coins/categories');
  const columns: DataTableColumn<Category>[] = [
    {
      header: 'Category',
      cellClassName: 'category-cell',
      cell: (category) => category.name,
    },
    {
      header: 'Top Gainers',
      cellClassName: 'top-gainers-cell',
      cell: (category) =>category.top_3_coins.map((coin)=>{
          return(
            <Image src={coin} width={28} alt='coin' key={coin} height={28}  />
          )
        })
        
      ,
      
    },{
      header:'24h Change',
      cellClassName:'name-cell',
      cell:(category)=>{
       const item = category.market_cap_change_24h
      const change = item;
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
      }

    },{
      header:'Market Cap',
      cellClassName:'market-cap-cell',
      cell:(category)=>{
        return (
          <div>
            {formatCurrency(category.market_cap)}
          </div>
        )
      }
    },
    
    {
      header:'24h Volume',
      cellClassName:'volume-cell',
      cell:(category)=>{
        return (
          <div>
            {formatCurrency(category.volume_24h)}
          </div>
        )
      }
    }
  ];

  // console.log(categories);

  return (
    <div id="categories" className="custom-scrollbar">
      <h4>Top Categories</h4>
      <DataTable
        columns={columns}
        data={categories?.slice(0, 10)}
        rowKey={(_, index) => index}
        tableClassName='mt-3'
      />
    </div>
  );
};

export default Categories;
