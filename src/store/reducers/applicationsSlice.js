import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { transformCreateData } from "../../helpers/transformCreateData";
import { sortDeletePlaintiff } from "../../helpers/sortDeletePlaintiff";
import { transformArrDocs } from "../../helpers/transformArrDocs";

const initialState = {
  todosApplications: {
    codeid: 0,
    plaintiff: [], //1 plaintiff
    plaintiffResper: [], //2
    defendant: [], //3
    defendantResper: [], //4

    name: "",
    description: "",
    motivation: "",
    obosnovanie: "",
    finance_raschet: "",
    law_links: "",
    claim: "",
    ///////////////////////////////
    summ: "",
    summ_curr: 1, /// select (default-сом)
    arbitr_fee: "",
    arbitr_curr: 1, /// select (default-сом)
    registr_fee: "",
    registr_curr: 1, /// select (default-сом)
    doplata_summ: "",
    nadbavka_curr: 1, /// select (default-сом)
    arbitr_pay_end_date: "", //
    arbitr_doplata_end_date: "", //
    ///////////////////////////////
    prim_pravo: 1, /// select
    reglament: 2, /// select
    haracter_spor: 1, /// select
    arbitr_lang: 1, /// select
    is_arbitr_po_dogovor: 0, //  1 - true и 0 - false
    status: 1, /// why?
    //////////////////
  },
  //// массив дел
  applicationList: [], // для сохранения файлов
  preloaderDocs: false,
};

