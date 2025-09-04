import React, { useState, useEffect } from 'react';
import { BottomBannerItem, BottomBannerResponse } from '../types/types';

interface BottomBannerCarouselProps {
  height?: string;
}

const API_URL = '/api/get-bottom-banner';
const IMAGE_PATH = 'https://telegramdirectory.org/frontend/gallery/';

const BottomBannerCarousel: React.FC<BottomBannerCarouselProps> = () => {
  const [banners, setBanners] = useState<BottomBannerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    let fetchUrl = API_URL;
    try {
      const url = new URL(API_URL, window.location.origin);
      if (url.origin === window.location.origin) {
        fetchUrl = url.pathname + url.search + url.hash;
      }
    } catch {
      // Already relative
    }
    const fetchBannerData = async () => {
      try {
        const response = await fetch(fetchUrl);
        const data: BottomBannerResponse = await response.json();
        if (data.status && data.slider) {
          setBanners(data.slider);
        }
      } catch (error) {
        console.error('Error fetching bottom banners:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBannerData();
  }, []);

  useEffect(() => {
    if (banners.length > 0) {
      const interval = setInterval(() => {
        setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [banners.length]);

  return (
    <div className="px-4 pb-4">
      {loading ? (
        <div className="bg-gray-200 flex items-center justify-center">
          <p className="text-gray-600">Loading banners...</p>
        </div>
      ) : banners.length > 0 ? (
        <div className={`relative overflow-hidden h-[150px]`}>
          {banners.map((banner, index) => (
            <a
              key={banner.id}
              href={banner.gallery_link}
              target="_blank"
              rel="noopener noreferrer"
              className={`absolute inset-0 transition-opacity duration-500 ${index === currentBannerIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              <img
                src={`${IMAGE_PATH}${banner.gallery_image}`}
                alt={banner.gallery_img_alt || 'Banner'}
                className="w-[400px] h-[150px] object-contain"
              />
            </a>
          ))}
        </div>
      ) : (
        <div className="bg-gray-200 rounded-lg p-4 flex items-center justify-center h-16">
          <p className="text-gray-600">No banners available</p>
        </div>
      )}
    </div>
  );
};

export default BottomBannerCarousel;
