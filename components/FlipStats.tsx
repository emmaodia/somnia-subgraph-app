'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_FLIP_RESULTS } from '@/lib/queries';

export default function FlipStats() {
  const [stats, setStats] = useState({
    totalFlips: 0,
    totalVolume: 0,
    totalPayout: 0,
    winRate: 0,
    headsCount: 0,
    tailsCount: 0,
  });

  // Fetch all flips to calculate stats (in a real app, you'd have aggregate queries)
  const { data, loading } = useQuery(GET_FLIP_RESULTS, {
    variables: {
      first: 1000, // Fetch more for better stats
      skip: 0,
      orderBy: 'blockTimestamp',
      orderDirection: 'desc',
    },
  });

  useEffect(() => {
    if (data?.flipResults) {
      const flips = data.flipResults;

      // Calculate statistics
      const totalFlips = flips.length;
      const totalVolume =
        flips.reduce(
          (sum: number, flip: any) => sum + parseFloat(flip.betAmount),
          0
        ) / 1e18;

      const totalPayout =
        flips.reduce(
          (sum: number, flip: any) => sum + parseFloat(flip.payout),
          0
        ) / 1e18;

      const wins = flips.filter((flip: any) => flip.payout !== '0').length;
      const winRate = totalFlips > 0 ? (wins / totalFlips) * 100 : 0;

      const headsCount = flips.filter(
        (flip: any) => flip.result === 'HEADS'
      ).length;
      const tailsCount = flips.filter(
        (flip: any) => flip.result === 'TAILS'
      ).length;

      setStats({
        totalFlips,
        totalVolume,
        totalPayout,
        winRate,
        headsCount,
        tailsCount,
      });
    }
  }, [data]);

  if (loading) {
    return (
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8'>
        {[...Array(6)].map((_, i) => (
          <div key={i} className='animate-pulse bg-gray-100 h-16 rounded' />
        ))}
      </div>
    );
  }

  const statItems = [
    {
      label: 'Total Flips',
      value: stats.totalFlips.toLocaleString(),
      color: 'text-gray-900',
    },
    {
      label: 'Total Volume',
      value: `${stats.totalVolume.toFixed(2)} STT`,
      color: 'text-blue-600',
    },
    {
      label: 'Total Payouts',
      value: `${stats.totalPayout.toFixed(2)} STT`,
      color: 'text-green-600',
    },
    {
      label: 'Win Rate',
      value: `${stats.winRate.toFixed(1)}%`,
      color: stats.winRate > 50 ? 'text-green-600' : 'text-red-600',
    },
    {
      label: 'Heads',
      value: `${stats.headsCount} (${
        stats.totalFlips > 0
          ? ((stats.headsCount / stats.totalFlips) * 100).toFixed(1)
          : 0
      }%)`,
      color: 'text-blue-600',
    },
    {
      label: 'Tails',
      value: `${stats.tailsCount} (${
        stats.totalFlips > 0
          ? ((stats.tailsCount / stats.totalFlips) * 100).toFixed(1)
          : 0
      }%)`,
      color: 'text-purple-600',
    },
  ];

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8'>
      {statItems.map((item, index) => (
        <div
          key={index}
          className='bg-white p-4 rounded border border-gray-200'
        >
          <div className='text-xs text-gray-500'>{item.label}</div>
          <div className={`text-lg font-semibold ${item.color}`}>
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}
