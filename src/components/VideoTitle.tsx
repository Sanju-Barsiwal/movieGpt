import React from 'react';
import { Button } from './ui/button';
import { Play, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface VideoTitleProps {
  title: string;
  overview: string;
  movieId: number;
}

const VideoTitle: React.FC<VideoTitleProps> = ({ title, overview, movieId }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full aspect-video absolute inset-0 flex items-center bg-gradient-to-r from-background via-background/80 to-transparent">
      <div className="px-6 sm:px-12 lg:px-16 max-w-2xl">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 animate-slide-up">
          {title}
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base lg:text-lg line-clamp-3 mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {overview}
        </p>
        <div className="flex gap-3 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Button 
            variant="hero" 
            size="lg"
            onClick={() => navigate(`/watch/${movieId}`)}
            className="gap-2"
          >
            <Play className="w-5 h-5 fill-current" />
            Play
          </Button>
          <Button 
            variant="hero-secondary" 
            size="lg"
            onClick={() => navigate(`/watch/${movieId}`)}
            className="gap-2"
          >
            <Info className="w-5 h-5" />
            More Info
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
