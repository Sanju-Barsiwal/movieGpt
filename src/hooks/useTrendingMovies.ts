import { useDispatch, useSelector } from 'react-redux';
import { API_OPTIONS } from '@/utils/constants';
import { addTrendingMovies } from '@/utils/moviesSlice';
import { useEffect } from 'react';
import { RootState } from '@/utils/appStore';

const useTrendingMovies = () => {
  const dispatch = useDispatch();
  const trendingMovie = useSelector((store: RootState) => store.movies.trendingMovies);
  
  const trendingMovies = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/top_rated?page=1',
      API_OPTIONS,
    );
    const json = await data.json();
    dispatch(addTrendingMovies(json.results));
  };
  
  useEffect(() => {
    if (!trendingMovie) trendingMovies();
  }, []);
};

export default useTrendingMovies;
