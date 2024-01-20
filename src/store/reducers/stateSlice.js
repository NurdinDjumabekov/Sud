import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ///// только для обыный пользователей
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
  lookDataAllPlaintiff: false, /// для просмотра списка истцов и представителей
  listPlaint: [], /// для просмотра списка истцов и представителей

  lookChangeStatus: false, /// для просмотра модалки изменения статуса
  idStatus: 0, /// для просмотра модалки изменения статуса
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
    changeLookDataAllPlaintiff: (state, action) => {
      state.lookDataAllPlaintiff = action.payload;
    },
    changeListPlaint: (state, action) => {
      state.listPlaint = action.payload;
    },
    changeLookChangeStatus: (state, action) => {
      state.lookChangeStatus = action.payload;
    },
    changeIdStatus: (state, action) => {
      state.idStatus = action.payload;
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
  changeLookDataAllPlaintiff,
  changeListPlaint,
  changeLookChangeStatus,
  changeIdStatus,
} = stateSlice.actions;

export default stateSlice.reducer;
