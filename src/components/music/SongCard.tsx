import React from 'react';
import { Star } from 'lucide-react';

type SongCardProps = {
  song: {
    title: string;
    artist: string;
    image: string;
    genre?: string;
  };
  showGenre: boolean;
  onClick: () => void;
};

const SongCard: React.FC<SongCardProps> = ({ song, showGenre, onClick }) => {
  const randomRating = Math.floor(Math.random() * 3) + 3;

  return (
    <div 
      className="group p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <img
        src={song.image}
        alt={`${song.title} cover`}
        className="w-full aspect-square object-cover rounded-md mb-4"
      />
      <h3 className="text-base font-bold truncate dark:text-gray-100">
        {song.title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
        {song.artist}
      </p>
      {showGenre && song.genre && (
        <p className="text-xs mt-1 text-green-500">
          Genre: {song.genre}
        </p>
      )}
      <div className="flex items-center gap-1 mt-2">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={14}
            fill={index < randomRating ? '#1DB954' : 'transparent'}
            className="text-green-500"
          />
        ))}
      </div>
    </div>
  );
};

export default SongCard;
