import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  preloaderNotif: false,
  listNotifs: [],
  notifCount: 0 || 0,
};

export const toTakeNotification = createAsyncThunk(
  "toTakeNotification",
  async function (info, { dispatch, rejectWithValue }) {
    const { tokenA } = info;
    try {
      const response = await axios({
        method: "GET",
        url: `http://mttp-renaissance.333.kg/api/notif/get`,
        headers: {
          Authorization: `Bearer ${tokenA}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        // console.log(response, "sadsad");
        return response?.data?.notifs;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const notificationCount = createAsyncThunk(
  "notificationCount",
  async function (tokenA, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `http://mttp-renaissance.333.kg/api/notif/count_notif`,
        headers: {
          Authorization: `Bearer ${tokenA}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        return response?.data?.count;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const notificationRead = createAsyncThunk(
  "notificationCount",
  async function (info, { dispatch, rejectWithValue }) {
    const { tokenA, notifs } = info;
    try {
      const response = await axios({
        method: "POST",
        url: `http://mttp-renaissance.333.kg/api/notif/set_read`,
        data: {
          notifs,
        },
        headers: {
          Authorization: `Bearer ${tokenA}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        // dispatch(notificationCount(tokenA));
        return response?.data?.count;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const notificationSlice = createSlice({
  name: "notificationSlice",
  initialState,
  extraReducers: (builder) => {
    ///// toTakeNotification
    builder.addCase(toTakeNotification.fulfilled, (state, action) => {
      state.preloaderNotif = false;
      state.listNotifs = action.payload;
    });
    builder.addCase(toTakeNotification.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderNotif = false;
    });
    builder.addCase(toTakeNotification.pending, (state, action) => {
      state.preloaderNotif = true;
    });
    ///// notificationCount
    builder.addCase(notificationCount.fulfilled, (state, action) => {
      state.preloaderNotif = false;
      state.notifCount = action.payload;
    });
    builder.addCase(notificationCount.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderNotif = false;
    });
    builder.addCase(notificationCount.pending, (state, action) => {
      state.preloaderNotif = true;
    });
  },
  reducers: {},
});

export const {} = notificationSlice.actions;

export default notificationSlice.reducer;
