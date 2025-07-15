import React, { useState } from 'react';
import Layout from '../components/layout/Layout';

interface TagProps {
  number: number;
  onChange?: (value: string) => void;
}

const Tag: React.FC<TagProps> = ({ number, onChange }) => {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="mb-4">
      <div className="w-full bg-white rounded-lg overflow-hidden border border-gray-300">
        <input 
          type="text" 
          value={value}
          onChange={handleChange}
          placeholder={`Tag ${number}`}
          className="w-full px-4 py-3 text-center text-gray-700"
        />
      </div>
      <p className="text-red-500 text-xs mt-1">Max one space allowed</p>
    </div>
  );
};

const SubmitLink: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'Group' | 'Channel'>('Group');

  return (
    <Layout>
      <div className="min-h-screen bg-blue-50">
        {/* Submit Link Title Button */}
        <div className="px-4 pt-4">
          <div className="bg-blue-500 rounded-lg py-3 text-center">
            <h2 className="text-white text-lg font-medium">Submit Link is Free</h2>
          </div>
        </div>
        
        {/* Promotional Banner */}
        <div className="px-4 pt-4">
          <div className="relative bg-gradient-to-r from-yellow-300 via-pink-300 to-yellow-300 rounded-lg p-4 overflow-hidden">
            <div className="flex items-center">
              {/* Left side with text */}
              <div className="flex-1">
                <div className="text-fuchsia-600 text-xl font-bold">Gain Millions</div>
                <div className="text-fuchsia-600 text-xl font-bold mb-1">Subscribers</div>
                <div className="text-fuchsia-600 text-sm font-medium">
                  is Free for your Channel on Telegram
                </div>
              </div>
              
              {/* Right side with gift boxes */}
              <div className="w-24 h-24 relative">
                <div className="absolute right-0 top-0">
                  <svg viewBox="0 0 50 50" width="80" height="80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="10" y="15" width="30" height="25" rx="2" fill="#FFFFFF"/>
                    <rect x="15" y="5" width="20" height="15" rx="2" fill="#FFFFFF"/>
                    <path d="M25 5 L25 40" stroke="#FF6B6B" strokeWidth="2"/>
                    <path d="M15 20 L35 20" stroke="#FF6B6B" strokeWidth="2"/>
                    <circle cx="25" cy="15" r="5" fill="#FF6B6B"/>
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

        {/* Form Fields */}
        <div className="px-4 pt-4">
          {/* Group or Channel Name */}
          <div className="mb-4">
            <input 
              type="text" 
              placeholder="Group or Channel Name" 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <textarea 
              placeholder="Description" 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 h-32"
            ></textarea>
          </div>

          {/* Link */}
          <div className="mb-4">
            <div className="flex w-full border border-gray-300 rounded-lg overflow-hidden">
              <div className="bg-gray-100 py-3 px-3 text-gray-500">
                https://t.me/
              </div>
              <input 
                type="text" 
                placeholder="Enter Link" 
                className="flex-1 px-4 py-3 text-gray-700 border-none focus:ring-0"
              />
            </div>
          </div>

          {/* Tags */}
          <Tag number={1} />
          <Tag number={2} />
          <Tag number={3} />

          {/* Language Dropdown */}
          <div className="mb-4">
            <select className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 appearance-none bg-white">
              <option value="">Want to add a tag in another language too?</option>
              <option value="en">English</option>
              <option value="zh">Chinese</option>
              <option value="es">Spanish</option>
              <option value="hi">Hindi</option>
              <option value="ar">Arabic</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="mb-8">
            <button className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium">
              Submit
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SubmitLink;