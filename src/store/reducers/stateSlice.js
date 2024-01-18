import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lookPdf: false,
  lookAddPlaintiff: 0, // 1 - тип истец, представ. истца, 2 - ответчик, предст. ответчика
  //// targetPlint
  calculatorType: false,
  calculatorState: false,
  typePay: 1, //// => typeCountSum
  sumIsk: "",
  resultSumIsk: {
    num1: 0,
    num2: 0,
    num3: 0,
    num4: 0,
  },
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
    changeCalculatorState: (state, action) => {
      state.calculatorState = action.payload;
    },
    changeSumIsk: (state, action) => {
      state.sumIsk = action.payload;
    },
    changeResult: (state, action) => {
      state.resultSumIsk = action.payload;
    },
    changeCalculatorType: (state, action) => {
      state.calculatorType = action.payload;
    },
    changeTypePay: (state, action) => {
      state.typePay = action.payload;
    },
  },
});
export const {
  changeLookPDF,
  changeLookAddPlaintiff,
  changeCalculatorState,
  changeSumIsk,
  changeResult,
  changeCalculatorType,
  changeTypePay,
} = stateSlice.actions;

export default stateSlice.reducer;
