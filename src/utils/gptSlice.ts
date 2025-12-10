import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from './moviesSlice';

interface GptState {
  showGptSearch: boolean;
  movieName: string[] | null;
  movieResults: Movie[][] | null;
}

const initialState: GptState = {
  showGptSearch: false,
  movieName: null,
  movieResults: null,
};

const gptSlice = createSlice({
  name: 'gpt',
  initialState,
  reducers: {
    toggleGptSearchView: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptMovieResult: (
      state,
      action: PayloadAction<{ movieName: string[]; movieResults: Movie[][] }>
    ) => {
      const { movieName, movieResults } = action.payload;
      state.movieName = movieName;
      state.movieResults = movieResults;
    },
    clearGptResults: (state) => {
      state.movieName = null;
      state.movieResults = null;
    },
  },
});

export const { toggleGptSearchView, addGptMovieResult, clearGptResults } = gptSlice.actions;
export default gptSlice.reducer;
