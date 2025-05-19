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
  // Generate a random rating between 3 and 5 stars
  const randomRating = Math.floor(Math.random() * 3) + 3;
  
  return (
    <div 
      className="song-card p-3 sm:p-4 rounded-lg cursor-pointer shadow transition hover:shadow-md bg-white dark:bg-gray-900"
      onClick={onClick}
    >
      <img 
        src={song.image} 
        alt={`${song.title} cover`} 
        className="w-full aspect-square object-cover rounded-md mb-3 sm:mb-4"
      />
      <h3 className="text-base sm:text-lg font-bold truncate">{song.title}</h3>
      <p className="text-sm text-muted truncate">{song.artist}</p>
      {showGenre && song.genre && (
        <p className="text-xs mt-1" style={{ color: 'var(--accent-color)' }}>
          Genre: {song.genre}
        </p>
      )}
      <div className="star-rating-display mt-2 flex">
        {Array(5).fill(0).map((_, index) => (
          <Star
            key={index}
            size={14}
            fill={index < randomRating ? '#dabd18b2' : 'none'}
            color="#dabd18b2"
          />
        ))}
      </div>
    </div>
  );
};

export default SongCard;
