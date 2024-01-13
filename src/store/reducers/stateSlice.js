import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lookPdf: false,
  lookAddPlaintiff: 0, // тип истец, представ. истца, ответчик предст. ответчика
  statusCreateIsks: false, // статус для создания false - создание иска, true - редактирование иска
  /// delete
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
    changeStatusCreateIsks: (state, action) => {
      state.statusCreateIsks = action.payload;
    },
  },
});
export const { changeLookPDF, changeLookAddPlaintiff, changeStatusCreateIsks } =
  stateSlice.actions;

export default stateSlice.reducer;
