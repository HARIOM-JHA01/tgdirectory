import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { BottomBannerItem, BottomBannerResponse } from '../types/types';

const SearchLink: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'Group' | 'Channel'>('Group');
  const [tag, setTag] = useState('');
  const [bottomBanners, setBottomBanners] = useState<BottomBannerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  

  useEffect(() => {
    // Fetch bottom banner data
    const fetchBottomBanners = async () => {
      try {
        const response = await fetch("https://telegramdirectory.org/api/get-bottom-banner");
        const data: BottomBannerResponse = await response.json();

        if (data.status && data.slider && data.slider.length > 0) {
          setBottomBanners(data.slider);
        }
      } catch (error) {
        console.error("Error fetching bottom banner data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBottomBanners();
  }, []);

  // Auto-rotate carousel every 3 seconds
  useEffect(() => {
    if (bottomBanners.length > 0) {
      const interval = setInterval(() => {
        setCurrentBannerIndex(
          (prevIndex) => (prevIndex + 1) % bottomBanners.length
        );
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [bottomBanners.length]);

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
        <div className="px-4 pt-4">
          <button 
            onClick={handleContactUs}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium"
          >
            Contact Us
          </button>
        </div>

        {/* Promotional Banner */}
        <div className="px-4 pt-4">
          <div className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="text-xl font-bold">Submit 5 Link</div>
                <div className="text-lg font-bold text-yellow-300">Get Free</div>
                <div className="text-sm">10 Weeks Feature Listing</div>
              </div>
              
              <div className="h-16 w-16 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                <div className="h-12 w-12 flex items-center justify-center">
                  {/* Sailboat or similar icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-8 h-8">
                    <path d="M12 1L1 21h22L12 1zm0 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

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
        <div className="px-4 pt-6 mt-auto">
          {loading ? (
            <div className="bg-gray-200 rounded-lg p-4 flex items-center justify-center h-16">
              <p className="text-gray-600">Loading...</p>
            </div>
          ) : bottomBanners.length > 0 ? (
            <div className="relative overflow-hidden rounded-lg h-[135px]">
              {bottomBanners.map((banner, index) => (
                <a
                  key={banner.id}
                  href={banner.gallery_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentBannerIndex
                      ? "opacity-100 z-10"
                      : "opacity-0 z-0"
                  }`}
                >
                  <img
                    src={`https://telegramdirectory.org/frontend/galleryimage/${banner.gallery_image}`}
                    alt={banner.gallery_img_alt || banner.gallery_title || "Banner"}
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </a>
              ))}

              {/* Carousel Navigation Dots */}
              <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2 z-20">
                {bottomBanners.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentBannerIndex(index)}
                    className={`w-1.5 h-1.5 rounded-full ${
                      index === currentBannerIndex
                        ? "bg-white"
                        : "bg-gray-400"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-blue-900 text-white p-4 rounded-lg h-[135px] flex flex-col justify-center items-center text-center">
              <div className="text-xl font-bold">Go Smart</div>
              <div className="text-xl font-bold">Go Telegram</div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SearchLink;