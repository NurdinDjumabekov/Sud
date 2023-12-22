import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  input: 'Nurdin Djumabekov',
  inputs: {},
};

// export const dataDetailedPage = createAsyncThunk(
//   'dataDetailedPage',
//   async (info, { dispatch }) => {
//     dispatch(changePreloader(true));
//     try {
//       const { data } = await standartAxios(info?.url, info.lang);
//       dispatch(changeEveryLang(data));
//       dispatch(changePreloader(false));
//     } catch (err) {
//       console.log(err);
//       dispatch(changePreloader(false));
//     }
//   }
// );

const inputSlice = createSlice({
  name: 'inputSlice',
  initialState,
  reducers: {
    changeInput: (state, action) => {
      state.input = action.payload;
    },
  },
});
export const { changeInput } = inputSlice.actions;

export default inputSlice.reducer;
