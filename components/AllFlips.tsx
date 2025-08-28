'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_FLIP_RESULTS } from '@/lib/queries';

const truncateHash = (hash: string) =>
  `${hash.slice(0, 6)}...${hash.slice(-4)}`;
const formatEther = (wei: string) => (parseFloat(wei) / 1e18).toFixed(4);
const formatTime = (timestamp: string) =>
  new Date(parseInt(timestamp) * 1000).toLocaleString();

export default function AllFlips() {
  const [page, setPage] = useState(0);
  const { loading, error, data } = useQuery(GET_FLIP_RESULTS, {
    variables: {
      first: 30,
      skip: page * 10,
      orderBy: 'blockTimestamp',
      orderDirection: 'desc',
    },
  });

  if (loading)
    return <div className='text-center py-8 text-gray-500'>Loading...</div>;
  if (error)
    return (
      <div className='text-center py-8 text-red-500'>
        Error: {error.message}
      </div>
    );
  if (!data?.flipResults?.length)
    return <div className='text-center py-8 text-gray-500'>No flips found</div>;

  return (
    <div className='space-y-4'>
      <div className='overflow-x-auto'>
        <table className='w-full text-sm'>
          <thead>
            <tr className='border-b'>
              <th className='text-left py-2'>Player</th>
              <th className='text-left py-2'>Bet</th>
              <th className='text-left py-2'>Choice</th>
              <th className='text-left py-2'>Result</th>
              <th className='text-left py-2'>Payout</th>
              <th className='text-left py-2'>Time</th>
            </tr>
          </thead>
          <tbody>
            {data.flipResults.map((flip: any) => (
              <tr key={flip.id} className='border-b'>
                <td className='py-2 font-mono text-xs'>
                  {truncateHash(flip.player)}
                </td>
                <td className='py-2'>{formatEther(flip.betAmount)} STT</td>
                <td className='py-2'>
                  <span
                    className={
                      flip.choice === 'HEADS'
                        ? 'text-blue-600'
                        : 'text-purple-600'
                    }
                  >
                    {flip.choice}
                  </span>
                </td>
                <td className='py-2'>
                  <span
                    className={
                      flip.result === 'HEADS'
                        ? 'text-blue-600'
                        : 'text-purple-600'
                    }
                  >
                    {flip.result}
                  </span>
                </td>
                <td className='py-2'>
                  <span
                    className={
                      flip.payout !== '0' ? 'text-green-600' : 'text-gray-400'
                    }
                  >
                    {flip.payout !== '0' ? `+${formatEther(flip.payout)}` : '0'}{' '}
                    STT
                  </span>
                </td>
                <td className='py-2 text-xs text-gray-500'>
                  {formatTime(flip.blockTimestamp)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='flex justify-between'>
        <button
          onClick={() => setPage(Math.max(0, page - 1))}
          disabled={page === 0}
          className='px-4 py-2 text-sm bg-gray-100 rounded disabled:opacity-50'
        >
          Previous
        </button>
        <span className='py-2 text-sm text-gray-600'>Page {page + 1}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={data.flipResults.length < 10}
          className='px-4 py-2 text-sm bg-gray-100 rounded disabled:opacity-50'
        >
          Next
        </button>
      </div>
    </div>
  );
}
