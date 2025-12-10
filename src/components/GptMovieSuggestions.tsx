import React from 'react';
import MovieList from './MovieList';
import { useSelector } from 'react-redux';
import { RootState } from '@/utils/appStore';
import { Film } from 'lucide-react';

const GptMovieSuggestions: React.FC = () => {
  const { movieName, movieResults } = useSelector(
    (store: RootState) => store.gpt,
  );

  if (!movieName || !movieResults) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass rounded-2xl p-8">
            <Film className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground text-lg">
              Search for movies to see recommendations
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Flatten all movie results into a single array
  const allMovies = movieResults.flat();

  return (
    <div className="pb-12 animate-fade-in">
      <MovieList title="AI Recommended Movies" movies={allMovies} />
    </div>
  );
};

export default GptMovieSuggestions;
