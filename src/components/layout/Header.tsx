import React, { useState } from 'react';
import { Sun, Moon, User, ChevronDown, Menu } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { signOut } from '../../lib/supabase';

type HeaderProps = {
  userEmail: string;
  onClearReviews: () => void;
  onOpenSidebar: () => void;
};

const Header: React.FC<HeaderProps> = ({ userEmail, onClearReviews, onOpenSidebar }) => {
  const { theme, toggleTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="flex justify-between items-center mb-8 px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-800">
      <button
        className="sm:hidden p-2 text-gray-600 dark:text-gray-400"
        onClick={onOpenSidebar}
      >
        <Menu size={24} />
      </button>

      <div className="flex-1" /> {/* Spacer */}

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {theme === 'dark' ? (
            <Sun size={20} className="text-gray-800 dark:text-gray-200" />
          ) : (
            <Moon size={20} className="text-gray-800 dark:text-gray-200" />
          )}
        </button>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <User size={16} className="text-gray-600 dark:text-gray-400" />
            </div>
            <span className="font-medium dark:text-gray-200">{userEmail}</span>
            <ChevronDown size={16} className="text-gray-600 dark:text-gray-400" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
              <button
                onClick={() => {
                  onClearReviews();
                  setDropdownOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
              >
                Clear All Reviews
              </button>
              <button
                onClick={() => {
                  signOut();
                  setDropdownOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
