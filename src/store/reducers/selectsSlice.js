import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../axiosInstance";

const { REACT_APP_API_URL } = process.env;

const initialState = {
  preloaderSel: false,
  selCountries: [],
  selRegions: [],
  selDistrict: [],
  selTypeAddress: [],
  selTypeOrganiz: [],
  selTypeCompany: [],
  selTypePosition: [],
  selTypeValuta: [],
  selTypeTypeDocs: [],
  selCurrency: [],
  selHarSpora: [],
  selPrimPravo: [],
  selReglament: [],
  selLangArbitr: [],
  selSecretarDela: [],
  selArbitrs: [],
  typeSecretarDela: 0,
};

////-------------------////
/// toTakeCountries
export const toTakeCountries = createAsyncThunk(
  "toTakeCountries",
  async function (props, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/get/country`;
    try {
      const response = await axiosInstance(url);
      if (response.status >= 200 && response.status < 300) {
        return response?.data?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// toTakeRegions
export const toTakeRegions = createAsyncThunk(
  "toTakeRegions",
  async function (props, { dispatch, rejectWithValue }) {
    const { id } = props;
    const url = `${REACT_APP_API_URL}/get/region${
      id ? `?code_country=${id}` : ""
    }`;
    try {
      const response = await axiosInstance(url);
      if (response.status >= 200 && response.status < 300) {
        return response?.data?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// toTakeDistrict
export const toTakeDistrict = createAsyncThunk(
  "toTakeDistrict",
  async function (props, { dispatch, rejectWithValue }) {
    const { id } = props;
    const url = `${REACT_APP_API_URL}/get/district${
      id ? `?code_region=${id}` : ""
    }`;
    try {
      const response = await axiosInstance(url);
      if (response.status >= 200 && response.status < 300) {
        return response?.data?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////-------------------////

/// toTakeTypeAddress
export const toTakeTypeAddress = createAsyncThunk(
  "toTakeTypeAddress",
  async function (token, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `http://mttp-renaissance.333.kg/api/get/address_type`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        return response?.data?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
/// toTakeTypeOrganiz
export const toTakeTypeOrganiz = createAsyncThunk(
  "toTakeTypeOrganiz",
  async function (token, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `http://mttp-renaissance.333.kg/api/get/org_type`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        return response?.data?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
/// toTakeTypeCompany
export const toTakeTypeCompany = createAsyncThunk(
  "toTakeTypeCompany",
  async function (token, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `http://mttp-renaissance.333.kg/api/get/company_type`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        return response?.data?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
/// toTakeTypePosition
export const toTakeTypePosition = createAsyncThunk(
  "toTakeTypePosition",
  async function (token, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `http://mttp-renaissance.333.kg/api/get/position_type`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        return response?.data?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
/// toTakeTypeValuta
export const toTakeTypeValuta = createAsyncThunk(
  "toTakeTypeValuta",
  async function (token, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `http://mttp-renaissance.333.kg/api/get/currency`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        return response?.data?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//////toTakeCurrency
export const toTakeCurrency = createAsyncThunk(
  "toTakeCurrency",
  async function (token, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `http://mttp-renaissance.333.kg/api/get/currency`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        return response?.data?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//////toTakeHaracterS
export const toTakeHaracterS = createAsyncThunk(
  "toTakeHaracterS",
  async function (token, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `http://mttp-renaissance.333.kg/api/get/haracter_spora`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        return response?.data?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
////toTakePrimPravo
export const toTakePrimPravo = createAsyncThunk(
  "toTakePrimPravo",
  async function (token, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `http://mttp-renaissance.333.kg/api/get/prim_pravo`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        return response?.data?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
////toTakeReglament
export const toTakeReglament = createAsyncThunk(
  "toTakeReglament",
  async function (token, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `http://mttp-renaissance.333.kg/api/get/reglament`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        return response?.data?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
////toTakeLangArbit
export const toTakeLangArbit = createAsyncThunk(
  "toTakeLangArbit",
  async function (token, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `http://mttp-renaissance.333.kg/api/get/arbitr_lang`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        return response?.data?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////toTakeSecretarList
export const toTakeSecretarList = createAsyncThunk(
  "toTakeSecretarList",
  async function (token, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `http://mttp-renaissance.333.kg/api/get/sp_secretar`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        return response?.data?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////toTakeArbitrsList
export const toTakeArbitrsList = createAsyncThunk(
  "toTakeArbitrsList",
  async function ({ tokenA, search }, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `http://mttp-renaissance.333.kg/api/get/sp_arbitrs${
          search && `?search=${search}`
        }`,
        headers: {
          Authorization: `Bearer ${tokenA}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        return response?.data?.data;
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
      // state.preloaderSel = false;
      state.selCountries = action.payload;
    });
    builder.addCase(toTakeCountries.rejected, (state, action) => {
      state.error = action.payload;
      // state.preloaderSel = false;
    });
    builder.addCase(toTakeCountries.pending, (state, action) => {
      // state.preloaderSel = true;
    });
    ///// selDistrict
    builder.addCase(toTakeDistrict.fulfilled, (state, action) => {
      // state.preloaderSel = false;
      state.selDistrict = action.payload;
    });
    builder.addCase(toTakeDistrict.rejected, (state, action) => {
      state.error = action.payload;
      // state.preloaderSel = false;
    });
    builder.addCase(toTakeDistrict.pending, (state, action) => {
      // state.preloaderSel = true;
    });
    ///// selRegions
    builder.addCase(toTakeRegions.fulfilled, (state, action) => {
      // state.preloaderSel = false;
      state.selRegions = action.payload;
    });
    builder.addCase(toTakeRegions.rejected, (state, action) => {
      state.error = action.payload;
      // state.preloaderSel = false;
    });
    builder.addCase(toTakeRegions.pending, (state, action) => {
      // state.preloaderSel = true;
    });
    ///// selTypeAddress
    builder.addCase(toTakeTypeAddress.fulfilled, (state, action) => {
      state.preloaderSel = false;
      state.selTypeAddress = action.payload;
    });
    builder.addCase(toTakeTypeAddress.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderSel = false;
    });
    builder.addCase(toTakeTypeAddress.pending, (state, action) => {
      state.preloaderSel = true;
    });

    ///// selTypeOrganiz
    builder.addCase(toTakeTypeOrganiz.fulfilled, (state, action) => {
      state.preloaderSel = false;
      state.selTypeOrganiz = action.payload;
    });
    builder.addCase(toTakeTypeOrganiz.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderSel = false;
    });
    builder.addCase(toTakeTypeOrganiz.pending, (state, action) => {
      state.preloaderSel = true;
    });

    ///// selTypeCompany
    builder.addCase(toTakeTypeCompany.fulfilled, (state, action) => {
      state.preloaderSel = false;
      state.selTypeCompany = action.payload;
    });
    builder.addCase(toTakeTypeCompany.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderSel = false;
    });
    builder.addCase(toTakeTypeCompany.pending, (state, action) => {
      state.preloaderSel = true;
    });

    ///// selTypePosition
    builder.addCase(toTakeTypePosition.fulfilled, (state, action) => {
      state.preloaderSel = false;
      state.selTypePosition = action.payload;
    });
    builder.addCase(toTakeTypePosition.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderSel = false;
    });
    builder.addCase(toTakeTypePosition.pending, (state, action) => {
      state.preloaderSel = true;
    });

    ///// selTypeValuta
    builder.addCase(toTakeTypeValuta.fulfilled, (state, action) => {
      state.preloaderSel = false;
      state.selTypeValuta = action.payload;
    });
    builder.addCase(toTakeTypeValuta.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderSel = false;
    });
    builder.addCase(toTakeTypeValuta.pending, (state, action) => {
      state.preloaderSel = true;
    });
    ///// toTakeCurrency
    builder.addCase(toTakeCurrency.fulfilled, (state, action) => {
      state.preloaderSel = false;
      state.selCurrency = action.payload;
    });
    builder.addCase(toTakeCurrency.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderSel = false;
    });
    builder.addCase(toTakeCurrency.pending, (state, action) => {
      state.preloaderSel = true;
    });
    ///// toTakeHaracterS
    builder.addCase(toTakeHaracterS.fulfilled, (state, action) => {
      state.preloaderSel = false;
      state.selHarSpora = action.payload;
    });
    builder.addCase(toTakeHaracterS.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderSel = false;
    });
    builder.addCase(toTakeHaracterS.pending, (state, action) => {
      state.preloaderSel = true;
    });
    ///// toTakePrimPravo
    builder.addCase(toTakePrimPravo.fulfilled, (state, action) => {
      state.preloaderSel = false;
      state.selPrimPravo = action.payload;
    });
    builder.addCase(toTakePrimPravo.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderSel = false;
    });
    builder.addCase(toTakePrimPravo.pending, (state, action) => {
      state.preloaderSel = true;
    });
    ///// toTakeReglament
    builder.addCase(toTakeReglament.fulfilled, (state, action) => {
      state.preloaderSel = false;
      state.selReglament = action.payload;
    });
    builder.addCase(toTakeReglament.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderSel = false;
    });
    builder.addCase(toTakeReglament.pending, (state, action) => {
      state.preloaderSel = true;
    });
    ///// toTakeLangArbit
    builder.addCase(toTakeLangArbit.fulfilled, (state, action) => {
      state.preloaderSel = false;
      state.selLangArbitr = action.payload;
    });
    builder.addCase(toTakeLangArbit.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderSel = false;
    });
    builder.addCase(toTakeLangArbit.pending, (state, action) => {
      state.preloaderSel = true;
    });
    ///// toTakeSecretarList
    builder.addCase(toTakeSecretarList.fulfilled, (state, action) => {
      state.preloaderSel = false;
      state.selSecretarDela = action.payload;
    });
    builder.addCase(toTakeSecretarList.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderSel = false;
    });
    builder.addCase(toTakeSecretarList.pending, (state, action) => {
      state.preloaderSel = true;
    });
    ///// toTakeArbitrsList
    builder.addCase(toTakeArbitrsList.fulfilled, (state, action) => {
      // state.preloaderSel = false;
      state.selArbitrs = action.payload;
    });
    builder.addCase(toTakeArbitrsList.rejected, (state, action) => {
      state.error = action.payload;
      // state.preloaderSel = false;
    });
    builder.addCase(toTakeArbitrsList.pending, (state, action) => {
      // state.preloaderSel = true;
    });
  },
  reducers: {
    changeTypeSecretarDela: (state, action) => {
      state.typeSecretarDela = action.payload;
    },
  },
});
export const { changeTypeSecretarDela } = selectsSlice.actions;

export default selectsSlice.reducer;
