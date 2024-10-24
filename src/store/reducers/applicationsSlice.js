import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//////// helpers
import { transformArrDocs } from "../../helpers/transformArrDocs";
import axiosInstance from "../../axiosInstance";
import { clearTodosApp } from "../../helpers/clear";
import { delSidesIskFN } from "../../helpers/sortDeletePlaintiff";

const { REACT_APP_API_URL } = process.env;

const initialState = {
  listFilter: [], /// фильтры каждой роли

  dataIsk: {
    codeid: 0,
    plaintiff: [], //1 plaintiff
    plaintiffResper: [], //2
    defendant: [], //3
    defendantResper: [], //4
    arbitrs: [],

    name: "",
    description: "",
    ///////////////////////////////
    isk_summ: "",
    isk_summ_curr: 0, /// select (default-сом)
    code_arbitr: 0, /// select (default-не выбран)
    non_proprietary: 0,
    ///////////////////////////////
    motivation: "",
    obosnovanie: "",
    finance_raschet: "",
    law_links: "",
    claim: [],
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
    content: "", /// для html разметки(доков истца)
    contentPred: "", /// для html разметки(для председателя)
    place_arbitration: "", /// Место разбирательства
  },

  //// список документов, которые нужны для заполнения иска (просто текста)
  applicationList: [],

  preloaderDocs: false,
};

