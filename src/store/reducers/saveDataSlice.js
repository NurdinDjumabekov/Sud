import { createSlice } from "@reduxjs/toolkit";

// 1  Секретарь
// 2  Ответственный секретарь
// 3  Председатель
// 4  Истец

const initialState = {
  tokenA: "",
  typeUser: 0, /// типы пользователей
  checkEditPlaint: true, /// true - можно редактировать иск, false - нельзя редактировать иск
};
///   const { checkEditPlaint } = useSelector((state) => state.saveDataSlice);

const saveDataSlice = createSlice({
  name: "saveDataSlice",
  initialState,
  reducers: {
    changeTokenA: (state, action) => {
      state.tokenA = action.payload;
    },
    changeTypeUser: (state, action) => {
      state.typeUser = action.payload;
    },
    changeCheckEditPlaint: (state, action) => {
      state.checkEditPlaint = action.payload;
    },
  },
});
export const { changeTokenA, changeTypeUser, changeCheckEditPlaint } =
  saveDataSlice.actions;

export default saveDataSlice.reducer;
