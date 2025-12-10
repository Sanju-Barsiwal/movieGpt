import React, { useRef } from 'react';
import MovieCard from './MovieCard';
import { Movie } from '@/utils/moviesSlice';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface MovieListProps {
  title: string;
  movies: Movie[] | null;
}

const MovieList: React.FC<MovieListProps> = ({ title, movies }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!movies || movies.length === 0) return null;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-6 group/list">
      <div className="flex items-center justify-between mb-4 px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground">
          {title}
        </h2>
        <div className="flex gap-2 opacity-0 group-hover/list:opacity-100 transition-opacity">
          <Button
            variant="glass"
            size="icon"
            onClick={() => scroll('left')}
            className="w-8 h-8"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="glass"
            size="icon"
            onClick={() => scroll('right')}
            className="w-8 h-8"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8 pb-4"
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
