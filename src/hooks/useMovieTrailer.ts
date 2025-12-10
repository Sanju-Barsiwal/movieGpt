import { useDispatch, useSelector } from 'react-redux';
import { API_OPTIONS } from '@/utils/constants';
import { addTrailerVideo } from '@/utils/moviesSlice';
import { useEffect } from 'react';
import { RootState } from '@/utils/appStore';

const useMovieTrailer = (movieId: number) => {
  const dispatch = useDispatch();
  const movieVideo = useSelector((store: RootState) => store.movies.trailerVideo);
  
  const getMoviesVideo = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      API_OPTIONS,
    );
    const json = await data.json();
    const filterData = json.results?.filter((video: any) => video.type === 'Trailer');
    const trailer = filterData?.length ? filterData[0] : json.results?.[0];
    if (trailer) dispatch(addTrailerVideo(trailer));
  };
  
  useEffect(() => {
    if (!movieVideo) getMoviesVideo();
  }, [movieId]);
};

export default useMovieTrailer;
