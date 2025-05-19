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
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity sm:hidden ${
          open ? 'block' : 'hidden'
        }`}
        onClick={onClose}
      />
      
      <aside
        className={`fixed z-50 top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-200
          ${open ? 'translate-x-0' : '-translate-x-full'} 
          sm:static sm:translate-x-0`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-green-500">Yfitops</h1>
            <button
              className="sm:hidden p-2 text-gray-600 dark:text-gray-400"
              onClick={onClose}
            >
              <X size={20} />
            </button>
          </div>

          <nav>
            <button
              className={`sidebar-button w-full text-left px-4 py-2 rounded-lg mb-2 ${
                !genreName ? 'bg-gray-100 dark:bg-gray-800' : ''
              }`}
              onClick={handleHomeClick}
            >
              <div className="flex items-center">
                <Home className="mr-3" size={18} />
                <span className="dark:text-gray-100">Home</span>
              </div>
            </button>

            <div className="border-t border-gray-200 dark:border-gray-800 my-4" />

            <div className="space-y-2">
              {genres.map(genre => (
                <button
                  key={genre}
                  className={`sidebar-button w-full text-left px-4 py-2 rounded-lg ${
                    genreName === genre.toLowerCase() ? 'bg-gray-100 dark:bg-gray-800' : ''
                  }`}
                  onClick={() => handleGenreClick(genre)}
                >
                  <span className="dark:text-gray-100">{genre}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
