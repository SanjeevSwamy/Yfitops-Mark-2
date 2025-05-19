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
        className={`fixed z-50 top-0 left-0 h-full w-64 bg-secondary shadow-lg transform transition-transform duration-200
          ${open ? 'translate-x-0' : '-translate-x-full'} 
          sm:static sm:translate-x-0`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-accent">Yfitops</h1>
            <button
              className="sm:hidden p-2 text-muted"
              onClick={onClose}
            >
              <X size={20} />
            </button>
          </div>

          <nav>
            <button
              className={`w-full text-left px-4 py-2 rounded-lg mb-2 ${
                !genreName ? 'bg-tertiary' : 'hover:bg-tertiary'
              }`}
              onClick={handleHomeClick}
            >
              <div className="flex items-center">
                <Home className="mr-3" size={18} />
                <span>Home</span>
              </div>
            </button>

            <div className="border-t border-tertiary my-4" />

            <div className="space-y-2">
              {genres.map(genre => (
                <button
                  key={genre}
                  className={`w-full text-left px-4 py-2 rounded-lg ${
                    genreName === genre.toLowerCase() ? 'bg-tertiary' : 'hover:bg-tertiary'
                  }`}
                  onClick={() => handleGenreClick(genre)}
                >
                  {genre}
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
