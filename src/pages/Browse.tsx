import React from 'react';
import Header from '@/components/Header';
import useNowPlayingMovies from '@/hooks/useNowPlayingMovies';
import usePopularMovies from '@/hooks/usePopularMovies';
import useTrendingMovies from '@/hooks/useTrendingMovies';
import useUpcomingMovies from '@/hooks/useUpcomingMovies';
import MainContainer from '@/components/MainContainer';
import SecondaryContainer from '@/components/SecondaryContainer';
import GptSearch from '@/components/GptSearch';
import { useSelector } from 'react-redux';
import { RootState } from '@/utils/appStore';

const Browse: React.FC = () => {
  const showGptSearch = useSelector((store: RootState) => store.gpt.showGptSearch);
  
  useNowPlayingMovies();
  usePopularMovies();
  useTrendingMovies();
  useUpcomingMovies();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {showGptSearch ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
