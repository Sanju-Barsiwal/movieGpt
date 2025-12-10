import { useDispatch, useSelector } from 'react-redux';
import { API_OPTIONS } from '@/utils/constants';
import { addNowPlayingMovies } from '@/utils/moviesSlice';
import { useEffect } from 'react';
import { RootState } from '@/utils/appStore';

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const nowPlayingMovie = useSelector((store: RootState) => store.movies.nowPlayingMovies);
  
  const nowPlayingMovies = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/now_playing?page=1',
      API_OPTIONS,
    );
    const json = await data.json();
    dispatch(addNowPlayingMovies(json.results));
  };
  
  useEffect(() => {
    if (!nowPlayingMovie) nowPlayingMovies();
  }, []);
};

export default useNowPlayingMovies;
