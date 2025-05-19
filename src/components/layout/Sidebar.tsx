// sidebar.tsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Home, X } from 'lucide-react';

type SidebarProps = {
  genres: string[];
  onGenreSelect: (genre: string) => void;
  open?: boolean; // NEW: is the sidebar open (mobile)
  onClose?: () => void; // NEW: close handler (mobile)
};

const Sidebar: React.FC<SidebarProps> = ({ genres, onGenreSelect, open = false, onClose }) => {
  const navigate = useNavigate();
  const { genreName } = useParams<{ genreName?: string }>();

  const handleHomeClick = () => {
    onGenreSelect('home');
    navigate('/');
    if (onClose) onClose();
  };

  const handleGenreClick = (genre: string) => {
    onGenreSelect(genre);
    navigate(`/genre/${genre.toLowerCase()}`);
    if (onClose) onClose();
  };

  // Sidebar content
  const sidebarContent = (
    <div className="sidebar w-64 p-6 h-full bg-white dark:bg-gray-900 flex flex-col">
      {/* Close button for mobile */}
      {onClose && (
        <button
          className="block sm:hidden ml-auto mb-4 p-2"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <X size={24} />
        </button>
      )}
      <h1 className="text-2xl font-bold mb-8" style={{ color: 'var(--accent-color)' }}>Yfitops</h1>
      <h2 className="uppercase text-xs font-bold tracking-wider mb-4" style={{ color: 'var(--text-muted)' }}>
        Browse Music
      </h2>
      <div className="space-y-2">
        <button
          className={`sidebar-button ${!genreName ? 'active' : ''}`}
          onClick={handleHomeClick}
        >
          <div className="flex items-center">
            <Home className="mr-3" size={18} />
            <span>Home</span>
          </div>
        </button>

        <div className="border-t border-gray-800 my-3"></div>

        {genres.map(genre => (
          <button
            key={genre}
            className={`sidebar-button ${genreName === genre.toLowerCase() ? 'active' : ''}`}
            onClick={() => handleGenreClick(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );

  // Desktop sidebar
  return (
    <>
      {/* Overlay and drawer for mobile */}
      <div
        className={`
          fixed inset-0 z-40 bg-black bg-opacity-40 transition-opacity duration-200
          ${open ? 'block sm:hidden' : 'hidden'}
        `}
        onClick={onClose}
        aria-label="Sidebar overlay"
      />
      <aside
        className={`
          fixed z-50 top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-200
          ${open ? 'translate-x-0' : '-translate-x-full'} 
          sm:static sm:translate-x-0 sm:block
        `}
        style={{ height: '100vh' }}
      >
        {sidebarContent}
      </aside>
      {/* Spacer for desktop layout */}
      <div className="hidden sm:block w-64 flex-shrink-0" />
    </>
  );
};

export default Sidebar;
