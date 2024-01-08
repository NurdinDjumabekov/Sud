import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lookPdf: false,
  lookAddPlaintiff: false,
};

const stateSlice = createSlice({
  name: "stateSlice",
  initialState,
  reducers: {
    changeLookPDF: (state, action) => {
      state.lookPdf = action.payload;
    },
    changeLookAddPlaintiff: (state, action) => {
      state.lookAddPlaintiff = action.payload;
    },
  },
});
export const { changeLookPDF, changeLookAddPlaintiff } = stateSlice.actions;

export default stateSlice.reducer;
