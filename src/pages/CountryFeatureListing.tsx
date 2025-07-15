import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';

// Define local interface for CountryFeatureListing component
interface Country {
  id: string;
  name: string;
  code: string;
}

interface Channel {
  id: string;
  name: string;
  description: string;
  username: string;
  subscribers: string;
  category: string;
  country: string;
  featured: boolean;
}

const CountryFeatureListing: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country>({ 
    id: '1', 
    name: 'Hong Kong S.A.R.', 
    code: 'HK' 
  });
  const [countries, setCountries] = useState<Country[]>([]);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Mock countries data
    setCountries([
      { id: '1', name: 'Hong Kong S.A.R.', code: 'HK' },
      { id: '2', name: 'United States', code: 'US' },
      { id: '3', name: 'United Kingdom', code: 'UK' },
      { id: '4', name: 'Canada', code: 'CA' },
      { id: '5', name: 'Australia', code: 'AU' },
    ]);

    // Mock channels data
    setChannels([
      {
        id: '1',
        name: 'Tech News HK',
        description: 'Latest technology news and updates from Hong Kong',
        username: 'technewshk',
        subscribers: '125K',
        category: 'Technology',
        country: 'HK',
        featured: true
      },
      {
        id: '2',
        name: 'Hong Kong Trading',
        description: 'Stock market analysis and trading tips for HK market',
        username: 'hktrading',
        subscribers: '89K',
        category: 'Finance',
        country: 'HK',
        featured: true
      },
      {
        id: '3',
        name: 'HK Food Guide',
        description: 'Best restaurants and food recommendations in Hong Kong',
        username: 'hkfoodguide',
        subscribers: '67K',
        category: 'Food',
        country: 'HK',
        featured: true
      }
    ]);
  }, []);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsCountryDropdownOpen(false);
    // Here you would typically fetch channels for the selected country
  };

  const handleVisitChannel = (username: string) => {
    window.open(`https://t.me/${username}`, '_blank');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200">
        {/* Promotional Banner */}
        <div className="mx-4 mt-4">
          <div className="relative bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 rounded-2xl p-6 overflow-hidden">
            {/* Gift boxes illustration would be here */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-purple-600 mb-2">
                  Gain Millions
                </h2>
                <h3 className="text-xl font-bold text-purple-600 mb-3">
                  Subscribers
                </h3>
                <p className="text-purple-700 font-semibold">
                  Is Free for your Channel on Telegram
                </p>
              </div>
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-xs font-bold text-red-500">BONUS</div>
                  <div className="text-xs font-bold text-red-500">FOR YOU</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Country Selection Dropdown */}
        <div className="mx-4 mt-6">
          <div className="relative">
            <button
              onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
              className="w-full bg-white border-2 border-cyan-400 rounded-xl p-4 flex items-center justify-between text-left"
            >
              <span className="text-gray-800 font-medium text-lg">
                {selectedCountry.name}
              </span>
              <svg 
                className={`w-5 h-5 text-gray-600 transition-transform ${
                  isCountryDropdownOpen ? 'rotate-180' : ''
                }`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isCountryDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                {countries.map((country) => (
                  <button
                    key={country.id}
                    onClick={() => handleCountrySelect(country)}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 ${
                      selectedCountry.id === country.id ? 'bg-blue-50 text-blue-600' : 'text-gray-800'
                    }`}
                  >
                    {country.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Channel Listings */}
        <div className="mx-4 mt-6 space-y-4">
          {channels.map((channel) => (
            <div key={channel.id} className="bg-white border-2 border-cyan-400 rounded-2xl p-4">
              <div className="flex items-center space-x-4">
                {/* Telegram Icon */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-cyan-500 rounded-2xl flex items-center justify-center">
                    <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                  </div>
                </div>

                {/* Channel Info */}
                <div className="flex-1 min-w-0">
                  <div className="bg-gray-100 rounded-lg p-3 mb-3">
                    <p className="text-gray-600 text-sm">
                      {channel.description}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => handleVisitChannel(channel.username)}
                    className="w-full bg-gradient-to-r from-cyan-400 to-cyan-500 text-white py-3 rounded-full font-semibold text-lg hover:from-cyan-500 hover:to-cyan-600 transition-all"
                  >
                    Visit channel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mx-4 mt-6 mb-8">
          <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-blue-700 transition-all">
            Load More Channels
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default CountryFeatureListing;