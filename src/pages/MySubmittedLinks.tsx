import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type SubmittedLink = {
  id: string;
  sl_type: string;
  sl_title: string;
  sl_status: string;
  sl_link: string;
};

const MySubmittedLinks: React.FC = () => {
  const [submittedLinks, setSubmittedLinks] = useState<SubmittedLink[]>([]);
  const navigate = useNavigate();

  const handleMyFeatureListing = () => {
    navigate('/my-feature-listing');
  };

  const handleView = (link: string) => {
    window.open(`https://t.me/${link}`, '_blank'); // Assumes sl_link is Telegram slug
  };

  const handleMakeItFeaturesListing = (linkId: string) => {
    console.log(`Make it features listing for ID: ${linkId}`);
    // Could redirect to feature listing upgrade page
  };

  useEffect(() => {
    const fetchSubmittedLinks = async () => {
      try {
        const response = await axios.get(
          'https://telegramdirectory.org/api/en/submit-list?telegram_id=bonus4you',
          {
            headers: {
              Cookie:
                'ci_session_frontend=a7booq7io5b88ghqll4va8gkvblvgb1i', // optional, if session required
            },
          }
        );
        setSubmittedLinks(response.data || []);
      } catch (error) {
        console.error('Failed to fetch submitted links:', error);
      }
    };

    fetchSubmittedLinks();
  }, []);

  const getStatusText = (status: string) => {
    switch (status) {
      case '1':
        return 'Approved';
      case '0':
        return 'Pending';
      default:
        return 'Rejected';
    }
  };

  return (
    <Layout bgColor="bg-blue-50">
      <div className="px-4 py-6">
        {/* Centered My Feature Listing Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={handleMyFeatureListing}
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 px-6 rounded-md transition duration-200"
          >
            My Feature listing
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full bg-white rounded-lg shadow-md">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
                  <th className="py-3.5 px-4 text-center font-semibold whitespace-nowrap">Action</th>
                  <th className="py-3.5 px-4 text-center font-semibold whitespace-nowrap">Feature Listing</th>
                  <th className="py-3.5 px-4 text-center font-semibold whitespace-nowrap">Type</th>
                  <th className="py-3.5 px-4 text-center font-semibold whitespace-nowrap">Title</th>
                  <th className="py-3.5 px-4 text-center font-semibold whitespace-nowrap">Status</th>
                  <th className="py-3.5 px-4 text-center font-semibold whitespace-nowrap">Link</th>
                </tr>
              </thead>
              <tbody>
                {submittedLinks.map((link) => (
                  <tr
                    key={link.id}
                    className="border-b border-gray-200 hover:bg-blue-50 transition-colors"
                  >
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => handleView(link.sl_link)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded transition duration-200 shadow-sm"
                      >
                        View
                      </button>
                    </td>
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => handleMakeItFeaturesListing(link.id)}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded transition duration-200 shadow-sm"
                      >
                        Make it features listing
                      </button>
                    </td>
                    <td className="py-4 px-4 text-center whitespace-nowrap font-medium">{link.sl_type}</td>
                    <td className="py-4 px-4 text-center whitespace-nowrap">{link.sl_title}</td>
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                          getStatusText(link.sl_status) === 'Approved'
                            ? 'bg-green-100 text-green-800 border border-green-200'
                            : getStatusText(link.sl_status) === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                            : 'bg-red-100 text-red-800 border border-red-200'
                        }`}
                      >
                        {getStatusText(link.sl_status)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <a
                        href={`https://t.me/${link.sl_link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                      >
                        {link.sl_link}
                      </a>
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

export default MySubmittedLinks;
