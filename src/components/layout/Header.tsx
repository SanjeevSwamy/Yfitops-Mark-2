// header.tsx
import React, { useState } from 'react';
import { Sun, Moon, User, ChevronDown, Menu } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { signOut } from '../../lib/supabase';

type HeaderProps = {
  userEmail: string;
  onClearReviews: () => void;
  onOpenSidebar: () => void; // NEW PROP
};

const Header: React.FC<HeaderProps> = ({ userEmail, onClearReviews, onOpenSidebar }) => {
  const { theme, toggleTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleToggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  };

  React.useEffect(() => {
    const handleClickOutside = () => setDropdownOpen(false);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header className="flex justify-between items-center mb-8 px-2 sm:px-0">
      {/* Hamburger for mobile */}
      <button
        className="block sm:hidden p-2 mr-2"
        aria-label="Open sidebar"
        onClick={onOpenSidebar}
      >
        <Menu size={28} />
      </button>
      <h1 className="text-3xl font-bold flex-1 text-center sm:text-left"></h1>
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
            <div className="dropdown-menu absolute right-0 mt-2 w-48 py-2 shadow-lg z-10 bg-white dark:bg-gray-800">
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
