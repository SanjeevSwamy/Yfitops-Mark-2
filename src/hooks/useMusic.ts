import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Simulate API fetch with the sample data
        const tracksData: Cache = {};
        
        for (const genre of genres) {
          tracksData[genre] = sampleTracks[genre as keyof typeof sampleTracks].map(song => ({
            ...song,
            genre
          }));
        }
        
        setLoadedTracks(tracksData);
        
        // Set up random tracks for home page
        const allSongs: Song[] = [];
        genres.forEach(genre => {
          if (tracksData[genre]) {
            tracksData[genre].forEach(song => {
              allSongs.push({
                ...song,
                genre
              });
            });
          }
        });
        
        if (allSongs.length === 0) {
          throw new Error('No tracks found. Check your data source.');
        }
        
        const shuffledSongs = [...allSongs].sort(() => 0.5 - Math.random());
        const randomSelection = shuffledSongs.slice(0, 12);
        
        setCurrentTracks({
          ...currentTracks,
          'random': randomSelection
        });
      } catch (err: any) {
        setError(err.message || 'Failed to load music data');
        console.error('Error loading music data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadInitialData();
  }, []);

  const showGenreTracks = (genre: string) => {
    setLoading(true);
    setError(null);
    setSelectedGenre(genre);
    
    setTimeout(() => {
      try {
        if (genre === 'home') {
          // Home should show random tracks from all genres
          if (currentTracks['random']) {
            setLoading(false);
            return;
          }
          
          const allSongs: Song[] = [];
          genres.forEach(g => {
            if (loadedTracks[g]) {
              loadedTracks[g].forEach(song => {
                allSongs.push({
                  ...song,
                  genre: g
                });
              });
            }
          });
          
          if (allSongs.length === 0) {
            throw new Error('No tracks found. Check your data source.');
          }
          
          const shuffledSongs = [...allSongs].sort(() => 0.5 - Math.random());
          const randomSelection = shuffledSongs.slice(0, 12);
          
          setCurrentTracks({
            ...currentTracks,
            'random': randomSelection
          });
        } else {
          // Show specific genre tracks
          if (!loadedTracks[genre] || loadedTracks[genre].length === 0) {
            throw new Error(`No tracks found for ${genre}. Check your data source.`);
          }
          
          if (!currentTracks[genre]) {
            setCurrentTracks({
              ...currentTracks,
              [genre]: [...loadedTracks[genre]]
            });
          }
        }
      } catch (err: any) {
        setError(err.message || `Failed to load ${genre} tracks`);
        console.error(`Error loading ${genre} tracks:`, err);
      } finally {
        setLoading(false);
      }
    }, 500); // Simulate loading delay
  };

  const refreshCurrentGenre = () => {
    setLoading(true);
    setError(null);
    
    setTimeout(() => {
      try {
        if (selectedGenre === 'home') {
          const allSongs: Song[] = [];
          genres.forEach(genre => {
            if (loadedTracks[genre]) {
              loadedTracks[genre].forEach(song => {
                allSongs.push({
                  ...song,
                  genre
                });
              });
            }
          });
          
          if (allSongs.length === 0) {
            throw new Error('No tracks found. Check your data source.');
          }
          
          const shuffledSongs = [...allSongs].sort(() => 0.5 - Math.random());
          const randomSelection = shuffledSongs.slice(0, 12);
          
          setCurrentTracks({
            ...currentTracks,
            'random': randomSelection
          });
        } else {
          const genreTracks = loadedTracks[selectedGenre];
          if (!genreTracks || genreTracks.length === 0) {
            throw new Error(`No tracks found for ${selectedGenre}. Check your data source.`);
          }
          
          const shuffledSongs = [...genreTracks].sort(() => 0.5 - Math.random());
          setCurrentTracks({
            ...currentTracks,
            [selectedGenre]: shuffledSongs
          });
        }
      } catch (err: any) {
        setError(err.message || 'Failed to refresh tracks');
        console.error('Error refreshing tracks:', err);
      } finally {
        setLoading(false);
      }
    }, 500); // Simulate loading delay
  };
  
  const getCurrentSongs = () => {
    if (selectedGenre === 'home') {
      return currentTracks['random'] || [];
    }
    return currentTracks[selectedGenre] || [];
  };

  return {
    genres,
    loading,
    error,
    selectedGenre,
    songs: getCurrentSongs(),
    showGenreTracks,
    refreshCurrentGenre
  };
};