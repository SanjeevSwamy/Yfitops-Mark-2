import React from 'react';
import SongCard from './SongCard';

type Song = {
  title: string;
  artist: string;
  image: string;
  genre?: string;
};

type SongListProps = {
  songs: Song[];
  showGenre: boolean;
  onSongClick: (song: Song) => void;
};

const SongList: React.FC<SongListProps> = ({ songs, showGenre, onSongClick }) => {
  if (songs.length === 0) {
    return (
      <div className="text-center py-20 text-muted">
        No tracks found. Check back later!
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Popular tracks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {songs.map((song, index) => (
          <SongCard 
            key={`${song.title}-${index}`}
            song={song}
            showGenre={showGenre}
            onClick={() => onSongClick(song)}
          />
        ))}
      </div>
    </div>
  );
};

export default SongList;