import { useDispatch, useSelector } from 'react-redux';
import { API_OPTIONS } from '@/utils/constants';
import { addPopularMovies } from '@/utils/moviesSlice';
import { useEffect } from 'react';
import { RootState } from '@/utils/appStore';

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popularMovie = useSelector((store: RootState) => store.movies.popularMovies);
  
  const popularMovies = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/popular?page=1',
      API_OPTIONS,
    );
    const json = await data.json();
    dispatch(addPopularMovies(json.results));
  };
  
  useEffect(() => {
    if (!popularMovie) popularMovies();
  }, []);
};

export default usePopularMovies;
