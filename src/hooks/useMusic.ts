import { useState, useEffect, useCallback } from 'react';
import { genres, sampleTracks } from '../data/genres';

type Song = {
  title: string;
  artist: string;
  image: string;
  genre?: string;
};

type Cache = {
  [key: string]: Song[];
};

export const useMusic = () => {
  const [loadedTracks, setLoadedTracks] = useState<Cache>({});
  const [currentTracks, setCurrentTracks] = useState<Cache>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string>('home');
  const [dataLoaded, setDataLoaded] = useState(false);

  // Memoized data loader
  const loadInitialData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const tracksData: Cache = {};
      
      // Load sample tracks synchronously
      for (const genre of genres) {
        tracksData[genre] = sampleTracks[genre as keyof typeof sampleTracks].map(song => ({
          ...song,
          genre
        }));
      }
      
      setLoadedTracks(tracksData);
      
      // Set up initial random tracks
      const allSongs: Song[] = [];
      genres.forEach(genre => {
        if (tracksData[genre]) {
          tracksData[genre].forEach(song => {
            allSongs.push({ ...song, genre });
          });
        }
      });

      if (allSongs.length === 0) {
        throw new Error('No tracks found. Check your data source.');
      }

      const shuffledSongs = [...allSongs].sort(() => 0.5 - Math.random());
      const randomSelection = shuffledSongs.slice(0, 12);

      setCurrentTracks(prev => ({
        ...prev,
        'random': randomSelection
      }));
      setDataLoaded(true);
    } catch (err: any) {
      setError(err.message || 'Failed to load music data');
      console.error('Error loading music data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!dataLoaded) {
      loadInitialData();
    }
  }, [dataLoaded, loadInitialData]);

  const refreshData = useCallback(() => {
    setDataLoaded(false);
  }, []);

  const showGenreTracks = useCallback((genre: string) => {
    setLoading(true);
    setError(null);
    setSelectedGenre(genre);

    setTimeout(() => {
      try {
        if (genre === 'home') {
          if (!currentTracks.random) {
            refreshData();
          }
        } else {
          if (!loadedTracks[genre]?.length) {
            throw new Error(`No tracks found for ${genre}. Check your data source.`);
          }

          setCurrentTracks(prev => ({
            ...prev,
            [genre]: [...(loadedTracks[genre] || [])]
          }));
        }
      } catch (err: any) {
        setError(err.message || `Failed to load ${genre} tracks`);
      } finally {
        setLoading(false);
      }
    }, 500);
  }, [currentTracks, loadedTracks, refreshData]);

  const refreshCurrentGenre = useCallback(() => {
    setLoading(true);
    setError(null);

    setTimeout(() => {
      try {
        if (selectedGenre === 'home') {
          refreshData();
        } else {
          const genreTracks = loadedTracks[selectedGenre] || [];
          if (!genreTracks.length) {
            throw new Error(`No tracks found for ${selectedGenre}. Check your data source.`);
          }

          const shuffledSongs = [...genreTracks].sort(() => 0.5 - Math.random());
          setCurrentTracks(prev => ({
            ...prev,
            [selectedGenre]: shuffledSongs
          }));
        }
      } catch (err: any) {
        setError(err.message || 'Failed to refresh tracks');
      } finally {
        setLoading(false);
      }
    }, 500);
  }, [selectedGenre, loadedTracks, refreshData]);

  const getCurrentSongs = useCallback(() => {
    if (selectedGenre === 'home') {
      return currentTracks['random'] || [];
    }
    return currentTracks[selectedGenre] || [];
  }, [selectedGenre, currentTracks]);

  return {
    genres,
    loading,
    error,
    selectedGenre,
    songs: getCurrentSongs(),
    showGenreTracks,
    refreshCurrentGenre,
    refreshData // Call this after successful auth
  };
};
