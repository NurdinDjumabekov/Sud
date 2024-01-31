import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const toTakeNotification = createAsyncThunk(
  "toTakeNotification",
  async function (info, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "POST",
        url: "",
        data: {
          ...info?.dataLogin,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        return;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  counterNotif: false,
};

const notificationSlice = createSlice({
  name: "notificationSlice",
  initialState,
  reducers: {
    changeCounterNotif: (state, action) => {
      state.counterNotif = action.payload;
    },
  },
});

export const { changeCounterNotif } = notificationSlice.actions;

export default notificationSlice.reducer;
