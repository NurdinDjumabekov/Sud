import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { changeTokenA, changeTypeUser } from "./saveDataSlice";
import axiosInstance from "../../axiosInstance";

const { REACT_APP_API_URL } = process.env;

const initialState = {
  listHistoryIsks: [],
  preloaderHis: false,
};

//////// getHistoryIsks - get исорию исков
export const getHistoryIsks = createAsyncThunk(
  "getHistoryIsks",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/isks/get_history_isks`;
    try {
      const response = await axiosInstance.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const historyIsks = createSlice({
  name: "historyIsks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    ///// getHistoryIsks
    builder.addCase(getHistoryIsks.fulfilled, (state, action) => {
      state.preloaderHis = false;
      state.listHistoryIsks = action.payload;
    });
    builder.addCase(getHistoryIsks.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderHis = false;
    });
    builder.addCase(getHistoryIsks.pending, (state, action) => {
      state.preloaderHis = true;
    });
  },
});
export const {} = historyIsks.actions;

export default historyIsks.reducer;
