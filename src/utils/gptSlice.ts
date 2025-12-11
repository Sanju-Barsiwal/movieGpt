import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Load initial state from localStorage
const getInitialShowGptSearch = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('showGptSearch');
    return saved === 'true';
  }
  return false;
};

interface GptState {
  showGptSearch: boolean;
  movieResults: any[] | null;
  movieName: string[] | null;
}

const initialState: GptState = {
  showGptSearch: getInitialShowGptSearch(), 
  movieResults: null,
  movieName: null,
};

const gptSlice = createSlice({
  name: 'gpt',
  initialState,
  reducers: {
    toggleGptSearchView: (state) => {
      state.showGptSearch = !state.showGptSearch;
      localStorage.setItem('showGptSearch', String(state.showGptSearch));
    },
    addGptMovieResult: (state, action: PayloadAction<{ movieName: string[], movieResults: any[] }>) => {
      state.movieName = action.payload.movieName;
      state.movieResults = action.payload.movieResults;
    },
  },
});

export const { toggleGptSearchView, addGptMovieResult } = gptSlice.actions;
export default gptSlice.reducer;
