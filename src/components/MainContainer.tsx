import React from 'react';
import { useSelector } from 'react-redux';
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';
import { RootState } from '@/utils/appStore';

const MainContainer: React.FC = () => {
  const movies = useSelector((store: RootState) => store.movies?.nowPlayingMovies);
  
  if (!movies || movies.length === 0) return null;

  const mainMovie = movies[Math.floor(Math.random() * Math.min(movies.length, 10))];
  const { original_title, title, overview, id } = mainMovie;

  return (
    <div className="relative bg-background">
      <VideoBackground movieId={id} />
      <VideoTitle 
        title={title || original_title || 'Unknown'} 
        overview={overview || ''} 
        movieId={id}
      />
      
      {/* Bottom gradient for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};

export default MainContainer;
