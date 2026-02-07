import React from 'react'
import DataTable from './DataTable';

interface RecentTradesProps {
  exchanges: Exchange[];
}

const RecentTrades = ({ exchanges }: RecentTradesProps) => {
  
  const columns: DataTableColumn<Exchange>[] = [
    {
      header: 'Exchange',
      cell: (row) => (
        <div className='flex flex-col'>
          <span className='font-semibold text-white'>{row.name}</span>
          <span className='text-xs text-gray-400'>{row.id}</span>
        </div>
      ),
      cellClassName: 'text-left',
    },
    {
      header: 'Country',
      cell: (row) => (
        <span className='text-white'>
          {row.country || 'N/A'}
        </span>
      ),
      cellClassName: 'text-left',
    },
    {
      header: 'Established',
      cell: (row) => (
        <span className='text-white'>
          {row.year_established || 'N/A'}
        </span>
      ),
      cellClassName: 'text-center',
    },
    {
      header: 'Description',
      cell: (row) => (
        <div className='max-w-xs'>
          <p className='text-gray-300 text-sm line-clamp-2'>
            {row.description || '-'}
          </p>
        </div>
      ),
      cellClassName: 'text-left',
    },
  ];

  return (
    <div className='mt-8 space-y-4'>
      <div>
        <h2 className='text-2xl font-bold text-white mb-4'>Top Exchanges</h2>
        <DataTable
          columns={columns}
          data={exchanges}
          rowKey={(row) => row.id}
          tableClassName='w-full'
          headerClassName='bg-dark-500'
          headerCellClassName='text-purple-400'
          bodyRowClassName='hover:bg-dark-400/50'
        />
      </div>
    </div>
  )
}

export default RecentTrades
