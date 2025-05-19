import React from 'react';
import { RefreshCw } from 'lucide-react';

type GenreInfoProps = {
  title: string;
  description: string;
  onRefresh: () => void;
  isRefreshing: boolean;
};

const GenreInfo: React.FC<GenreInfoProps> = ({ title, description, onRefresh, isRefreshing }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <button 
          onClick={onRefresh} 
          className="refresh-button"
          aria-label="Refresh content"
          disabled={isRefreshing}
        >
          <RefreshCw size={18} className={isRefreshing ? 'animate-spin' : ''} />
        </button>
      </div>
      <p className="genre-description mb-6">{description}</p>
    </div>
  );
};

export default GenreInfo;