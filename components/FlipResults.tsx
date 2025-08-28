'use client';
import Link from 'next/link';

import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_FLIP_RESULTS } from '@/lib/queries';

const truncateHash = (hash: string) => {
  if (!hash) return '';
  return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
};

const formatTimestamp = (timestamp: string) => {
  const date = new Date(parseInt(timestamp) * 1000);
  return date.toLocaleString();
};

const formatEther = (wei: string) => {
  const ether = parseFloat(wei) / 1e18;
  return ether.toFixed(4);
};

interface SortIconProps {
  field: string;
}

export default function FlipResults() {
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState('blockTimestamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const itemsPerPage = 10;

  const { loading, error, data, refetch } = useQuery(GET_FLIP_RESULTS, {
    variables: {
      first: itemsPerPage,
      skip: page * itemsPerPage,
      orderBy: sortBy,
      orderDirection: sortDirection,
    },
  });

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('desc');
    }
    setPage(0);
  };

  const SortIcon = ({ field }: SortIconProps) => {
    if (sortBy !== field)
      return <span className='text-gray-400 text-xs ml-1'>↕</span>;
    return sortDirection === 'desc' ? (
      <span className='text-blue-600 text-xs ml-1'>↓</span>
    ) : (
      <span className='text-blue-600 text-xs ml-1'>↑</span>
    );
  };

  if (loading) {
    return (
      <div className='space-y-2'>
        {[...Array(5)].map((_, i) => (
          <div key={i} className='animate-pulse bg-gray-100 h-12 rounded' />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-red-50 border border-red-200 rounded p-4'>
        <div className='text-red-600'>Error loading flip results</div>
        <div className='text-red-500 text-sm mt-1'>{error.message}</div>
        <button
          onClick={() => refetch()}
          className='mt-2 text-sm text-red-600 underline'
        >
          Try again
        </button>
      </div>
    );
  }

  if (!data?.flipResults || data.flipResults.length === 0) {
    return (
      <div className='text-center py-8 text-gray-500'>
        No flip results found
      </div>
    );
  }

  return (
    <>
      <div className='bg-white rounded border border-gray-200 overflow-hidden'>
        <table className='min-w-full'>
          <thead className='bg-gray-50 border-b border-gray-200'>
            <tr>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-700'>
                Player
              </th>
              <th
                className='px-4 py-2 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100'
                onClick={() => handleSort('betAmount')}
              >
                Bet <SortIcon field='betAmount' />
              </th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-700'>
                Choice
              </th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-700'>
                Result
              </th>
              <th
                className='px-4 py-2 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100'
                onClick={() => handleSort('payout')}
              >
                Payout <SortIcon field='payout' />
              </th>
              <th
                className='px-4 py-2 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100'
                onClick={() => handleSort('blockTimestamp')}
              >
                Time <SortIcon field='blockTimestamp' />
              </th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-700'>
                Tx
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {data.flipResults.map((flip: any) => {
              const won = flip.payout !== '0';
              return (
                <tr key={flip.id} className='hover:bg-gray-50'>
                  <td className='px-4 py-2 text-sm font-mono'>
                    {truncateHash(flip.player)}
                  </td>
                  <td className='px-4 py-2 text-sm'>
                    {formatEther(flip.betAmount)} STT
                  </td>
                  <td className='px-4 py-2 text-sm'>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        flip.choice === 'HEADS'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {flip.choice}
                    </span>
                  </td>
                  <td className='px-4 py-2 text-sm'>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        flip.result === 'HEADS'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {flip.result}
                    </span>
                  </td>
                  <td className='px-4 py-2 text-sm'>
                    <span
                      className={
                        won ? 'text-green-600 font-semibold' : 'text-gray-500'
                      }
                    >
                      {won ? `+${formatEther(flip.payout)} STT` : '0 STT'}
                    </span>
                  </td>
                  <td className='px-4 py-2 text-sm text-gray-500'>
                    {formatTimestamp(flip.blockTimestamp)}
                  </td>
                  <td
                    className='px-4 py-2 text-sm'
                    rel='noopener noreferrer'
                    //   className="text-blue-600 hover:underline"
                  >
                    <Link
                      href={`https://shannon-explorer.somnia.network/tx/${flip.transactionHash}`}
                    ></Link>
                    {truncateHash(flip.transactionHash)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className='mt-4 flex items-center justify-between'>
        <button
          onClick={() => setPage(Math.max(0, page - 1))}
          disabled={page === 0}
          className='px-4 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          Previous
        </button>
        <span className='text-sm text-gray-600'>Page {page + 1}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={data.flipResults.length < itemsPerPage}
          className='px-4 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          Next
        </button>
      </div>
    </>
  );
}
