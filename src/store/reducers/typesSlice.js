import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  plaintiffType: 1,
};

const typesSlice = createSlice({
  name: 'typesSlice',
  initialState,
  reducers: {
    changePlaintiffType: (state, action) => {
      state.plaintiffType = action.payload;
    },
  },
});
export const { changePlaintiffType } = typesSlice.actions;

export default typesSlice.reducer;
