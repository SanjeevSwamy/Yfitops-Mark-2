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
      <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-2">
        <h1 className="text-2xl sm:text-4xl font-bold mb-2 xs:mb-4 break-words">{title}</h1>
        <button 
          onClick={onRefresh} 
          className="refresh-button self-start xs:self-auto"
          aria-label="Refresh content"
          disabled={isRefreshing}
        >
          <RefreshCw size={20} className={isRefreshing ? 'animate-spin' : ''} />
        </button>
      </div>
      <p className="genre-description mb-6 text-base sm:text-lg">{description}</p>
    </div>
  );
};

export default GenreInfo;
