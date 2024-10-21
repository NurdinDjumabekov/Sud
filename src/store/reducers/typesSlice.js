import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

const initialState = {
  plaintiffType: 1, //// check check
  alertText: { text: "", backColor: "", state: false },
};

export const test = createAsyncThunk(
  "test",
  async function (props, { dispatch, rejectWithValue }) {
    const url = "http://mttp-renaissance.333.kg/api/isks/get_filter";
    try {
      const response = await axiosInstance(url);
      if (response.status >= 200 && response.status < 300) {
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const typesSlice = createSlice({
  name: "typesSlice",
  initialState,
  reducers: {
    changePlaintiffType: (state, action) => {
      state.plaintiffType = action.payload;
    },

    changeAlertText: (state, action) => {
      const text = action.payload;
      state.alertText = { text, backColor: "#f9fafd", state: true };
    },

    clearAlertText: (state, action) => {
      state.alertText = { text: "", backColor: "", state: false };
    },
  },
});
export const { changePlaintiffType, changeAlertText, clearAlertText } =
  typesSlice.actions;

export default typesSlice.reducer;
