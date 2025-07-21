import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import TopBannerCarousel from '../components/TopBannerCarousel';

const SuccessModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-sm w-full">
        <svg className="mx-auto mb-4 w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <h3 className="text-xl font-semibold text-gray-800">Success!</h3>
        <p className="text-gray-600 mt-2">Your link has been submitted successfully.</p>
      </div>
    </div>
  );
};

interface TagProps {
  number: number;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const Tag: React.FC<TagProps> = ({ number, value, onChange, error }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const spaceCount = (newValue.match(/ /g) || []).length;
    if (spaceCount > 1) return;
    onChange(newValue);
  };

  return (
    <div className="mb-4">
      <div className={`w-full bg-white rounded-lg overflow-hidden border ${error ? 'border-red-500' : 'border-gray-300'}`}>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={`Tag ${number}`}
          className="w-full px-4 py-3 text-center text-gray-700"
        />
      </div>
      {error ? (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      ) : (
        <p className="text-gray-500 text-xs mt-1">Max one space allowed</p>
      )}
    </div>
  );
};

const SubmitLink: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'Group' | 'Channel'>('Group');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [showAllTags, setShowAllTags] = useState(false);
  const [tags, setTags] = useState<string[]>(['', '', '', '', '', '']);
  const [languages, setLanguages] = useState<{ id: number; name: string }[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await fetch('/api/getLanguage');
        const data = await res.json();
        const langs = data.data || data.languages || [];
        setLanguages(Array.isArray(langs) ? langs : []);
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    };
    fetchLanguages();
  }, []);

  const handleTagChange = (idx: number, value: string) => {
    setTags((prev) => {
      const updated = [...prev];
      updated[idx] = value;
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    try {
      const formData = new FormData();
      formData.append('sl_type', selectedType);
      formData.append('sl_title', title);
      formData.append('sl_description', description);
      formData.append('sl_link', link.trim());
      formData.append('sl_tag_1', tags[0]);
      formData.append('sl_tag_2', tags[1]);
      formData.append('sl_tag_3', tags[2]);
      formData.append('sl_tag_4', tags[3]);
      formData.append('sl_tag_5', tags[4]);
      formData.append('sl_tag_6', tags[5]);

      const res = await fetch('/api/en/submit-link', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      
      const hasErrors = data.error && Object.keys(data.error).length > 0;

      if (data.status && !hasErrors) {
        setShowSuccessModal(true);
        setTitle('');
        setDescription('');
        setLink('');
        setTags(['', '', '', '', '', '']);
        setSelectedLanguage('');
        setShowAllTags(false);
        setErrors({});
      } else {
        setErrors(data.error || { form: 'Submission failed. Please check your input.' });
      }
    } catch (err) {
      setErrors({ form: 'An unexpected error occurred. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <Layout>
      <SuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
      <div className="min-h-screen bg-blue-50">
        <div className="px-4 pt-4">
          <div className="bg-blue-500 rounded-lg py-3 text-center">
            <h2 className="text-white text-lg font-medium">Submit Link is Free</h2>
          </div>
        </div>

        <div className="pt-4">
          <TopBannerCarousel />
        </div>

        <div className="px-4 pt-4">
          <div className="flex bg-white rounded-lg overflow-hidden border border-gray-300">
            <button
              className={`flex-1 py-3 text-center ${selectedType === 'Group' ? 'bg-blue-500 text-white' : 'text-gray-700'}`}
              onClick={() => setSelectedType('Group')}
            >
              Group
            </button>
            <button
              className={`flex-1 py-3 text-center ${selectedType === 'Channel' ? 'bg-blue-500 text-white' : 'text-gray-700'}`}
              onClick={() => setSelectedType('Channel')}
            >
              Channel
            </button>
          </div>
        </div>

        <div className="px-4 pt-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Group or Channel Name"
                className={`w-full px-4 py-3 rounded-lg border text-gray-700 ${errors.sl_title ? 'border-red-500' : 'border-gray-300'}`}
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
              {errors.sl_title && <p className="text-red-500 text-xs mt-1">{errors.sl_title}</p>}
            </div>

            <div className="mb-4">
              <textarea
                placeholder="Description"
                className={`w-full px-4 py-3 rounded-lg border text-gray-700 h-32 ${errors.sl_description ? 'border-red-500' : 'border-gray-300'}`}
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
              ></textarea>
              {errors.sl_description && <p className="text-red-500 text-xs mt-1">{errors.sl_description}</p>}
            </div>

            <div className="mb-4">
              <div className={`flex w-full border rounded-lg overflow-hidden ${errors.sl_link ? 'border-red-500' : 'border-gray-300'}`}>
                <div className="bg-gray-100 py-3 px-3 text-gray-500">
                  https://t.me/
                </div>
                <input
                  type="text"
                  placeholder="Enter Link"
                  className="flex-1 px-4 py-3 text-gray-700 border-none focus:ring-0"
                  value={link}
                  onChange={e => setLink(e.target.value)}
                  required
                />
              </div>
              {errors.sl_link && <p className="text-red-500 text-xs mt-1">{errors.sl_link}</p>}
            </div>

            {[0, 1, 2].map(i => (
              <Tag 
                key={i} 
                number={i + 1} 
                value={tags[i]} 
                onChange={val => handleTagChange(i, val)}
                error={errors[`sl_tag_${i + 1}`]} 
              />
            ))}

            <div className="mb-4">
              <select
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 appearance-none bg-white"
                value={selectedLanguage}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedLanguage(value);
                  setShowAllTags(value !== '');
                }}
              >
                <option value="">Want to add a tag in another language too?</option>
                {languages.map((lang) => (
                  <option key={lang.id} value={lang.name}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {showAllTags && [3, 4, 5].map(i => (
              <Tag 
                key={i} 
                number={i + 1} 
                value={tags[i]} 
                onChange={val => handleTagChange(i, val)} 
                error={errors[`sl_tag_${i + 1}`]} 
              />
            ))}

            <div className="mb-8">
              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
              {errors.form && (
                 <div className="mt-2 text-center text-sm text-red-600">
                  {errors.form}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SubmitLink;