/// editIsks ///
export const editIsks = createAsyncThunk(
  "editIsks",
  async function (info, { dispatch, rejectWithValue }) {
    const { id, tokenA, navigate, applicationList } = info;
    try {
      const response = await axios({
        method: "GET",
        url: `http://mttp-renaissance.333.kg/api/isks/get/${id}`,
        headers: {
          Authorization: `Bearer ${tokenA}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        return { data: response?.data, navigate, applicationList };
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// toTakeTypeTypeDocs /// для получения всех загружаемых данных
export const toTakeTypeTypeDocs = createAsyncThunk(
  "toTakeTypeTypeDocs",
  async function (token, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `http://mttp-renaissance.333.kg/api/get/document_type?razdel=1`,
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

/// sendDocsIsks /// для отправки документов
export const sendDocsIsks = createAsyncThunk(
  "sendDocsIsks",
  async function (info, { dispatch, rejectWithValue }) {
    // console.log(info?.name,"info?.name");
    try {
      const response = await axios({
        method: "POST",
        url: `http://mttp-renaissance.333.kg/api/isks/crud/files`,
        headers: {
          Authorization: `Bearer ${info?.tokenA}`,
        },
        data: info?.fileData,
      });
      if (response.status >= 200 && response.status < 300) {
        return {
          fileData: info?.fileData,
          codeid_file: +response?.data?.code_file,
          file_path: response?.data?.file_path,
          code_file: +info.code_file,
          name: info?.name,
        };
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// deleteDocsIsks /// для получения всех загружаемых данных
export const deleteDocsIsks = createAsyncThunk(
  "deleteDocsIsks",
  async function (info, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "POST",
        url: `http://mttp-renaissance.333.kg/api/isks/del/files`,
        headers: {
          Authorization: `Bearer ${info?.tokenA}`,
        },
        data: {
          codeid_file: info?.file,
          code_isk: info?.code_isk,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        return info?.file;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// deletePlaintiff // удаление истоцов и ответчиков(представителей тоже)
export const deleteEveryIsk = createAsyncThunk(
  "deleteEveryIsk",
  async function (info, { dispatch, rejectWithValue }) {
    const faceData = { action_type: 3, codeid: +info?.objData?.codeid };
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
        console.log(info?.todosApplications);
        return {
          todosApplications: info?.todosApplications,
          codeid: +info?.objData?.codeid,
          role: info?.role,
        };
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// sendDocsReject // отправка файла принятия или отказа иска
export const sendDocsReject = createAsyncThunk(
  "sendDocsReject",
  async function (info, { dispatch, rejectWithValue }) {
    console.log(info, "sendDocsReject");
    try {
      const response = await axios({
        method: "POST",
        url: `http://mttp-renaissance.333.kg/api/isks/crud/files`,
        headers: {
          Authorization: `Bearer ${info?.tokenA}`,
        },
        data: info?.formData,
      });
      if (response.status >= 200 && response.status < 300) {
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// sendMainDocs // отправка файла иска(самый главный документ)
export const sendMainDocs = createAsyncThunk(
  "sendMainDocs",
  async function (info, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "POST",
        url: `http://mttp-renaissance.333.kg/api/isks/crud/files`,
        headers: {
          Authorization: `Bearer ${info?.tokenA}`,
        },
        data: info?.fileData,
      });
      if (response.status >= 200 && response.status < 300) {
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const applicationsSlice = createSlice({
  name: "applicationsSlice",
  initialState,
  extraReducers: (builder) => {
    ///// selTypeTypeDocs
    builder.addCase(toTakeTypeTypeDocs.fulfilled, (state, action) => {
      state.preloaderDocs = false;
      state.applicationList = action?.payload?.map((i) => {
        return {
          codeid: i.codeid,
          name: i.name,
          status: i.status,
          arrDocs: [],
        };
      });
    });
    builder.addCase(toTakeTypeTypeDocs.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderDocs = false;
    });
    builder.addCase(toTakeTypeTypeDocs.pending, (state, action) => {
      state.preloaderDocs = true;
    });

    ///// sendDocsIsks
    builder.addCase(sendDocsIsks.fulfilled, (state, action) => {
      state.preloaderDocs = false;
      state.applicationList = state.applicationList?.map((i) => {
        if (+i?.codeid === +action?.payload?.code_file) {
          return {
            ...i,
            arrDocs: [
              ...i?.arrDocs,
              {
                code_file: +action?.payload?.code_file,
                name: action?.payload?.name,
                codeid_file: action?.payload?.codeid_file,
                file_path: action?.payload?.file_path,
              },
            ],
          };
        } else {
          return i;
        }
      });
    });
    builder.addCase(sendDocsIsks.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderDocs = false;
    });
    builder.addCase(sendDocsIsks.pending, (state, action) => {
      state.preloaderDocs = true;
    });

    ///// deleteDocsIsks
    builder.addCase(deleteDocsIsks.fulfilled, (state, action) => {
      state.preloaderDocs = false;
      state.applicationList = state.applicationList.map((item) => ({
        ...item,
        arrDocs: item.arrDocs.filter(
          (doc) => doc.codeid_file !== action.payload
        ),
        //// удаляю документ, если у них похожи документы
      }));
    });
    builder.addCase(deleteDocsIsks.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderDocs = false;
    });
    builder.addCase(deleteDocsIsks.pending, (state, action) => {
      state.preloaderDocs = true;
    });

    ////// editIsks
    builder.addCase(editIsks.fulfilled, (state, action) => {
      state.preloaderDocs = false;
      state.todosApplications = action.payload?.data;
      state.applicationList = transformArrDocs({
        arrIsk: action?.payload?.applicationList,
        reqData: action.payload?.data?.files,
      });
      action.payload?.navigate("/plaintiffCreate");
    });
    builder.addCase(editIsks.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderDocs = false;
    });
    builder.addCase(editIsks.pending, (state, action) => {
      state.preloaderDocs = true;
    });

    /// deleteEveryIsk
    builder.addCase(deleteEveryIsk.fulfilled, (state, action) => {
      state.preloaderDocs = false;
      state.todosApplications = sortDeletePlaintiff(action.payload);
    });
    builder.addCase(deleteEveryIsk.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderDocs = false;
    });
    builder.addCase(deleteEveryIsk.pending, (state, action) => {
      state.preloaderDocs = true;
    });
  },
  reducers: {
    addTodosPlaintiff: (state, action) => {
      state.todosApplications = {
        ...state.todosApplications,
        plaintiff: [...state.todosApplications.plaintiff, action.payload],
      };
    },
    addTodosPlaintiffResper: (state, action) => {
      const { plaintiffResper } = state.todosApplications;
      if (action.payload.id) {
        const newArr = plaintiffResper.map((obj) => {
          if (obj.id === action.payload.id) {
            return action.payload;
          } else {
            return obj;
          }
        });
        state.todosApplications.plaintiffResper = newArr;
      } else {
        const id =
          plaintiffResper.length === 0
            ? 1
            : plaintiffResper[plaintiffResper.length - 1].id + 1;
        state.todosApplications.plaintiffResper = [
          ...plaintiffResper,
          { ...action.payload, id },
        ];
      }
    },
    addTodosDefendant: (state, action) => {
      const { defendant } = state.todosApplications;
      if (action.payload.id) {
        const newArr = defendant.map((obj) => {
          if (obj.id === action.payload.id) {
            return action.payload;
          } else {
            return obj;
          }
        });
        state.todosApplications.defendant = newArr;
      } else {
        const id =
          defendant.length === 0 ? 1 : defendant[defendant.length - 1].id + 1;
        state.todosApplications.defendant = [
          ...defendant,
          { ...action.payload, id },
        ];
      }
    },
    addTodosDefendantResper: (state, action) => {
      const { defendantResper } = state.todosApplications;
      if (action.payload.id) {
        const newArr = defendantResper.map((obj) => {
          if (obj.id === action.payload.id) {
            return action.payload;
          } else {
            return obj;
          }
        });
        state.todosApplications.defendantResper = newArr;
      } else {
        const id =
          defendantResper.length === 0
            ? 1
            : defendantResper[defendantResper.length - 1].id + 1;
        state.todosApplications.defendantResper = [
          ...defendantResper,
          { ...action.payload, id },
        ];
      }
    },
    changeTodosApplications: (state, action) => {
      state.todosApplications = action.payload;
    },
    clearTodosApplications: (state, action) => {
      state.todosApplications = {
        codeid: 0,
        plaintiff: [], //1 plaintiff
        plaintiffResper: [], //2
        defendant: [], //3
        defendantResper: [], //4
        name: "",
        description: "",
        motivation: "",
        obosnovanie: "",
        finance_raschet: "",
        law_links: "",
        claim: "",
        summ: "",
        summ_curr: 1, /// select
        arbitr_fee: "",
        arbitr_curr: 1, /// select
        registr_fee: "",
        registr_curr: 1, /// select
        doplata_summ: "",
        nadbavka_curr: 1, /// select
        arbitr_pay_end_date: "", //
        arbitr_doplata_end_date: "", //
        prim_pravo: 1,
        reglament: 2,
        haracter_spor: 1,
        arbitr_lang: 1,
        is_arbitr_po_dogovor: 0, // заменить на 1 и 0
        status: "1", /// why?
      };
    },
    changeApplicationList: (state, action) => {
      state.applicationList = action.payload;
    },
  },
});
export const {
  addTodosPlaintiff,
  addTodosPlaintiffResper,
  addTodosDefendant,
  addTodosDefendantResper,
  changeTodosApplications,
  clearTodosApplications,
  changeApplicationList,
} = applicationsSlice.actions;

export default applicationsSlice.reducer;
