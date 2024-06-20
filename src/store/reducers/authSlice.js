import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { changeTokenA, changeTypeUser } from "./saveDataSlice";

const initialState = {
  preloaderAuth: false,
};

export const authLogin = createAsyncThunk(
  "authLogin",
  async function ({ data, navigate }, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "POST",
        url: "http://mttp-renaissance.333.kg/api/auth/login",
        data,
      });
      if (response.status >= 200 && response.status < 300) {
        const decodedToken = jwtDecode(response?.data?.token?.accessToken);

        dispatch(changeTypeUser(decodedToken?.type_user));
        dispatch(changeTokenA(response?.data?.token?.accessToken));

        return { navigate };
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    ///// authLogin
    builder.addCase(authLogin.fulfilled, (state, action) => {
      state.preloaderAuth = false;
      const { navigate } = action.payload;
      navigate("/main");
    });
    builder.addCase(authLogin.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderAuth = false;
    });
    builder.addCase(authLogin.pending, (state, action) => {
      state.preloaderAuth = true;
    });
  },
});
export const {} = authSlice.actions;

export default authSlice.reducer;
