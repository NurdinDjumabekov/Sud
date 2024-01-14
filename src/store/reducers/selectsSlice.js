import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  selCountries: [],
  selDistrict: [],
  selRegions: [],
  selTypeAddress: [],
  selTypeOrganiz: [],
  selTypeCompany: [],
  selTypePosition: [],
  selTypeValuta: [],
  selTypeTypeDocs: [],
};

export const toTakeCountries = createAsyncThunk(
  "toTakeCountries",
  async function (token, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `http://mttp-renaissance.333.kg/api/isks/get`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        console.log(response);
        // return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const selectsSlice = createSlice({
  name: "selectsSlice",
  initialState,
  extraReducers: (builder) => {
    ///// toTakeCountries
    builder.addCase(toTakeCountries.fulfilled, (state, action) => {
      state.preloader = false;
      state.listTodos = action.payload;
    });
    builder.addCase(toTakeCountries.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(toTakeCountries.pending, (state, action) => {
      state.preloader = true;
    });
  },
});
export const {} = selectsSlice.actions;

export default selectsSlice.reducer;
