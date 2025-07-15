import React, { useState, useEffect } from 'react';
import { BannerItem, BannerResponse } from '../types/types';

interface BannerCarouselProps {
  apiUrl: string;
  imagePath: string;
  height?: string;
}

const BannerCarousel: React.FC<BannerCarouselProps> = ({ apiUrl, imagePath, height = 'h-[135px]' }) => {
  const [banners, setBanners] = useState<BannerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    // Fetch banner data
    const fetchBannerData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data: BannerResponse = await response.json();

        if (data.status && data.slider) {
          setBanners(data.slider);
        }
      } catch (error) {
        console.error("Error fetching banner data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBannerData();
  }, [apiUrl]);

  // Auto-rotate carousel every 3 seconds
  useEffect(() => {
    if (banners.length > 0) {
      const interval = setInterval(() => {
        setCurrentBannerIndex(
          (prevIndex) => (prevIndex + 1) % banners.length
        );
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [banners.length]);

  return (
    <div className="px-4 pb-4">
      {loading ? (
        <div className="bg-gray-200 rounded-lg p-4 flex items-center justify-center h-16">
          <p className="text-gray-600">Loading banners...</p>
        </div>
      ) : banners.length > 0 ? (
        <div className={`relative overflow-hidden rounded-lg ${height}`}>
          {banners.map((banner, index) => (
            <a
              key={banner.id}
              href={banner.slider_link}
              target="_blank"
              rel="noopener noreferrer"
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentBannerIndex
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0"
              }`}
            >
              <img
                src={`${imagePath}${banner.slider_banner_image}`}
                alt={banner.slider_banner_img_alt || "Banner"}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </a>
          ))}

          {/* Carousel Navigation Dots */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2 z-20">
            {banners.map((_, index) => (
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
        <div className="bg-gray-200 rounded-lg p-4 flex items-center justify-center h-16">
          <p className="text-gray-600">No banners available</p>
        </div>
      )}
    </div>
  );
};

export default BannerCarousel;