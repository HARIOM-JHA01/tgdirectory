import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import BannerCarousel from '../components/TopBannerCarousel';

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
    const defaultLogo = 'https://telegram.org/img/t_logo.png';
    if (channel.sl_avtar) {
      if (channel.sl_avtar.startsWith('data:image')) {
        return (
          <img
            src={channel.sl_avtar}
            alt={channel.sl_title}
            className="w-24 h-24 rounded-lg object-cover border border-blue-300 bg-white"
            onError={e => (e.currentTarget.src = defaultLogo)}
          />
        );
      }
      if (channel.sl_avtar.startsWith('http')) {
        return (
          <img
            src={channel.sl_avtar}
            alt={channel.sl_title}
            className="w-24 h-24 rounded-lg object-cover border border-blue-300 bg-white"
            onError={e => (e.currentTarget.src = defaultLogo)}
          />
        );
      }
    }
    // fallback to default logo
    return (
      <img
        src={defaultLogo}
        alt="TGD Logo"
        className="w-24 h-24 rounded-lg object-cover border border-blue-300 bg-white"
      />
    );
  };

  return (
    <Layout bgColor="bg-blue-50">
      <div className="mt-4">
        {/* Banner Carousel */}
        <BannerCarousel />
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
                className="bg-[#b3e6ff] border-2 border-[#33c3ff] rounded-xl p-3 flex flex-row items-center space-x-4 w-full overflow-x-auto"
              >
                {/* Avatar on the left */}
                {renderAvatar(channel)}
                {/* Channel Info on the right */}
                <div className="flex-1 flex flex-col gap-2 w-full">
                  <input
                    type="text"
                    value={channel.sl_title}
                    readOnly
                    className="bg-white border border-blue-200 rounded-md px-3 py-2 text-lg font-normal text-gray-700 focus:outline-none cursor-default w-full min-w-0"
                  />
                  <a
                    href={`https://t.me/${channel.sl_link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#00aaff] hover:bg-[#0099dd] text-white rounded-md py-2 text-lg font-normal transition-colors w-full text-center"
                  >
                    Visit Channel
                  </a>
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