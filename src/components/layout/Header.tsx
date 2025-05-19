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
    <header className="flex justify-between items-center px-4 sm:px-6 py-4 border-b border-tertiary">
      <button
        className="sm:hidden p-2 text-muted"
        onClick={onOpenSidebar}
      >
        <Menu size={24} />
      </button>

      <div className="flex-1" />

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-tertiary"
        >
          {theme === 'dark' ? (
            <Sun size={20} className="text-primary" />
          ) : (
            <Moon size={20} className="text-primary" />
          )}
        </button>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-tertiary"
          >
            <div className="w-8 h-8 rounded-full bg-tertiary flex items-center justify-center">
              <User size={16} className="text-muted" />
            </div>
            <span className="text-primary">{userEmail}</span>
            <ChevronDown size={16} className="text-muted" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-secondary rounded-lg shadow-xl border border-tertiary">
              <button
                onClick={() => {
                  onClearReviews();
                  setDropdownOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-tertiary text-primary"
              >
                Clear All Reviews
              </button>
              <button
                onClick={() => {
                  signOut();
                  setDropdownOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-tertiary text-primary"
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
