import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Home } from 'lucide-react';

type SidebarProps = {
  genres: string[];
  onGenreSelect: (genre: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ genres, onGenreSelect }) => {
  const navigate = useNavigate();
  const { genreName } = useParams<{ genreName?: string }>();
  
  const handleHomeClick = () => {
    onGenreSelect('home');
    navigate('/');
  };
  
  const handleGenreClick = (genre: string) => {
    onGenreSelect(genre);
    navigate(`/genre/${genre.toLowerCase()}`);
  };
  
  return (
    <div className="sidebar w-64 p-6 flex-shrink-0 h-screen">
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
};

export default Sidebar;