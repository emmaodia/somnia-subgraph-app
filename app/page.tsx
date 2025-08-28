'use client';

import { useState } from 'react';
import AllFlips from '@/components/AllFlips';
import LiveFeed from '@/components/LiveFeed';

export default function Home() {
  const [activeTab, setActiveTab] = useState('allFlips');

  return (
    <div className='max-w-4xl mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-6'>SomFlip</h1>

      <div className='flex gap-4 mb-6 border-b'>
        <button
          onClick={() => setActiveTab('allFlips')}
          className={`pb-2 px-1 ${
            activeTab === 'allFlips'
              ? 'border-b-2 border-black font-semibold'
              : 'text-gray-500'
          }`}
        >
          All Flips
        </button>
        <button
          onClick={() => setActiveTab('liveFeed')}
          className={`pb-2 px-1 ${
            activeTab === 'liveFeed'
              ? 'border-b-2 border-black font-semibold'
              : 'text-gray-500'
          }`}
        >
          Live Feed
        </button>
      </div>

      {activeTab === 'allFlips' ? <AllFlips /> : <LiveFeed />}
    </div>
  );
}
// 'use client';

// import { useState } from 'react';
// import FlipResults from '@/components/FlipResults';
// import RecentFlips from '@/components/RecentFlips';
// import FlipStats from '@/components/FlipStats';

// export default function Home() {
//   const [activeTab, setActiveTab] = useState('results');

//   return (
//     <div className='min-h-screen bg-gray-50'>
//       <div className='max-w-7xl mx-auto px-4 py-8'>
//         {/* Header */}
//         <div className='mb-8'>
//           <div className='flex items-center gap-3'>
//             <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl'>
//               🪙
//             </div>
//             <div>
//               <h1 className='text-2xl font-semibold text-gray-900'>SomFlip</h1>
//               <p className='text-sm text-gray-500 mt-1'>
//                 Coin Flip Game on Somnia Testnet
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Global Stats */}
//         <FlipStats />

//         {/* Tab Navigation */}
//         <div className='flex gap-4 mb-6 border-b border-gray-200'>
//           <button
//             onClick={() => setActiveTab('results')}
//             className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${
//               activeTab === 'results'
//                 ? 'border-gray-900 text-gray-900'
//                 : 'border-transparent text-gray-500 hover:text-gray-700'
//             }`}
//           >
//             All Flips
//           </button>
//           <button
//             onClick={() => setActiveTab('recent')}
//             className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${
//               activeTab === 'recent'
//                 ? 'border-gray-900 text-gray-900'
//                 : 'border-transparent text-gray-500 hover:text-gray-700'
//             }`}
//           >
//             Live Feed
//           </button>
//         </div>

//         {/* Tab Content */}
//         <div>{activeTab === 'results' ? <FlipResults /> : <RecentFlips />}</div>

//         {/* Footer */}
//         <div className='mt-12 pt-8 border-t border-gray-200'>
//           <p className='text-xs text-gray-500 text-center'>
//             Connected to: {process.env.NEXT_PUBLIC_SUBGRAPH_URL}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
