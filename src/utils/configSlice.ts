import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ConfigState {
  lang: string;
}

const initialState: ConfigState = {
  lang: 'en',
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<string>) => {
      state.lang = action.payload;
    },
  },
});

export const { changeLanguage } = configSlice.actions;
export default configSlice.reducer;
