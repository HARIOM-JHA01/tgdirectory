import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import tgdLogo from '../../assets/tgd-logo.png'
import newIcon from '../../assets/new.png'
import announcementIcon from '../../assets/announcement.png'
import profileIcon from '../../assets/profile.png'
import LanguageSelector from './LanguageSelector'
import { LanguageItem } from '../../types/types';

function Header() {
  const navigate = useNavigate();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle language selection
  const handleLanguageSelect = (language: LanguageItem) => {
    console.log('Selected language:', language);
  };

  // Toggle profile menu
  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle menu item clicks
  const handleMenuItemClick = (path: string) => {
    navigate(path);
    setProfileMenuOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-blue-800 to-blue-900 text-white relative">
      {/* Top Navigation Bar */}
      <div className="px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Left side icons */}
          <div className="flex items-center space-x-4">
            <div className="relative" ref={menuRef}>
              <div 
                className="flex items-center justify-center cursor-pointer"
                onClick={toggleProfileMenu}
              >
                <img src={profileIcon} alt="Profile" className="w-6 h-6" />
              </div>
              
              {/* Profile Menu Dropdown */}
              {profileMenuOpen && (
                <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <button
                      onClick={() => handleMenuItemClick('/submit-link')}
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Submit New Link
                    </button>
                    <button
                      onClick={() => handleMenuItemClick('/my-submitted-links')}
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      My Submitted Link
                    </button>
                    <button
                      onClick={() => handleMenuItemClick('/my-feature-listing')}
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      My Feature Listing
                    </button>
                    <button
                      onClick={() => handleMenuItemClick('/buy-tickets')}
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Buy Tickets
                    </button>
                    <button
                      onClick={() => handleMenuItemClick('/ticket-history')}
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Ticket History
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div 
              className="flex items-center justify-center cursor-pointer"
              onClick={() => {navigate('/announcement')}}
            >
              <img src={announcementIcon} alt="Announcement" className="w-6 h-6" />
            </div>
          </div>
          
          {/* Center TGD Logo (1.5x size) */}
          <div 
            className="flex items-center justify-center cursor-pointer"
            onClick={() => {navigate('/')}}
          >
            <img src={tgdLogo} alt="TG Directory" className="w-9 h-9" />
          </div>
          
          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <div 
              className="flex items-center justify-center cursor-pointer"
              onClick={() => {navigate('/featured-channels')}}
            >
              <img src={newIcon} alt="New" className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-center">
              <LanguageSelector onLanguageSelect={handleLanguageSelect} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;