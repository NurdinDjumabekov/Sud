import { createSlice } from '@reduxjs/toolkit';

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

const initialState = {
  preloader: false,
};

const requestSlice = createSlice({
  name: 'requestSlice',
  initialState,
  reducers: {
    changePreloader: (state, action) => {
      state.preloader = action.payload;
    },
  },
});
export const { changePreloader } = requestSlice.actions;

export default requestSlice.reducer;
