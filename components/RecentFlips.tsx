'use client';

import { useQuery } from '@apollo/client';
import { GET_RECENT_FLIPS } from '@/lib/queries';

const truncateHash = (hash: string) => {
  if (!hash) return '';
  return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
};

const formatTimestamp = (timestamp: string) => {
  const date = new Date(parseInt(timestamp) * 1000);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);

  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return date.toLocaleDateString();
};

const formatEther = (wei: string) => {
  const ether = parseFloat(wei) / 1e18;
  return ether.toFixed(4);
};

export default function RecentFlips() {
  const { loading, error, data } = useQuery(GET_RECENT_FLIPS, {
    variables: { first: 5 },
    pollInterval: 5000, // Poll every 5 seconds for real-time updates
  });

  if (loading) {
    return (
      <div className='space-y-2'>
        {[...Array(3)].map((_, i) => (
          <div key={i} className='animate-pulse bg-gray-100 h-20 rounded' />
        ))}
      </div>
    );
  }

  if (error || !data?.flipResults || data.flipResults.length === 0) {
    return (
      <div className='text-center py-4 text-gray-500 text-sm'>
        No recent flips
      </div>
    );
  }

  return (
    <div className='space-y-2'>
      {data.flipResults.map((flip: any) => {
        const won = flip.payout !== '0';
        const winAmount = won
          ? (parseFloat(flip.payout) - parseFloat(flip.betAmount)) / 1e18
          : 0;

        return (
          <div
            key={flip.id}
            className={`p-3 rounded border ${
              won ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
            }`}
          >
            <div className='flex items-center justify-between'>
              <div className='flex-1'>
                <div className='flex items-center gap-2'>
                  <span className='text-sm font-mono'>
                    {truncateHash(flip.player)}
                  </span>
                  <span className='text-xs text-gray-500'>
                    bet {formatEther(flip.betAmount)} STT
                  </span>
                </div>
                <div className='flex items-center gap-2 mt-1'>
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded ${
                      flip.choice === 'HEADS'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-purple-100 text-purple-700'
                    }`}
                  >
                    {flip.choice}
                  </span>
                  <span className='text-xs text-gray-400'>→</span>
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded ${
                      flip.result === 'HEADS'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-purple-100 text-purple-700'
                    }`}
                  >
                    {flip.result}
                  </span>
                </div>
              </div>
              <div className='text-right'>
                <div
                  className={`text-sm font-semibold ${
                    won ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {won ? `+${winAmount.toFixed(4)} STT` : 'Lost'}
                </div>
                <div className='text-xs text-gray-500'>
                  {formatTimestamp(flip.blockTimestamp)}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className='text-xs text-gray-500 text-center mt-2'>
        Live updates every 5 seconds
      </div>
    </div>
  );
}
