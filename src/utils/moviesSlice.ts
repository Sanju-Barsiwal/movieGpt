import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Movie {
  id: number;
  title?: string;
  original_title?: string;
  overview?: string;
  poster_path?: string;
  backdrop_path?: string;
  vote_average?: number;
  release_date?: string;
  genre_ids?: number[];
}

interface TrailerVideo {
  key: string;
  name: string;
  type: string;
}

interface MoviesState {
  nowPlayingMovies: Movie[] | null;
  popularMovies: Movie[] | null;
  trendingMovies: Movie[] | null;
  upcomingMovies: Movie[] | null;
  trailerVideo: TrailerVideo | null;
}

const initialState: MoviesState = {
  nowPlayingMovies: null,
  popularMovies: null,
  trendingMovies: null,
  upcomingMovies: null,
  trailerVideo: null,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addNowPlayingMovies: (state, action: PayloadAction<Movie[]>) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action: PayloadAction<Movie[]>) => {
      state.popularMovies = action.payload;
    },
    addTrendingMovies: (state, action: PayloadAction<Movie[]>) => {
      state.trendingMovies = action.payload;
    },
    addUpcomingMovies: (state, action: PayloadAction<Movie[]>) => {
      state.upcomingMovies = action.payload;
    },
    addTrailerVideo: (state, action: PayloadAction<TrailerVideo>) => {
      state.trailerVideo = action.payload;
    },
  },
});

export const {
  addNowPlayingMovies,
  addTrailerVideo,
  addPopularMovies,
  addTrendingMovies,
  addUpcomingMovies,
} = moviesSlice.actions;
export default moviesSlice.reducer;
export type { Movie, TrailerVideo };
