import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';

// Local interface definition
interface Channel {
  id: string;
  name: string;
  description: string;
  username: string;
  subscribers: string;
  category: string;
  featured: boolean;
}

const GlobalFeatureListing: React.FC = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Mock channels data
    setChannels([
      {
        id: '1',
        name: 'Tech Updates',
        description: 'Latest technology news and updates from around the world. Daily tech insights, reviews, and innovations.',
        username: 'techupdates',
        subscribers: '345K',
        category: 'Technology',
        featured: true
      },
      {
        id: '2',
        name: 'Global Trading',
        description: 'International stock market analysis and trading tips for global markets. Financial insights and investment strategies.',
        username: 'globaltrading',
        subscribers: '217K',
        category: 'Finance',
        featured: true
      },
      {
        id: '3',
        name: 'Travel Destinations',
        description: 'Discover beautiful destinations around the world. Travel tips, hidden gems, and breathtaking photography.',
        username: 'traveldestinations',
        subscribers: '189K',
        category: 'Travel',
        featured: true
      },
      {
        id: '4',
        name: 'Crypto News',
        description: 'Latest cryptocurrency news, blockchain updates, and market analysis. Stay informed about Bitcoin, Ethereum, and altcoins.',
        username: 'cryptonews',
        subscribers: '431K',
        category: 'Cryptocurrency',
        featured: true
      }
    ]);
  }, []);

  const handleVisitChannel = (username: string) => {
    window.open(`https://t.me/${username}`, '_blank');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200">
        {/* Promotional Banner */}
        <div className="mx-4 mt-4">
          <div className="relative bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 rounded-2xl p-6 overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-indigo-700 mb-2">
                  Global Channels
                </h2>
                <h3 className="text-xl font-bold text-indigo-700 mb-3">
                  Reach Worldwide
                </h3>
                <p className="text-indigo-800 font-semibold">
                  Connect with millions of users across the globe
                </p>
              </div>
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-xs font-bold text-blue-500">GLOBAL</div>
                  <div className="text-xs font-bold text-blue-500">FEATURED</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Featured Title */}
        <div className="mx-4 mt-6">
          <div className="bg-white border-2 border-purple-400 rounded-xl p-4">
            <h2 className="text-center text-xl font-bold text-purple-600">
              Globally Featured Telegram Channels
            </h2>
          </div>
        </div>

        {/* Channel Listings */}
        <div className="mx-4 mt-6 space-y-4">
          {channels.map((channel) => (
            <div key={channel.id} className="bg-white border-2 border-purple-400 rounded-2xl p-4">
              <div className="flex items-center space-x-4">
                {/* Telegram Icon */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center">
                    <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                  </div>
                </div>

                {/* Channel Info */}
                <div className="flex-1 min-w-0">
                  <div className="bg-gray-100 rounded-lg p-3 mb-3">
                    <p className="text-gray-600 text-sm">
                      {channel.description}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => handleVisitChannel(channel.username)}
                    className="w-full bg-gradient-to-r from-purple-400 to-purple-500 text-white py-3 rounded-full font-semibold text-lg hover:from-purple-500 hover:to-purple-600 transition-all"
                  >
                    Visit channel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mx-4 mt-6 mb-8">
          <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-indigo-600 hover:to-purple-700 transition-all">
            Load More Global Channels
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default GlobalFeatureListing;