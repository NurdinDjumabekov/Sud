import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { changeADFF, changeADUF, changeDocsIsks } from "./inputSlice";
import { changeTodosApplications } from "./applicationsSlice";
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

export const sendEveryIsks = createAsyncThunk(
  "sendEveryIsks",
  async function (info, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "POST",
        url: `http://mttp-renaissance.333.kg/api/isks/crud`,
        data: {
          ...info?.todosApplications,
          action_type: 2, /// для редактировования созданного иска
        },
        headers: {
          Authorization: `Bearer ${info.tokenA}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        console.log(response, "create");
        // return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// plaintiff
/// defendant
/// plaintiffResper
/// defendantResper
/// code_fiz_face: 1,

export const createEveryIsk = createAsyncThunk(
  "createEveryIsk",
  async function (info, { dispatch, rejectWithValue }) {
    try {
      const faceData = info?.typeFace === 1 ? info?.adff : info?.aduf;
      const obj = transformCreateData(info, info?.role, faceData);
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

////////////////////delete
export const createFizFace = createAsyncThunk(
  "createFizFace",
  async function (info, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "POST",
        url: `http://mttp-renaissance.333.kg/api/crud/fiz_face`,
        data: {
          ...info?.adff,
          fiz_face_type: info?.fiz_face_type,
          action_type: 1,
        },
        headers: {
          Authorization: `Bearer ${info?.tokenA}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        // if (info?.fiz_face_type === 1) {
        //   dispatch(
        //     addTodosPlaintiff({ ...info?.adff, typeFace: info?.typeFace })
        //   );
        // } else if (info?.fiz_face_type === 3) {
        //   dispatch(
        //     addTodosPlaintiffResper({ ...info?.adff, typeFace: info?.typeFace })
        //   );
        // } else if (info?.fiz_face_type === 2) {
        //   dispatch(
        //     addTodosDefendant({ ...info?.adff, typeFace: info?.typeFace })
        //   );
        // } else if (info?.fiz_face_type === 4) {
        //   dispatch(
        //     addTodosDefendantResper({ ...info?.adff, typeFace: info?.typeFace })
        //   );
        // }
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toTakeIdUrFace = createAsyncThunk(
  "toTakeIdUrFace",
  async function (info, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "POST",
        url: `http://mttp-renaissance.333.kg/api/crud/fiz_face`,
        headers: {
          Authorization: `Bearer ${info?.tokenA}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        console.log(response, "response");
        dispatch(changeADUF({ ...info.aduf, codeid: response?.data?.codeid }));
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
    changeCreateIdIsk: (state, action) => {
      state.createIdIsk = action.payload;
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
    ///// toTakeIdFizFace
    builder.addCase(createFizFace.fulfilled, (state, action) => {
      state.preloader = false;
    });
    builder.addCase(createFizFace.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(createFizFace.pending, (state, action) => {
      state.preloader = true;
    });
  },
});
export const {
  changePreloader,
  changeListTodos,
  addListTodos,
  changeCreateIdIsk,
} = sendDocsSlice.actions;

export default sendDocsSlice.reducer;
