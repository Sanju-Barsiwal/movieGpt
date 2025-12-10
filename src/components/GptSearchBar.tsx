import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import lang from '@/utils/languageConstants';
import { getMovieRecommendations } from '../utils/OpenAI.js'; // ✅ Updated import
import { API_OPTIONS } from '@/utils/constants';
import { addGptMovieResult } from '@/utils/gptSlice';
import { RootState } from '@/utils/appStore';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search, Sparkles, Loader2 } from 'lucide-react';

const GptSearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const langkey = useSelector((store: RootState) => store.config.lang);
  const searchText = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchMovieTMDB = async (movie: string) => {
    const cleanMovie = movie.trim();
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        cleanMovie,
      )}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS,
    );
    const json = await data.json();

    // Return first result or empty array
    return json.results?.[0] ? [json.results[0]] : [];
  };

  const handleGptSearchClick = async () => {
    // Check if ref exists and has a value
    if (!searchText.current?.value?.trim()) return;

    setIsLoading(true);
    setError(null);
    
    try {
      const gptQuery =
        'Act as a Movie Recommendation system and suggest some movies for the query : ' +
        searchText.current.value +
        '. Only give me name of 5 movies, comma separated like example result given ahead. Example Result : 3 idiots, KGF, The Godfather, Dangal, Baahubali 2: The Conclusion';

      // ✅ Use new fetch-based function
      const gptResults = await getMovieRecommendations(gptQuery);

      const gptMovies = gptResults.choices?.[0]?.message?.content?.split(',');
      console.log(gptMovies);

      // Add null check for gptMovies
      if (!gptMovies || gptMovies.length === 0) {
        console.error('No movies returned from AI');
        setError('No movies found. Try a different search.');
        return;
      }

      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);
      console.log(tmdbResults);

      dispatch(
        addGptMovieResult({ movieName: gptMovies, movieResults: tmdbResults }),
      );
    } catch (error) {
      console.error('Search failed:', error);
      setError('Search failed. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleGptSearchClick();
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-up">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-primary font-semibold">
              AI-Powered Search
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3">
            Find Your Perfect Movie
          </h1>
          <p className="text-muted-foreground text-lg">
            Describe what you're in the mood for
          </p>
        </div>

        {/* Search Box */}
        <div className="glass-strong rounded-2xl p-4 sm:p-6 animate-scale-in">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                ref={searchText}
                type="text"
                placeholder={
                  lang[langkey]?.gptSearchPlaceholder ||
                  'What would you like to watch today?'
                }
                className="pl-12 h-14 text-base"
                onKeyPress={handleKeyPress}
              />
            </div>
            <Button
              onClick={handleGptSearchClick}
              disabled={isLoading}
              variant="gradient"
              size="xl"
              className="w-full sm:w-auto min-w-[140px]"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  {lang[langkey]?.search || 'Search'}
                </>
              )}
            </Button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-destructive/10 border border-destructive/30 rounded-lg animate-slide-up">
              <p className="text-destructive text-sm text-center">{error}</p>
            </div>
          )}

          {/* Suggestions */}
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="text-muted-foreground text-sm">Try:</span>
            {[
              'Action movies',
              'Romantic comedy',
              'Sci-fi thriller',
              'Animation',
            ].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => {
                  if (searchText.current) {
                    searchText.current.value = suggestion;
                    handleGptSearchClick();
                  }
                }}
                className="text-sm px-3 py-1 rounded-full bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GptSearchBar;