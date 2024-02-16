import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  preloader: false,
};

const requestSlice = createSlice({
  name: "requestSlice",
  initialState,
  reducers: {
    changePreloader: (state, action) => {
      state.preloader = action.payload;
    },
  },
});
export const { changePreloader } = requestSlice.actions;

export default requestSlice.reducer;
