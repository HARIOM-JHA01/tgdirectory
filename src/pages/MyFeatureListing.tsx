import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import { FeatureListing } from '../types/types';
import { featureListings } from '../data/data';

type FilterType = 'All features listing' | 'Running' | 'Expired';

const MyFeatureListing: React.FC = () => {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState<FilterType>('All features listing');
  
  // Function to filter listings based on selected filter
  const filteredListings = (): FeatureListing[] => {
    if (filterType === 'All features listing') {
      return featureListings;
    }
    return featureListings.filter(listing => listing.status === filterType);
  };
  
  const handleSubmittedLinkClick = () => {
    navigate('/my-submitted-links');
  };
  
  const handleRefreshClick = (id: string) => {
    console.log(`Refresh listing with ID: ${id}`);
    // Implementation for refreshing a listing would go here
  };

  return (
    <Layout bgColor="bg-blue-50">
      <div className="px-4 py-6">
        {/* Top action area with "Submitted Link" button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleSubmittedLinkClick}
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 px-6 rounded-md transition duration-200"
          >
            Submitted Link
          </button>
        </div>
        
        {/* Filter dropdown */}
        <div className="mb-4">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as FilterType)}
            className="w-full md:w-80 px-4 py-2.5 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All features listing">All features listing</option>
            <option value="Running">Running</option>
            <option value="Expired">Expired</option>
          </select>
        </div>
        
        {/* Feature listings table */}
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
                {filteredListings().map((listing) => (
                  <tr key={listing.id} className="hover:bg-blue-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <a 
                        href={listing.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {listing.link}
                      </a>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-500">
                      {listing.startDate || '-'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-500">
                      {listing.expireDate || '-'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center">
                      {listing.days}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {listing.country}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {listing.type}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {listing.title}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center">
                      <span
                        className={`inline-block rounded-md px-3 py-1 text-sm font-medium ${
                          listing.status === 'Running'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {listing.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center">
                      <button
                        onClick={() => handleRefreshClick(listing.id)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white p-1.5 rounded-md transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyFeatureListing;