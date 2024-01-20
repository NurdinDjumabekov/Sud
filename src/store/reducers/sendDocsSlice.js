import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { changeADFF, changeADUF, changeDocsIsks } from "./inputSlice";
import {
  changeTodosApplications,
  toTakeTypeTypeDocs,
} from "./applicationsSlice";
import { changeActionType } from "../../helpers/changeActionType";
import { transformCreateData } from "../../helpers/transformCreateData";

const initialState = {
  preloader: false,
  listTodos: [],
};

export const toTakeIsksList = createAsyncThunk(
  "toTakeIsksList",
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
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//// для получения id иска
export const createIdIsk = createAsyncThunk(
  "createIsk",
  async function (info, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "POST",
        url: `http://mttp-renaissance.333.kg/api/isks/crud`,
        data: {
          action_type: 1, /// для создания иска
        },
        headers: {
          Authorization: `Bearer ${info.tokenA}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        dispatch(
          changeTodosApplications({
            ...info?.todosApplications,
            codeid: response?.data?.codeid,
          })
        );
        dispatch(
          changeADFF({
            ...info?.adff,
            code_isk: response?.data?.codeid,
          })
        );
        dispatch(
          changeADUF({
            ...info?.aduf,
            code_isk: response?.data?.codeid,
          })
        );
        dispatch(
          changeDocsIsks({
            ...info?.docsIsks,
            code_isk: response?.data?.codeid,
          })
        );
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

///sendEveryIsks - создание и редактирование иска
export const sendEveryIsks = createAsyncThunk(
  "sendEveryIsks",
  async function (info, { dispatch, rejectWithValue }) {
    const newData = { ...info?.todosApplications };
    delete newData["files"];
    try {
      const response = await axios({
        method: "POST",
        url: `http://mttp-renaissance.333.kg/api/isks/crud`,
        data: {
          ...newData,
          action_type: 2, /// для редактировования созданного иска
        },
        headers: {
          Authorization: `Bearer ${info.tokenA}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        dispatch(toTakeTypeTypeDocs(info.tokenA)); /// для очистки (сброса) типа файлов
        // console.log(response, "create");
        // return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// createEveryIsk - create and edit plaintiff
export const createEveryIsk = createAsyncThunk(
  "createEveryIsk",
  async function (info, { dispatch, rejectWithValue }) {
    const faceData = info?.typeFace === 1 ? info?.adff : info?.aduf;
    const obj = transformCreateData(info, info?.role, faceData);
    try {
      const response = await axios({
        method: "POST",
        url: `http://mttp-renaissance.333.kg/api/isks/crud`,
        data: {
          action_type: 2,
          ...obj,
        },
        headers: {
          Authorization: `Bearer ${info?.tokenA}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        const newdata = changeActionType(response?.data);
        dispatch(
          changeTodosApplications({
            ...info?.todosApplications,
            ...newdata,
          })
        );
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// deleteIsks - удаление исков
export const deleteIsks = createAsyncThunk(
  "deleteIsks",
  async function (info, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "POST",
        url: `http://mttp-renaissance.333.kg/api/isks/crud`,
        data: {
          action_type: 3,
          codeid: +info?.codeid,
        },
        headers: {
          Authorization: `Bearer ${info?.tokenA}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        return +info?.codeid;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// changeStatusIsks - изменения статуса иска у истца
export const changeStatusIsks = createAsyncThunk(
  "deleteIsks",
  async function (info, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "POST",
        url: `http://mttp-renaissance.333.kg/api/isks/crud`,
        data: {
          action_type: 4,
          codeid: +info?.idStatus,
        },
        headers: {
          Authorization: `Bearer ${info?.tokenA}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        dispatch(toTakeIsksList(info?.tokenA));
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
  reducers: {
    changePreloader: (state, action) => {
      state.preloader = action.payload;
    },
    changeListTodos: (state, action) => {
      state.listTodos = action.payload;
    },
    addListTodos: (state, action) => {
      /// добавление нового обьекта!
      state.listTodos = [
        ...state.listTodos,
        {
          ...action.payload,
          codeid: "5",
          isk_status: null,
          isk_status_name: null,
          arbitrs: [],
          files: [],
        },
      ];
    },
  },
  extraReducers: (builder) => {
    ///// toTakeIsksList
    builder.addCase(toTakeIsksList.fulfilled, (state, action) => {
      state.preloader = false;
      state.listTodos = action.payload;
    });
    builder.addCase(toTakeIsksList.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(toTakeIsksList.pending, (state, action) => {
      state.preloader = true;
    });
    ///// createIdIsk
    builder.addCase(createIdIsk.fulfilled, (state, action) => {
      state.preloader = false;
      state.createIdIsk = action.payload;
    });
    builder.addCase(createIdIsk.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(createIdIsk.pending, (state, action) => {
      state.preloader = true;
    });
    ////// createEveryIsk
    builder.addCase(createEveryIsk.fulfilled, (state, action) => {
      state.preloader = false;
      // state.createEveryIsk = action.payload;
    });
    builder.addCase(createEveryIsk.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(createEveryIsk.pending, (state, action) => {
      state.preloader = true;
    });
    ////// deleteIsks
    builder.addCase(deleteIsks.fulfilled, (state, action) => {
      state.preloader = false;
      state.listTodos = state.listTodos?.filter(
        (isk) => +isk.codeid !== +action.payload
      );
    });
    builder.addCase(deleteIsks.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(deleteIsks.pending, (state, action) => {
      state.preloader = true;
    });
  },
});
export const { changePreloader, changeListTodos, addListTodos } =
  sendDocsSlice.actions;

export default sendDocsSlice.reducer;
