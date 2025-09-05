import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import TopBannerCarousel from '../components/TopBannerCarousel';

interface ApiChannel {
  sl_title: string;
  sl_description: string;
  sl_link: string;
  sl_avtar: string;
}

const FeaturedChannels: React.FC = () => {
  const [channels, setChannels] = useState<ApiChannel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChannels = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/top-submit-list-new');
        const data = await res.json();
        setChannels(data.dataArr || []);
      } catch (err) {
        setChannels([]);
      } finally {
        setLoading(false);
      }
    };
    fetchChannels();
  }, []);

  const renderAvatar = (channel: ApiChannel) => {
    const defaultLogo = 'https://telegramdirectory.org/img/logo.png';
    if (channel.sl_avtar && channel.sl_avtar.startsWith('http')) {
      return (
        <img
          src={channel.sl_avtar}
          alt={channel.sl_title}
          className="w-20 h-20 min-w-[80px] min-h-[80px] max-w-[80px] max-h-[80px] aspect-square rounded-lg border-blue-300 border-4 object-cover bg-white"
          onError={e => (e.currentTarget.src = defaultLogo)}
        />
      );
    }
    return (
      <svg
        className="w-12 h-12 text-cyan-400"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    );
  };

  return (
    <Layout bgColor="bg-blue-50">
      <div className="">
        {/* Banner Carousel */}
        <TopBannerCarousel height="h-[150px]" />
        {/* Featured Channel List */}
        <div className="space-y-1 px-4">
          {loading ? (
            <div className="text-center py-8 text-blue-500 font-semibold">Loading...</div>
          ) : channels.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No featured channels found.</div>
          ) : (
            channels.map((channel, idx) => (
              <div
                key={idx}
                className="border-2 border-blue-300 rounded-md shadow-sm w-full flex p-2"
              >
                {/* Left Avatar Column */}
                <div className="flex justify-center">
                  <div className="w-full h-full flex items-center justify-center pr-2">
                    {renderAvatar(channel)}
                  </div>
                </div>
                {/* Right Content Column */}
                <div className="w-10/12 flex flex-col justify-center">
                  <input
                    type="text"
                    value={` ${channel.sl_title}`}
                    readOnly
                    className="w-full border-4 border-blue-300 rounded-sm mb-2 py-1 text-gray-800 font-medium"
                  />
                  <button
                    onClick={() =>
                      window.open(
                        channel.sl_link.startsWith('http')
                          ? channel.sl_link
                          : `https://t.me/${channel.sl_link}`,
                        '_blank'
                      )
                    }
                    className="bg-blue-600 text-white py-1 rounded-lg font-medium transition"
                  >
                    Visit channel
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Pagination (static, since API returns top 20 only) */}
        {/* <div className="flex justify-center items-center mt-6 space-x-2">
          <button className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">1</button>
        </div> */}
      </div>
    </Layout>
  );
};

export default FeaturedChannels;