/////// getFilter - фильтры каждой роли
export const getFilter = createAsyncThunk(
  "getFilter",
  async function (props, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/isks/get_filter`;
    try {
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

/// editIsks ///
export const editIsks = createAsyncThunk(
  "editIsks",
  async function (props, { dispatch, rejectWithValue }) {
    const { id, navigate, applicationList } = props;

    const url = `${REACT_APP_API_URL}/isks/get/${id}`;
    try {
      const response = await axiosInstance(url);
      if (response.status >= 200 && response.status < 300) {
        return { data: response?.data, navigate, applicationList, id };
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/////// toTakeTypeTypeDocs
/////// для списка документов, которые нужны для заполнения иска (просто текста)
export const toTakeTypeTypeDocs = createAsyncThunk(
  "toTakeTypeTypeDocs",
  async function (props, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/get/document_type?razdel=1`;
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

/// delDataSidesFN // удаление истцов и ответчиков(представителей тоже)
export const delDataSidesFN = createAsyncThunk(
  "delDataSidesFN",
  async function ({ obj, role }, { dispatch, rejectWithValue }) {
    const { codeid, typeFace } = obj;
    /// action_type - 3 удаление (вложенного обьекта (кого-то их лиц (ответчик, истец)))
    const data = { action_type: 3, codeid, typeFace };

    const url = `${REACT_APP_API_URL}/isks/del_sides`;

    try {
      const response = await axiosInstance.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        if (response.data.status) {
          return { codeid, role };
        }
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
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/isks/del/files`;
    try {
      const response = await axiosInstance.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        return data?.codeid_file;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// getIsk /// для получения данных иска
export const getIsk = createAsyncThunk(
  "getIsk",
  async function (id, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/isks/get/${id}`;
    try {
      const response = await axiosInstance(url);
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

/// sendDocsIsks /// для отправки документов
export const sendDocsIsks = createAsyncThunk(
  "sendDocsIsks",
  async function (props, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/isks/crud/files`;
    const data = props?.fileData;
    try {
      const response = await axiosInstance.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        return {
          fileData: props?.fileData,
          codeid_file: +response?.data?.code_file,
          file_path: response?.data?.file_path,
          code_file: +props.code_file,
          name: props?.name,
        };
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////-------------------////

/// sendDocsReject // отправка файла принятия или отказа иска
export const sendDocsReject = createAsyncThunk(
  "sendDocsReject",
  async function (info, { dispatch, rejectWithValue }) {
    // console.log(info, "sendDocsReject");
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

// createIsksInDocs - создания иска в доксе
export const createIsksInDocs = createAsyncThunk(
  "createIsksInDocs",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/isks/create_journal_docs`;
    try {
      const response = await axiosInstance.post(url, data);
      if (response.status >= 200 && response.status < 300) {
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// editMainIskData - редактирование главных данных иска
export const editMainIskData = createAsyncThunk(
  "editMainIskData",
  async function (props, { dispatch, rejectWithValue }) {
    const { data } = props;

    const url = `${REACT_APP_API_URL}/isks/edit_main_isk`;
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

/// getArbitrsEveryIsks - get арбитров каждого иска
export const getArbitrsEveryIsks = createAsyncThunk(
  "getArbitrsEveryIsks",
  async function (props, { dispatch, rejectWithValue }) {
    const { data } = props;

    const url = `${REACT_APP_API_URL}/isks/edit_main_isk`;
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

/// editTypeChoice - изменение выбора типа арбитров
export const editTypeChoice = createAsyncThunk(
  "editTypeChoice",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/isks/edit_type_choice`;
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

const applicationsSlice = createSlice({
  name: "applicationsSlice",
  initialState,
  extraReducers: (builder) => {
    ///// getFilter
    builder.addCase(getFilter.fulfilled, (state, action) => {
      state.preloaderDocs = false;
      state.listFilter = action?.payload;
    });
    builder.addCase(getFilter.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderDocs = false;
    });
    builder.addCase(getFilter.pending, (state, action) => {
      state.preloaderDocs = true;
    });

    ///// toTakeTypeTypeDocs
    builder.addCase(toTakeTypeTypeDocs.fulfilled, (state, action) => {
      state.preloaderDocs = false;
      state.applicationList = action?.payload?.map((i) => {
        const { codeid, name, status } = i;
        return { codeid, name, status, arrDocs: [] };
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
      state.applicationList = state.applicationList?.map((item) => ({
        ...item,
        arrDocs: item.arrDocs?.filter(
          (doc) => doc?.codeid_file !== action.payload
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

    //////////////////////////////////////////// getIsk
    builder.addCase(getIsk.fulfilled, (state, action) => {
      state.preloaderDocs = false;
      const { files, codeid } = action.payload;
      if (codeid !== 0 && !!action.payload?.codeid) {
        ///// if данные с запроса есть, то только тогда надо подставить их, если их нет то ненадо подставлять
        state.dataIsk = action.payload;
      }
      const newArrIsk = { arrIsk: state.applicationList, reqData: files };
      state.applicationList = transformArrDocs(newArrIsk);
    });
    builder.addCase(getIsk.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderDocs = false;
    });
    builder.addCase(getIsk.pending, (state, action) => {
      state.preloaderDocs = true;
    });

    ////// editIsks
    builder.addCase(editIsks.fulfilled, (state, action) => {
      state.preloaderDocs = false;

      const { applicationList, data, navigate, id } = action?.payload;
      state.dataIsk = data;

      const newArrIsk = { arrIsk: applicationList, reqData: data?.files };
      state.applicationList = transformArrDocs(newArrIsk);

      if (navigate) {
        navigate(`/create_isk/${id}`);
      }
    });

    builder.addCase(editIsks.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderDocs = false;
    });
    builder.addCase(editIsks.pending, (state, action) => {
      state.preloaderDocs = true;
    });

    ////// delDataSidesFN
    builder.addCase(delDataSidesFN.fulfilled, (state, action) => {
      state.preloaderDocs = false;
      const obj = { dataIsk: state.dataIsk };
      state.dataIsk = delSidesIskFN({ ...obj, ...action.payload });
    });
    builder.addCase(delDataSidesFN.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderDocs = false;
    });
    builder.addCase(delDataSidesFN.pending, (state, action) => {
      state.preloaderDocs = true;
    });

    ////// editMainIskData
    builder.addCase(editMainIskData.fulfilled, (state, action) => {
      state.preloaderDocs = false;
    });
    builder.addCase(editMainIskData.rejected, (state, action) => {
      state.error = action.payload;
      state.preloaderDocs = false;
    });
    builder.addCase(editMainIskData.pending, (state, action) => {
      state.preloaderDocs = true;
    });
  },
  reducers: {
    addTodosPlaintiff: (state, action) => {
      //// добавляю истца в список (вызывать только после успешного запроса)
      state.dataIsk = {
        ...state.dataIsk,
        plaintiff: [...state.dataIsk.plaintiff, action.payload],
      };
    },

    addTodosPlaintiffResper: (state, action) => {
      //// добавляю представителя истца в список (вызывать только после успешного запроса)
      state.dataIsk = {
        ...state.dataIsk,
        plaintiffResper: [...state.dataIsk.plaintiffResper, action.payload],
      };
    },

    addTodosDefendant: (state, action) => {
      //// добавляю ответчика в список (вызывать только после успешного запроса)
      state.dataIsk = {
        ...state.dataIsk,
        defendant: [...state.dataIsk.defendant, action.payload],
      };
    },

    addTodosDefendantResper: (state, action) => {
      //// добавляю представителя ответчика в список (вызывать только после успешного запроса)
      state.dataIsk = {
        ...state.dataIsk,
        defendantResper: [...state.dataIsk.defendantResper, action.payload],
      };
    },

    setDataaIsk: (state, action) => {
      state.dataIsk = action.payload;
    },

    clearDataaIsk: (state, action) => {
      state.dataIsk = clearTodosApp;
    },

    changeApplicationList: (state, action) => {
      state.applicationList = action.payload;
    },

    clearFilesApplicationList: (state, action) => {
      state.applicationList = state.applicationList?.map((item) => ({
        ...item,
        arrDocs: [],
      }));
    },
  },
});

export const {
  addTodosPlaintiff,
  addTodosPlaintiffResper,
  addTodosDefendant,
  addTodosDefendantResper,
  setDataaIsk,
  clearDataaIsk,
  changeApplicationList,
  clearFilesApplicationList,
} = applicationsSlice.actions;

export default applicationsSlice.reducer;
