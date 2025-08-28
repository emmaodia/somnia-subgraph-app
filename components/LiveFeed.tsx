'use client';

import { useQuery } from '@apollo/client';
import { GET_RECENT_FLIPS } from '@/lib/queries';

const truncateHash = (hash: string) =>
  `${hash.slice(0, 6)}...${hash.slice(-4)}`;
const formatEther = (wei: string) => (parseFloat(wei) / 1e18).toFixed(4);

export default function LiveFeed() {
  const { loading, error, data } = useQuery(GET_RECENT_FLIPS, {
    variables: { first: 30 },
    pollInterval: 5000, // Refresh every 5 seconds
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
    return (
      <div className='text-center py-8 text-gray-500'>No recent flips</div>
    );

  return (
    <div className='space-y-2'>
      {data.flipResults.map((flip: any) => {
        const won = flip.payout !== '0';
        return (
          <div
            key={flip.id}
            className={`p-3 rounded border ${
              won ? 'border-green-200 bg-green-50' : 'border-gray-200'
            }`}
          >
            <div className='flex justify-between items-center'>
              <div>
                <span className='font-mono text-sm'>
                  {truncateHash(flip.player)}
                </span>
                <span className='text-sm text-gray-500 ml-2'>
                  bet {formatEther(flip.betAmount)} STT
                </span>
              </div>
              <div className='text-right'>
                <div className='text-sm'>
                  <span
                    className={
                      flip.choice === 'HEADS'
                        ? 'text-blue-600'
                        : 'text-purple-600'
                    }
                  >
                    {flip.choice}
                  </span>
                  <span className='mx-1'>→</span>
                  <span
                    className={
                      flip.result === 'HEADS'
                        ? 'text-blue-600'
                        : 'text-purple-600'
                    }
                  >
                    {flip.result}
                  </span>
                </div>
                <div
                  className={`text-sm font-semibold ${
                    won ? 'text-green-600' : 'text-gray-400'
                  }`}
                >
                  {won ? `Won ${formatEther(flip.payout)} STT` : 'Lost'}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <p className='text-center text-xs text-gray-500 pt-2'>
        Auto-refreshing every 5 seconds
      </p>
    </div>
  );
}
