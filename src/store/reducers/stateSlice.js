import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lookPdf: false,
};

const stateSlice = createSlice({
  name: 'stateSlice',
  initialState,
  reducers: {
    changeLookPDF: (state, action) => {
      state.lookPdf = action.payload;
    },
  },
});
export const { changeLookPDF } = stateSlice.actions;

export default stateSlice.reducer;
