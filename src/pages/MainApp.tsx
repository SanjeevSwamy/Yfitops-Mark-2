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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const user = await getCurrentUser();
      setUserEmail(user?.email || '');
    };
    getUser();
  }, []);

  useEffect(() => {
    if (genreName) {
      const matchedGenre = genres.find(g => g.toLowerCase() === genreName.toLowerCase());
      matchedGenre ? showGenreTracks(matchedGenre) : showGenreTracks('home');
    } else {
      showGenreTracks('home');
    }
  }, [genreName]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    refreshCurrentGenre();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const handleClearReviews = () => {
    const reviewKeys = Object.keys(localStorage).filter(key => key.startsWith('reviews-'));
    reviewKeys.forEach(key => localStorage.removeItem(key));
    alert('All reviews cleared!');
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

  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-primary">
      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 sm:hidden transition-opacity ${
          isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar */}
      <Sidebar
        genres={genres}
        onGenreSelect={(genre) => {
          showGenreTracks(genre);
          setIsSidebarOpen(false);
        }}
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          userEmail={userEmail}
          onClearReviews={handleClearReviews}
          onOpenSidebar={() => setIsSidebarOpen(true)}
        />

        <main className="flex-1 overflow-auto p-4 sm:p-6">
          <div className="max-w-7xl mx-auto">
            <GenreInfo
              title={selectedGenre === 'home' ? 'Discover Music' : selectedGenre}
              description={selectedGenre === 'home' 
                ? "Explore tracks from various genres and find your next favorite song!" 
                : genreDescriptions[selectedGenre] || ''}
              onRefresh={handleRefresh}
              isRefreshing={isRefreshing || loading}
            />

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"/>
              </div>
            ) : error ? (
              <div className="text-center py-20 text-error">
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
        </main>
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
