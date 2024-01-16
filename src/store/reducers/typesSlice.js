import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  plaintiffType: 1,
  alertText: {
    text: "",
    backColor: "",
    state: false,
  },
};

const typesSlice = createSlice({
  name: "typesSlice",
  initialState,
  reducers: {
    changePlaintiffType: (state, action) => {
      state.plaintiffType = action.payload;
    },
    changeAlertText: (state, action) => {
      state.alertText = action.payload;
    },
  },
});
export const { changePlaintiffType, changeAlertText } = typesSlice.actions;

export default typesSlice.reducer;
