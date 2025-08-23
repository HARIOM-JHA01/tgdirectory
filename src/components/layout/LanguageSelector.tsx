import React, { useState, useEffect } from 'react';
import { LanguageItem } from '../../types/types';
import languageIcon from '../../assets/language.png';
import Logo from '../../assets/tgd-logo.png';
import { useLanguage } from '../../context/LanguageContext';

interface LanguageSelectorProps {
  onLanguageSelect?: (language: LanguageItem) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onLanguageSelect }) => {
  const [languages, setLanguages] = useState<LanguageItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { language, setLanguage, setLKey } = useLanguage();

  const fetchLanguages = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://telegramdirectory.org/api/getLanguage');
      const data = await response.json();
      if (data.language) {
        setLanguages(data.language);
      }
    } catch (error) {
      console.error('Error fetching languages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  const handleLanguageSelect = (languageItem: LanguageItem) => {
    setLanguage(languageItem.name); // Use the language name as required by the translation API
    if (languageItem.l_key) {
      setLKey(languageItem.l_key);
    }
    setIsOpen(false);
    if (onLanguageSelect) {
      onLanguageSelect(languageItem);
    }
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // Determine currently selected language item to show its flag in the trigger button
  const selectedLanguageItem = languages.find((l) => l.name === language);

  return (
    <>
      {/* Language Button */}
      <button
        onClick={toggleModal}
        className="flex items-center justify-center"
      >
        {/* Use selected language flag, fallback to default icon */}
        <img
          src={selectedLanguageItem?.image || languageIcon}
          alt={selectedLanguageItem?.name || 'Language'}
          className="w-8 h-8 rounded-full object-cover"
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = languageIcon; }}
        />
      </button>

      {/* Modal Overlay - Fixed position with right alignment */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      >
        {/* Semi-transparent backdrop */}
        <div
          className="absolute inset-0 bg-black bg-opacity-40"
          onClick={closeModal}
        ></div>

        {/* Modal Panel - Right aligned, takes up appropriate width */}
        <div
          className={`absolute right-0 top-0 bg-white w-[300px] max-w-sm h-[60vh] shadow-xl transform transition-transform duration-300 z-10 ${isOpen ? 'translate-x-0' : 'translate-x-full'
            } overflow-y-auto rounded-bl-3xl`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="bg-blue-500 p-3 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center">
              <div className=" rounded-full mr-2">
                <img src={Logo} alt="Logo" className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-bold text-white">Select Language</h2>
            </div>
            <button
              onClick={closeModal}
              className="text-white hover:text-gray-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Modal Content - Scrollable */}
          <div className="p-2 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {languages.map((languageItem) => (
                  <button
                    key={languageItem.id}
                    onClick={() => handleLanguageSelect(languageItem)}
                    className={`flex flex-col items-center p-2 ${languageItem.name === language ? 'font-bold text-blue-600' : ''}`}
                  >
                    <div className="w-12 h-12 mb-1 rounded-full overflow-hidden">
                      <img
                        src={languageItem.image}
                        alt={languageItem.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs text-center text-gray-800 line-clamp-2">
                      {languageItem.name}
                    </span>
                    {languageItem.l_key && (
                      <span className="text-[10px] text-gray-500">
                        {languageItem.l_key}
                      </span>
                    )}
                    {languageItem.name === language && (
                      <span className="text-xs text-blue-500 font-semibold">Selected</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LanguageSelector;