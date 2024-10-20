import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../axiosInstance";

const { REACT_APP_API_URL } = process.env;

const initialState = {
  preloaderArh: false,
  listYesrs: [], /// список годов
};

////getJournals //// get список журналов
export const getJournals = createAsyncThunk(
  "getJournals",
  async function (props, { dispatch, rejectWithValue }) {
    try {
      const url = `${REACT_APP_API_URL}/isks/get_journals`;
      const response = await axiosInstance(url);
      if (response.status >= 200 && response.status < 300) {
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////crudJournals //// обновление списока журналов
export const crudJournals = createAsyncThunk(
  "crudJournals",
  async function ({ data }, { dispatch, rejectWithValue }) {
    try {
      const url = `${REACT_APP_API_URL}/isks/crud_journal`;
      const response = await axiosInstance.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const archiveSlice = createSlice({
  name: "archiveSlice",
  initialState,
  extraReducers: (builder) => {
    ///// getJournals
    builder.addCase(getJournals.fulfilled, (state, action) => {
      state.preloaderSel = false;
      state.listYesrs = action.payload;
    });
    builder.addCase(getJournals.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderSel = false;
    });
    builder.addCase(getJournals.pending, (state, action) => {
      state.preloaderSel = true;
    });
  },
  reducers: {
    changeTypeSecretarDela: (state, action) => {
      state.typeSecretarDela = action.payload;
    },
  },
});
export const { changeTypeSecretarDela } = archiveSlice.actions;

export default archiveSlice.reducer;
