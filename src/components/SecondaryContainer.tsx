import React from 'react';
import MovieList from './MovieList';
import { useSelector } from 'react-redux';
import { RootState } from '@/utils/appStore';

const SecondaryContainer: React.FC = () => {
  const movies = useSelector((store: RootState) => store.movies);

  if (!movies.nowPlayingMovies) return null;

  return (
    <div className="bg-background relative z-10 -mt-32 pt-8">
      <MovieList
        title="Now Playing"
        movies={movies.nowPlayingMovies}
      />
      <MovieList 
        title="Trending" 
        movies={movies.trendingMovies} 
      />
      <MovieList 
        title="Popular" 
        movies={movies.popularMovies} 
      />
      <MovieList 
        title="Upcoming" 
        movies={movies.upcomingMovies} 
      />
    </div>
  );
};

export default SecondaryContainer;
