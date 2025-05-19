import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCurrentUser } from '../lib/supabase';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import GenreInfo from '../components/music/GenreInfo';
import SongList from '../components/music/SongList';
import TrackOverlay from '../components/music/TrackOverlay';
import { genreDescriptions, genres } from '../data/genres';
import { useMusic } from '../hooks/useMusic';

const MainApp: React.FC = () => {
  const { genreName } = useParams<{ genreName?: string }>();
  const { 
    loading, 
    error, 
    songs, 
    selectedGenre, 
    showGenreTracks, 
    refreshCurrentGenre 
  } = useMusic();
  
  const [userEmail, setUserEmail] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [trackOverlay, setTrackOverlay] = useState({
    isOpen: false,
    songData: null as any
  });
  
  useEffect(() => {
    const getUser = async () => {
      const user = await getCurrentUser();
      if (user) {
        setUserEmail(user.email || 'User');
      }
    };
    
    getUser();
  }, []);
  
  useEffect(() => {
    if (genreName) {
      const matchedGenre = genres.find(g => g.toLowerCase() === genreName.toLowerCase());
      if (matchedGenre) {
        showGenreTracks(matchedGenre);
      }
    } else {
      showGenreTracks('home');
    }
  }, [genreName]);
  
  const handleGenreSelect = (genre: string) => {
    showGenreTracks(genre);
  };
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    refreshCurrentGenre();
    setTimeout(() => setIsRefreshing(false), 500);
  };
  
  const handleClearReviews = () => {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('reviews-')) {
        localStorage.removeItem(key);
      }
    }
    
    if (trackOverlay.isOpen && trackOverlay.songData) {
      // Force overlay to refresh reviews if open
      setTrackOverlay({
        ...trackOverlay,
        isOpen: true
      });
    }
    
    alert('All reviews have been cleared!');
  };
  
  const handleSongClick = (song: any) => {
    setTrackOverlay({
      isOpen: true,
      songData: song
    });
  };
  
  const closeTrackOverlay = () => {
    setTrackOverlay({
      isOpen: false,
      songData: null
    });
  };
  
  const getGenreTitle = () => {
    if (selectedGenre === 'home') return 'Discover Music';
    return selectedGenre;
  };
  
  const getGenreDescription = () => {
    if (selectedGenre === 'home') {
      return "Explore tracks from various genres and find your next favorite song!";
    }
    return genreDescriptions[selectedGenre] || '';
  };
  
  return (
    <div className="flex w-full">
      <Sidebar 
        genres={genres} 
        onGenreSelect={handleGenreSelect} 
      />
      
      <div className="flex-1 p-6 overflow-y-auto scrollbar-hide">
        <Header 
          userEmail={userEmail} 
          onClearReviews={handleClearReviews} 
        />
        
        <GenreInfo
          title={getGenreTitle()}
          description={getGenreDescription()}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing || loading}
        />
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
          </div>
        ) : error ? (
          <div 
            className="text-center py-20" 
            style={{ color: 'var(--error-color)' }}
          >
            {error}
          </div>
        ) : (
          <SongList 
            songs={songs} 
            showGenre={selectedGenre === 'home'}
            onSongClick={handleSongClick}
          />
        )}
      </div>
      
      <TrackOverlay 
        isOpen={trackOverlay.isOpen}
        onClose={closeTrackOverlay}
        songData={trackOverlay.songData}
      />
    </div>
  );
};

export default MainApp;