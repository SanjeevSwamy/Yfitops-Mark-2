import React, { useState } from 'react';
import { Sun, Moon, User, ChevronDown } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { signOut } from '../../lib/supabase';

type HeaderProps = {
  userEmail: string;
  onClearReviews: () => void;
};

const Header: React.FC<HeaderProps> = ({ userEmail, onClearReviews }) => {
  const { theme, toggleTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const handleToggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  };
  
  // Close dropdown when clicking elsewhere
  React.useEffect(() => {
    const handleClickOutside = () => setDropdownOpen(false);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);
  
  return (
    <header className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold"></h1>
      <div className="flex items-center space-x-3">
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        
        <div className="relative">
          <div 
            className="user-menu flex items-center space-x-2 px-2 py-1 cursor-pointer"
            onClick={handleToggleDropdown}
          >
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
              <User size={14} />
            </div>
            <span className="font-medium pr-2">{userEmail}</span>
            <ChevronDown size={14} />
          </div>
          
          {dropdownOpen && (
            <div className="dropdown-menu absolute right-0 mt-2 w-48 py-2 shadow-lg z-10">
              <a 
                href="#" 
                className="block px-4 py-2 text-sm hover:bg-gray-700"
                onClick={(e) => {
                  e.preventDefault();
                  onClearReviews();
                  setDropdownOpen(false);
                }}
              >
                Clear All Reviews
              </a>
              <a 
                href="#" 
                className="block px-4 py-2 text-sm hover:bg-gray-700"
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                Log out
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;