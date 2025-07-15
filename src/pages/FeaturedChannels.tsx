import React from 'react';
import Layout from '../components/layout/Layout';
import BannerCarousel from '../components/BannerCarousel';
import { featuredChannels } from '../data/data';

const FeaturedChannels: React.FC = () => {
  const getIconComponent = (icon: string) => {
    switch (icon) {
      case 'IJN':
        return (
          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
            <span className="text-blue-800 font-bold text-lg">IJN</span>
          </div>
        );
      case 'telegram':
        return (
          <div className="w-12 h-12 rounded-lg bg-cyan-500 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.1 14.9l-2-2L12.9 11 11 9.1l-4 4-.9-.9 5-5 5 5-5 5z" />
            </svg>
          </div>
        );
      case 'BK':
        return (
          <div className="w-12 h-12 rounded-lg bg-cyan-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">BK</span>
          </div>
        );
      case 'food':
        return (
          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-12 h-12 rounded-lg bg-gray-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">{icon.substring(0, 2).toUpperCase()}</span>
          </div>
        );
    }
  };

  return (
    <Layout bgColor="bg-blue-50">
      <div className="mt-4">
        {/* Banner Carousel */}
        <BannerCarousel 
          apiUrl="/api/get-top-banner"
          imagePath="https://telegramdirectory.org/frontend/bannersliderimage/"
        />
        
        {/* Featured Channel List */}
        <div className="space-y-1 px-4">
          {featuredChannels.map((channel) => (
            <div key={channel.id} className="bg-white rounded-lg p-3 shadow-sm">
              <div className="flex items-center">
                {/* Icon */}
                {getIconComponent(channel.icon)}
                
                {/* Name and input field */}
                <div className="ml-3 flex-1">
                  <input
                    type="text"
                    readOnly
                    value={channel.name}
                    className="w-full border border-gray-300 rounded-md p-2 text-gray-700"
                  />
                </div>
              </div>
              
              {/* Visit Channel Button */}
              <div className="mt-2">
                <a 
                  href={channel.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full bg-blue-500 text-white text-center py-2 rounded-md font-medium"
                >
                  Visit Channel
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-6 space-x-2">
          <button className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">2</button>
          <button className="w-8 h-8 bg-white border border-gray-300 text-gray-700 rounded-full flex items-center justify-center">3</button>
          <button className="w-8 h-8 bg-white border border-gray-300 text-gray-700 rounded-full flex items-center justify-center">&gt;</button>
          <button className="w-8 h-8 bg-white border border-gray-300 text-gray-700 rounded-full flex items-center justify-center">&raquo;</button>
        </div>
      </div>
    </Layout>
  );
};

export default FeaturedChannels;