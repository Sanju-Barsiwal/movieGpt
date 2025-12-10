import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_OPTIONS, IMG_CDN_URL_ORIGINAL } from '@/utils/constants';
import { Button } from '@/components/ui/button';
import BackgroundEffects from '@/components/BackgroundEffects';
import Logo from '@/components/Logo';
import { 
  ArrowLeft, 
  Play, 
  Star, 
  Clock, 
  Calendar, 
  Share2, 
  Heart,
  Loader2
} from 'lucide-react';

interface MovieDetails {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  runtime: number;
  genres: { id: number; name: string }[];
  tagline: string;
}

interface Video {
  key: string;
  name: string;
  type: string;
}

const Watch: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [trailer, setTrailer] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const [movieRes, videosRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, API_OPTIONS),
          fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, API_OPTIONS),
        ]);

        const movieData = await movieRes.json();
        const videosData = await videosRes.json();

        setMovie(movieData);
        
        const trailerVideo = videosData.results?.find((v: Video) => v.type === 'Trailer') || videosData.results?.[0];
        setTrailer(trailerVideo);
      } catch (error) {
        console.error('Error fetching movie:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchMovieDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <BackgroundEffects />
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <BackgroundEffects />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Movie not found</h1>
          <Button variant="gradient" onClick={() => navigate('/browse')}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Background Image */}
      <div className="fixed inset-0 -z-10">
        {movie.backdrop_path && (
          <img 
            src={IMG_CDN_URL_ORIGINAL + movie.backdrop_path} 
            alt="" 
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/50" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Button 
            variant="glass" 
            size="sm" 
            onClick={() => navigate('/browse')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <Logo size="sm" />
        </div>
      </header>

      {/* Content */}
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[300px_1fr] gap-8">
            {/* Poster */}
            <div className="hidden lg:block animate-slide-up">
              <div className="sticky top-24">
                <div className="glass-strong rounded-2xl overflow-hidden">
                  {movie.poster_path && (
                    <img 
                      src={IMG_CDN_URL_ORIGINAL + movie.poster_path}
                      alt={movie.title}
                      className="w-full aspect-[2/3] object-cover"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              {/* Title */}
              <div>
                {movie.tagline && (
                  <p className="text-primary font-medium mb-2">{movie.tagline}</p>
                )}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                  {movie.title}
                </h1>
                
                {/* Meta info */}
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                  {movie.vote_average > 0 && (
                    <div className="flex items-center gap-1.5 text-yellow-400">
                      <Star className="w-5 h-5 fill-current" />
                      <span className="font-semibold text-foreground">{movie.vote_average.toFixed(1)}</span>
                    </div>
                  )}
                  {movie.release_date && (
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(movie.release_date).getFullYear()}</span>
                    </div>
                  )}
                  {movie.runtime > 0 && (
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span 
                      key={genre.id}
                      className="px-3 py-1 rounded-full bg-secondary/50 text-sm text-muted-foreground"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <Button 
                  variant="gradient" 
                  size="xl"
                  onClick={() => setShowTrailer(true)}
                  className="gap-2"
                >
                  <Play className="w-5 h-5 fill-current" />
                  Watch Trailer
                </Button>
                <Button 
                  variant="glass" 
                  size="xl"
                  onClick={() => setIsLiked(!isLiked)}
                  className="gap-2"
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-primary text-primary' : ''}`} />
                  {isLiked ? 'Liked' : 'Like'}
                </Button>
                <Button variant="glass" size="icon" className="h-14 w-14">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>

              {/* Overview */}
              <div className="glass rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-foreground mb-3">Overview</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {movie.overview || 'No overview available.'}
                </p>
              </div>

              {/* Trailer Modal */}
              {showTrailer && trailer && (
                <div className="glass-strong rounded-2xl overflow-hidden">
                  <div className="aspect-video">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                      title={trailer.name}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Watch;
