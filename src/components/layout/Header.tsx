import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import tgdLogo from '../../assets/tgd-logo.png'
import newIcon from '../../assets/new.png'
import announcementIcon from '../../assets/announcement.png'
import profileIcon from '../../assets/profile.png'
import LanguageSelector from './LanguageSelector'
import { LanguageItem } from '../../types/types';
import { Link, Star, Ticket, Clock, Send } from "lucide-react";

interface MenuItemProps {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, text, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition duration-150 ease-in-out"
    role="menuitem"
  >
    {icon}
    <span>{text}</span>
  </button>
);

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
                <img src={profileIcon} alt="Profile" className="w-8 h-8" />
              </div>
              
              {/* Profile Menu Dropdown */}
              {profileMenuOpen && (
                <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div
                    className="bg-white rounded-xl shadow-xl p-2 w-64 divide-y divide-gray-200"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <MenuItem
                      icon={<Send size={16} />}
                      text="Submit New Link"
                      onClick={() => handleMenuItemClick('/submit-link')}
                    />
                    <MenuItem
                      icon={<Link size={16} />}
                      text="My Submitted Links"
                      onClick={() => handleMenuItemClick('/my-submitted-links')}
                    />
                    <MenuItem
                      icon={<Star size={16} />}
                      text="My Feature Listing"
                      onClick={() => handleMenuItemClick('/my-feature-listing')}
                    />
                    <MenuItem
                      icon={<Ticket size={16} />}
                      text="Buy Tickets"
                      onClick={() => handleMenuItemClick('/buy-tickets')}
                    />
                    <MenuItem
                      icon={<Clock size={16} />}
                      text="Ticket History"
                      onClick={() => handleMenuItemClick('/ticket-history')}
                    />
                  </div>
                </div>
              )}
            </div>
            <div 
              className="flex items-center justify-center cursor-pointer"
              onClick={() => {navigate('/announcement')}}
            >
              <img src={announcementIcon} alt="Announcement" className="w-8 h-8" />
            </div>
          </div>
          
          {/* Center TGD Logo (1.5x size) */}
          <div 
            className="flex items-center justify-center cursor-pointer"
            onClick={() => {navigate('/')}}
          >
            <img src={tgdLogo} alt="TG Directory" className="w-12 h-12" />
          </div>
          
          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <div 
              className="flex items-center justify-center cursor-pointer"
              onClick={() => {navigate('/featured-channels')}}
            >
              <img src={newIcon} alt="New" className="w-8 h-8" />
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