import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { changeTokenA, changeTypeUser } from './saveDataSlice';

const initialState = {
  listTodos: [],
  loadingAuth: false,
};

export const authLogin = createAsyncThunk(
  'authLogin',
  async function (info, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: 'POST',
        url: 'http://mttp-renaissance.333.kg/api/auth/login',
        data: {
          ...info?.dataLogin,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        const decodedToken = jwtDecode(response?.data?.token?.accessToken);
        dispatch(changeTypeUser(+decodedToken?.type_user));
        dispatch(changeTokenA(response?.data?.token?.accessToken));
        return {
          navigate: info?.navigate,
          type_user: +decodedToken?.type_user,
        };
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    ///// authLogin
    builder.addCase(authLogin.fulfilled, (state, action) => {
      state.loadingAuth = false;
      // state.allDataFood = action.payload;
      if (+action.payload?.type_user === 4) {
        action?.payload?.navigate('/plaintiffCreate');
      } else if (+action.payload?.type_user === 3) {
        action?.payload?.navigate('/mainRespPred');
      } else if (+action.payload?.type_user === 2) {
        action?.payload?.navigate('/mainRespSec');
      } else if (+action.payload?.type_user === 1) {
        action?.payload?.navigate('/');
      }
    });
    builder.addCase(authLogin.rejected, (state, action) => {
      state.error = action.payload;
      state.loadingAuth = false;
    });
    builder.addCase(authLogin.pending, (state, action) => {
      state.loadingAuth = true;
    });
  },
});
export const {} = authSlice.actions;

export default authSlice.reducer;
