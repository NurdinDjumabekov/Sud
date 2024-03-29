import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mainBtnList: [
    //////// для ответ. секр и председателя
    {
      id: 0,
      name: "Иски",
      bool: true,
    },
    {
      id: 1,
      name: "Принятые ответственным секретарём",
      bool: false,
    },
    {
      id: 2,
      name: "Отклонённые ответственным секретарём",
      bool: false,
    },
    {
      id: 3,
      name: "Принятые председателем",
      bool: false,
    },
    {
      id: 4,
      name: "Отклонённые председателем",
      bool: false,
    },
    //////// для истца
    {
      id: 5,
      name: "Все иски",
      bool: true,
    },
    {
      id: 6,
      name: "Поданные",
      bool: false,
    },
    {
      id: 7,
      name: "Принятые",
      bool: false,
    },
    {
      id: 8,
      name: "Отказанные",
      bool: false,
    },
  ],
  ///// только для обыный пользователей
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
  /// delete

  lookChangeStatus: false, /// для просмотра модалки изменения статуса у истца
  lookChangeEditIsks: false, /// для изменения иска у истца
  lookChangeDeleteIsks: false, /// для удаления иска у истца
  idStatus: 0, /// для просмотра модалки изменения статуса(id)
  /////////////////////////////
  confirmActionFullfilled: false, /// для прнятия иска ответствкным секретарём и для прнятия иска председателем
  confirmActionReject: false, /// для отказа иска ответствкным секретарём и  для отказа иска председателем
  //////////////////////////////////
  objectionPdfVeiw: false, /// для создания возражения ответчика
  objectionConfirmPdfVeiw: false, /// для отказа иска ответствкным секретарём и  для отказа иска председателем
  lookDocs: false, // для отображения файлов для просмотра только у председателя
  arbitrPred: 0, /// для выбора арбитра председателем
};

const stateSlice = createSlice({
  name: "stateSlice",
  initialState,
  reducers: {
    changeMainBtnList: (state, action) => {
      state.mainBtnList = action.payload;
    },
    clearMainBtnList: (state, action) => {
      state.mainBtnList = [
        //////// для ответ. секр и председателя
        {
          id: 0,
          name: "Иски",
          bool: true,
        },
        {
          id: 1,
          name: "Принятые ответственным секретарём",
          bool: false,
        },
        {
          id: 2,
          name: "Отклонённые ответственным секретарём",
          bool: false,
        },
        {
          id: 3,
          name: "Принятые председателем",
          bool: false,
        },
        {
          id: 4,
          name: "Отклонённые председателем",
          bool: false,
        },
        //////// для истца
        {
          id: 5,
          name: "Все иски",
          bool: true,
        },
        {
          id: 6,
          name: "Поданные",
          bool: false,
        },
        {
          id: 7,
          name: "Принятые",
          bool: false,
        },
        {
          id: 8,
          name: "Отказанные",
          bool: false,
        },
      ];
    },
    sortDataIsksCounts: (state, action) => {
      state.mainBtnList = [
        {
          id: 0,
          name: "Иски",
          bool: state.mainBtnList[0]?.bool, // Сохраняю текущее значение bool
          count: action?.payload?.isk_count || 0,
        },
        {
          id: 1,
          name: "Принятые ответственным секретарём",
          bool: state.mainBtnList[1]?.bool,
          count: action?.payload?.prinat_sec_total || 0,
        },
        {
          id: 2,
          name: "Отклонённые ответственным секретарём",
          bool: state.mainBtnList[2]?.bool,
          count: action?.payload?.otclon_sec_total || 0,
        },
        {
          id: 3,
          name: "Принятые председателем",
          bool: state.mainBtnList[3]?.bool,
          count: action?.payload?.prinat_pred_total || 0,
        },
        {
          id: 4,
          name: "Отклонённые председателем",
          bool: state.mainBtnList[4]?.bool,
          count: action?.payload?.otclon_pred_total || 0,
        },
        /////////////////////////
        {
          id: 5,
          name: "Все иски",
          bool: state.mainBtnList[5]?.bool,
          count: action?.payload?.isk_draft_total || 0,
        },
        {
          id: 6,
          name: "Поданные",
          bool: state.mainBtnList[6]?.bool,
          count: action?.payload?.isk_count || 0,
        },
        {
          id: 7,
          name: "Принятые",
          bool: state.mainBtnList[7]?.bool,
          count: action?.payload?.prinat_total || 0,
        },
        {
          id: 8,
          name: "Отказанные",
          bool: state.mainBtnList[8]?.bool,
          count: action?.payload?.otclon_total || 0,
        },
      ];
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
    /////////////////////////////////////////////////
    changeLookChangeStatus: (state, action) => {
      state.lookChangeStatus = action.payload;
    },
    changeLookChangeEditIsks: (state, action) => {
      state.lookChangeEditIsks = action.payload;
    },
    changeLookChangeDeleteIsks: (state, action) => {
      state.lookChangeDeleteIsks = action.payload;
    },
    changeIdStatus: (state, action) => {
      state.idStatus = action.payload;
    },
    /////////////////////////////////////////////////
    changeActionFullfilled: (state, action) => {
      state.confirmActionFullfilled = action?.payload;
    },
    changeActionReject: (state, action) => {
      state.confirmActionReject = action?.payload;
    },
    /////////////////////////////////////////////////
    changeObjectionPdfVeiw: (state, action) => {
      state.objectionPdfVeiw = action?.payload;
    },
    changeObjectionConfirm: (state, action) => {
      state.objectionConfirmPdfVeiw = action?.payload;
    },
    changeLookDocs: (state, action) => {
      state.lookDocs = action?.payload;
    },
    changeArbitrPred: (state, action) => {
      state.arbitrPred = action?.payload;
    },
  },
});

export const {
  changeMainBtnList,
  clearMainBtnList,
  changeLookAddPlaintiff,
  changeCalculatorState,
  changeSumIsk,
  changeResult,
  changeCalculatorType,
  changeTypePay,
  changeLookDataAllPlaintiff,
  changeListPlaint,
  changeLookChangeStatus,
  changeLookChangeEditIsks,
  changeLookChangeDeleteIsks,
  changeIdStatus,
  sortDataIsksCounts,
  changeActionFullfilled,
  changeActionReject,
  changeObjectionPdfVeiw,
  changeObjectionConfirm,
  changeLookDocs,
  changeArbitrPred,
} = stateSlice.actions;

export default stateSlice.reducer;
