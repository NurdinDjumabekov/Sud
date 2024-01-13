import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import { jwtDecode } from "jwt-decode";
import { changeTokenA } from "./saveDataSlice";

const initialState = {
  listTodos: [],
};

export const authLogin = createAsyncThunk(
  "authLogin",
  async function (data, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "POST",
        url: "http://mttp-renaissance.333.kg/api/auth/login",
        data: {
          email: "polina.mumber@gmail.com",
          password: "123123321",
        },
      });
      if (response.status >= 200 && response.status < 300) {
        // const decodedToken = jwtDecode(response?.data?.token?.accessToken);
        // console.log(decodedToken, decodedToken);
        dispatch(changeTokenA(response?.data?.token?.accessToken));
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const sendDocsSlice = createSlice({
  name: "sendDocsSlice",
  initialState,
  reducers: {},
  //   extraReducers: (builder) => {
  //     ///// getAllDataFood
  //     builder.addCase(getAllDataFood.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.allDataFood = action.payload;
  //     });
  //     builder.addCase(getAllDataFood.rejected, (state, action) => {
  //       state.error = action.payload;
  //       state.loading = false;
  //     });
  //     builder.addCase(getAllDataFood.pending, (state, action) => {
  //       state.loading = true;
  //     });
  //   },
});
export const {} = sendDocsSlice.actions;

export default sendDocsSlice.reducer;
