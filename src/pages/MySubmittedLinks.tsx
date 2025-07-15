import React from 'react';
import Layout from '../components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import { submittedLinks } from '../data/data';

const MySubmittedLinks: React.FC = () => {
  const navigate = useNavigate();
  
  const handleMyFeatureListing = () => {
    navigate('/my-feature-listing');
  };

  const handleView = (link: string) => {
    window.open(link, '_blank');
  };

  const handleMakeItFeaturesListing = (linkId: string) => {
    // Implement feature listing functionality here
    console.log(`Make it features listing for ID: ${linkId}`);
    // Could navigate to a feature upgrade page or show a modal
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

        {/* Improved Table with horizontal scroll */}
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
                  <tr key={link.id} className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => handleView(link.link)}
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
                    <td className="py-4 px-4 text-center whitespace-nowrap font-medium">{link.type}</td>
                    <td className="py-4 px-4 text-center whitespace-nowrap">{link.title}</td>
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                        link.status === 'Approved' 
                          ? 'bg-green-100 text-green-800 border border-green-200' 
                          : link.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                          : 'bg-red-100 text-red-800 border border-red-200'
                      }`}>
                        {link.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <a 
                        href={link.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                      >
                        {link.link}
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