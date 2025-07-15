import React, { useState } from 'react';
import Layout from '../components/layout/Layout';

type AnnouncementOption = 'About Telegram Directory' | 'Latest News' | 'Updates';

const AnnouncementPage: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<AnnouncementOption>('About Telegram Directory');

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value as AnnouncementOption);
  };

  return (
    <Layout bgColor="bg-blue-50">
      <div className="px-4 py-6">
        {/* Dropdown selector */}
        <div className="mb-6">
          <select
            value={selectedOption}
            onChange={handleOptionChange}
            className="w-full border border-blue-300 rounded-md py-2 px-3 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="About Telegram Directory">About Telegram Directory</option>
            <option value="Latest News">Latest News</option>
            <option value="Updates">Updates</option>
          </select>
        </div>

        {/* Content based on selected option */}
        <div className="bg-white rounded-lg shadow-sm p-5">
          {selectedOption === 'About Telegram Directory' && (
            <div className="prose max-w-none text-gray-700 space-y-4">
              <p>
                We want to building multi language Telegram Directory for user to submit link with Dual Languages Tags for Free Global Marketing. We already cover 30 languages but that is not enough to helping people. We want building smart language system where language when people search one language tag system will find what different languages results as user choice. Let people Go Smart Go Telegram to Building Your Market Your Way.
              </p>
              <p>
                We believe Telegram is good platform for people reaching. So we would like provide this platform for free to connecting more Country Culture more Subscribers.
              </p>
              <h3 className="text-center text-blue-600 font-bold py-2">Our Mission</h3>
              <p className="text-center font-semibold">Building Beautiful Telegram World</p>
              <p className="text-center font-semibold">Our Vision</p>
              <p className="text-center">Share Positive Contents unlimited</p>
              <p className="text-center">Love us and Share to your Friends</p>
            </div>
          )}
          
          {selectedOption === 'Latest News' && (
            <div className="prose max-w-none text-gray-700">
              <p>No latest news available at this time.</p>
            </div>
          )}
          
          {selectedOption === 'Updates' && (
            <div className="prose max-w-none text-gray-700">
              <p>No recent updates available at this time.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AnnouncementPage;