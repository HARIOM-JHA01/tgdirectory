import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type FilterType = 'All features listing' | 'Running' | 'Expired';

interface FeatureListing {
  fid: string;
  sl_link: string;
  start_date: string | null;
  expire_date: string | null;
  days: string;
  country_name: string;
  sl_type: string;
  sl_title: string;
  status: string;
}

const MyFeatureListing: React.FC = () => {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState<FilterType>('All features listing');
  const [listings, setListings] = useState<FeatureListing[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(5); // 👈 Show top 5 initially

  const mapStatus = (status: string): 'Running' | 'Expired' => {
    switch (status) {
      case '4':
        return 'Running';
      case '3':
      default:
        return 'Expired';
    }
  };

  useEffect(() => {
    const fetchFeatureListings = async () => {
      try {
        const response = await axios.get(
          'https://telegramdirectory.org/api/en/my-feature-list?user_id=3143',
          {
            headers: {
              Cookie: 'ci_session_frontend=dnlf4sf5bs367ijtjf8qek2i92965ljq',
            },
          }
        );
        const fetched = response.data?.dataArr || [];
        setListings(fetched);
      } catch (error) {
        console.error('Failed to fetch feature listings:', error);
      }
    };

    fetchFeatureListings();
  }, []);

  const filteredListings = (): FeatureListing[] => {
    if (filterType === 'All features listing') return listings;
    return listings.filter(l => mapStatus(l.status) === filterType);
  };

  const handleSubmittedLinkClick = () => {
    navigate('/my-submitted-links');
  };

  const handleRefreshClick = (id: string) => {
    console.log(`Refresh listing with ID: ${id}`);
  };

  const visibleListings = filteredListings().slice(0, visibleCount); // 👈 Slice top N

  return (
    <Layout bgColor="bg-blue-50">
      <div className="px-4 py-6">
        <div className="flex justify-center mb-4">
          <button
            onClick={handleSubmittedLinkClick}
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 px-6 rounded-md transition duration-200"
          >
            Submitted Link
          </button>
        </div>

        <div className="mb-4">
          <select
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value as FilterType);
              setVisibleCount(5); // 👈 Reset count on filter change
            }}
            className="w-full md:w-80 px-4 py-2.5 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All features listing">All features listing</option>
            <option value="Running">Running</option>
            <option value="Expired">Expired</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="px-4 py-3 text-left text-sm font-medium whitespace-nowrap">Link</th>
                  <th className="px-4 py-3 text-left text-sm font-medium whitespace-nowrap">Start Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium whitespace-nowrap">Expire Date</th>
                  <th className="px-4 py-3 text-center text-sm font-medium whitespace-nowrap">Days</th>
                  <th className="px-4 py-3 text-left text-sm font-medium whitespace-nowrap">Country</th>
                  <th className="px-4 py-3 text-left text-sm font-medium whitespace-nowrap">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-medium whitespace-nowrap">Title</th>
                  <th className="px-4 py-3 text-center text-sm font-medium whitespace-nowrap">Status</th>
                  <th className="px-4 py-3 text-center text-sm font-medium whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {visibleListings.map((listing) => (
                  <tr key={listing.fid} className="hover:bg-blue-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <a
                        href={`https://t.me/${listing.sl_link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {listing.sl_link}
                      </a>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-500">
                      {listing.start_date || '-'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-500">
                      {listing.expire_date || '-'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center">{listing.days}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{listing.country_name}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{listing.sl_type}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{listing.sl_title}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-center">
                      <span
                        className={`inline-block rounded-md px-3 py-1 text-sm font-medium ${
                          mapStatus(listing.status) === 'Running'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {mapStatus(listing.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center">
                      <button
                        onClick={() => handleRefreshClick(listing.fid)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white p-1.5 rounded-md transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            
          </div>
        </div>
        {/* Load More Button */}
        {visibleCount < filteredListings().length && (
              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => setVisibleCount(prev => prev + 5)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md transition duration-200"
                >
                  Load More
                </button>
              </div>
            )}
      </div>
    </Layout>
  );
};

export default MyFeatureListing;
