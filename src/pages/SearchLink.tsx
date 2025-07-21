import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import TopBannerCarousel from '../components/TopBannerCarousel';
import BottomBannerCarousel from '../components/BottomBannerCarousel';

const SearchLink: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'Group' | 'Channel'>('Group');
  const [tag, setTag] = useState('');

  


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for', tag, 'in', selectedType);
  };

  const handleContactUs = () => {
    window.open('https://t.me/tgdirectory_org', '_blank');
  };

  return (
    <Layout bgColor="bg-[#d3edfa]">
      <div className="flex flex-col h-full">
        {/* Contact Us Button */}
        <div className="px-4 pt-4 pb-2">
          <button 
            onClick={handleContactUs}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium"
          >
            Contact Us
          </button>
        </div>

        {/* Promotional Banner */}
        <TopBannerCarousel /> 

        {/* Group/Channel Toggle */}
        <div className="px-4 pt-4">
          <div className="flex bg-white rounded-lg overflow-hidden border border-gray-300">
            <button
              className={`flex-1 py-3 text-center ${
                selectedType === 'Group' ? 'bg-blue-500 text-white' : 'text-gray-700'
              }`}
              onClick={() => setSelectedType('Group')}
            >
              Group
            </button>
            <button
              className={`flex-1 py-3 text-center ${
                selectedType === 'Channel' ? 'bg-blue-500 text-white' : 'text-gray-700'
              }`}
              onClick={() => setSelectedType('Channel')}
            >
              Channel
            </button>
          </div>
        </div>

        {/* Tags Input */}
        <div className="px-4 pt-2">
          <div>
            <p className="text-center text-gray-700 text-sm">Tags</p>
            <div className="relative">
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="Enter tags to search"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700"
              />
              <p className="text-red-500 text-xs mt-1 ml-1">
                Max one space allowed
              </p>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="px-4 pt-2">
          <button
            onClick={handleSearch}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium"
          >
            Search
          </button>
        </div>

        {/* Bottom Banner Carousel */}
        <div className="pt-6 mt-auto">
          <BottomBannerCarousel height="h-[135px]" />
        </div>
      </div>
    </Layout>
  );
};

export default SearchLink;