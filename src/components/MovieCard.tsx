import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IMG_CDN_URL } from '@/utils/constants';
import { Movie } from '@/utils/moviesSlice';
import { Star, Play } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();

  if (!movie.poster_path) return null;

  const handleClick = () => {
    navigate(`/watch/${movie.id}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="w-32 sm:w-36 md:w-44 flex-shrink-0 cursor-pointer group"
    >
      <div className="relative rounded-xl overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-primary/20">
        <img
          alt={movie.title || movie.original_title}
          src={IMG_CDN_URL + movie.poster_path}
          className="w-full aspect-[2/3] object-cover"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
              <Play className="w-5 h-5 text-primary-foreground fill-current" />
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <h3 className="text-foreground text-sm font-semibold line-clamp-2 mb-1">
              {movie.title || movie.original_title}
            </h3>
            {movie.vote_average && (
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <span className="text-xs text-muted-foreground">
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Rating badge */}
        {movie.vote_average && movie.vote_average > 7 && (
          <div className="absolute top-2 right-2 bg-primary/90 text-primary-foreground text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            {movie.vote_average.toFixed(1)}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
