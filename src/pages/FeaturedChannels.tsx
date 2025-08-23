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
        const res = await fetch('https://telegramdirectory.org/api/top-submit-list-new');
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
    const defaultLogo = '/tgd-logo.png';
    if (channel.sl_avtar) {
      if (channel.sl_avtar.startsWith('data:image')) {
        return (
          <img
            src={channel.sl_avtar}
            alt={channel.sl_title}
            className="w-12 h-12 rounded-lg object-cover border border-blue-300 bg-white"
            onError={e => (e.currentTarget.src = defaultLogo)}
          />
        );
      }
      if (channel.sl_avtar.startsWith('http')) {
        return (
          <img
            src={channel.sl_avtar}
            alt={channel.sl_title}
            className="w-12 h-12 rounded-lg object-cover border border-blue-300 bg-white"
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
        className="w-12 h-12 rounded-lg object-cover border border-blue-300 bg-white"
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
            channels.map((channel) => (
              <div key={channel.sl_link} className="bg-white rounded-lg p-3 shadow-sm">
                <div className="flex items-center">
                  {/* Avatar */}
                  {renderAvatar(channel)}
                  {/* Name and input field */}
                  <div className="ml-3 flex-1">
                    <input
                      type="text"
                      readOnly
                      value={channel.sl_title}
                      className="w-full border border-gray-300 rounded-md p-2 text-gray-700"
                    />
                  </div>
                </div>
                {/* Visit Channel Button */}
                <div className="mt-2">
                  <a
                    href={`https://t.me/${channel.sl_link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-blue-500 text-white text-center py-2 rounded-md font-medium"
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