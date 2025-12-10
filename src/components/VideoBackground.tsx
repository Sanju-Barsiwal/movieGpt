import React from 'react';
import { useSelector } from 'react-redux';
import useMovieTrailer from '@/hooks/useMovieTrailer';
import { RootState } from '@/utils/appStore';

interface VideoBackgroundProps {
  movieId: number;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ movieId }) => {
  const trailerVideo = useSelector((store: RootState) => store.movies?.trailerVideo);
  useMovieTrailer(movieId);

  if (!trailerVideo?.key) {
    return (
      <div className="w-full aspect-video bg-gradient-to-b from-secondary to-background" />
    );
  }

  return (
    <div className="w-full aspect-video relative overflow-hidden">
      <iframe
        className="w-full h-full scale-125"
        src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&loop=1&playlist=${trailerVideo.key}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
};

export default VideoBackground;
