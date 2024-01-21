import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tokenA: '',
  typeUser: 0, /// типы пользователей
};

const saveDataSlice = createSlice({
  name: 'saveDataSlice',
  initialState,
  reducers: {
    changeTokenA: (state, action) => {
      state.tokenA = action.payload;
    },
    changeTypeUser: (state, action) => {
      state.typeUser = action.payload;
    },
  },
});
export const { changeTokenA, changeTypeUser } = saveDataSlice.actions;

export default saveDataSlice.reducer;
