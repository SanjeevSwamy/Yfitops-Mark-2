import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Home, X } from 'lucide-react';

type SidebarProps = {
  genres: string[];
  onGenreSelect: (genre: string) => void;
  open?: boolean;
  onClose?: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ genres, onGenreSelect, open = false, onClose }) => {
  const navigate = useNavigate();
  const { genreName } = useParams<{ genreName?: string }>();

  const handleHomeClick = () => {
    onGenreSelect('home');
    navigate('/');
    onClose?.();
  };

  const handleGenreClick = (genre: string) => {
    onGenreSelect(genre);
    navigate(`/genre/${genre.toLowerCase()}`);
    onClose?.();
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity sm:hidden ${
          open ? 'block' : 'hidden'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`
          bg-[var(--sidebar-bg)]
          h-screen
          flex-shrink-0
          w-64
          p-6
          z-50
          fixed top-0 left-0
          transition-transform duration-200
          ${open ? 'translate-x-0' : '-translate-x-full'}
          sm:static sm:block sm:translate-x-0
          shadow-lg
        `}
        style={{ minHeight: '100vh' }}
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-accent">Yfitops</h1>
          <button
            className="sm:hidden p-2 text-muted"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <nav>
          <button
            className={`sidebar-button w-full text-left px-4 py-2 rounded-lg mb-2 ${
              !genreName ? 'active' : ''
            }`}
            onClick={handleHomeClick}
          >
            <div className="flex items-center">
              <Home className="mr-3" size={18} />
              <span>Home</span>
            </div>
          </button>

          <div className="border-t border-gray-200 dark:border-gray-800 my-4" />

          <div className="space-y-2">
            {genres.map(genre => (
              <button
                key={genre}
                className={`sidebar-button w-full text-left px-4 py-2 rounded-lg ${
                  genreName === genre.toLowerCase() ? 'active' : ''
                }`}
                onClick={() => handleGenreClick(genre)}
              >
                {genre}
              </button>
            ))}
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
