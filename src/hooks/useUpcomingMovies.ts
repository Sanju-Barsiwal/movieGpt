import { useDispatch, useSelector } from 'react-redux';
import { API_OPTIONS } from '@/utils/constants';
import { addUpcomingMovies } from '@/utils/moviesSlice';
import { useEffect } from 'react';
import { RootState } from '@/utils/appStore';

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const upcomingMovie = useSelector((store: RootState) => store.movies.upcomingMovies);
  
  const upcomingMovies = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/upcoming?page=1',
      API_OPTIONS,
    );
    const json = await data.json();
    dispatch(addUpcomingMovies(json.results));
  };
  
  useEffect(() => {
    if (!upcomingMovie) upcomingMovies();
  }, []);
};

export default useUpcomingMovies;
