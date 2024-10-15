import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

/////// fns
import {
  changeADFF,
  changeADIF,
  changeADUF,
  changeDocsIsks,
} from "./inputSlice";
import { setDataaIsk } from "./applicationsSlice";
import { toTakeTypeTypeDocs } from "./applicationsSlice";
import { changeAlertText } from "./typesSlice";
import { clearMainBtnList, sortDataIsksCounts } from "./stateSlice";

/////// helpers
import { changeActionType } from "../../helpers/changeActionType";
import { transformCreateData } from "../../helpers/transformCreateData";
import { calculateDates } from "../../helpers/addDate";
import axiosInstance from "../../axiosInstance";

const { REACT_APP_API_URL } = process.env;

const initialState = { preloader: false, listTodos: [], listContentHtml: [] };

////-------------------////
/// changeStatusIsks - изменения статуса иска у истца (истец подаёт иск)
export const changeStatusIsks = createAsyncThunk(
  "changeStatusIsks",
  async function (codeid, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/isks/crud`;
    const data = { action_type: 4, codeid }; ///// action_type - 4 подтверждение иска
    try {
      const response = await axiosInstance.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        dispatch(toTakeIsksList(0)); //// get список исков (0 - все иски)
        dispatch(clearMainBtnList()); //// сброс сортировочных кнопок на галвной стр
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
  async function (codeid, { dispatch, rejectWithValue }) {
    const data = { action_type: 3, codeid }; //// action_type - 3 удаление
    const url = `${REACT_APP_API_URL}/isks/crud`;
    try {
      const response = await axiosInstance.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        dispatch(toTakeIsksList(0)); //// get список исков (0 - все иски)
        dispatch(clearMainBtnList()); //// сброс сортировочных кнопок на галвной стр
        return codeid;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//// потом надо доделать
///// getDataSort - для get статусов для сортировки
export const getDataSort = createAsyncThunk(
  "getDataSort",
  async function (props, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/isks/accesses_status_role`;
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

export const toTakeIsksList = createAsyncThunk(
  "toTakeIsksList",
  async function (id, { dispatch, rejectWithValue }) {
    //// get список исков сортируя по статусу (0 - весь список)
    const url = `${REACT_APP_API_URL}/isks/get?status=${id}`;
    try {
      const response = await axiosInstance(url);
      if (response.status >= 200 && response.status < 300) {
        dispatch(sortDataIsksCounts(response?.data));
        //// подставляю к сортировочным кнопкам кол-ва исков которые есть
        return response.data?.recordset;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//// для получения id иска
export const createIdIskFN = createAsyncThunk(
  "createIsk",
  async function (props, { dispatch, rejectWithValue }) {
    const { dataIsk, adff, aduf, adif, docsIsks } = props;
    const data = { action_type: 1 }; /// для создания иска

    const url = `${REACT_APP_API_URL}/isks/crud`;

    try {
      const response = await axiosInstance.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        const { codeid } = response?.data;

        const { formattedTwoWeeksLater, formattedOneMonthLater } =
          calculateDates(); /// для получения даты 2 - 4 недели

        const obj = {
          arbitr_pay_end_date: formattedTwoWeeksLater,
          arbitr_doplata_end_date: formattedOneMonthLater,
          codeid,
        };
        dispatch(setDataaIsk({ ...dataIsk, ...obj }));
        ////// подставляю id для главного объекта где все данные иска и дату сроков уплаты

        dispatch(changeADFF({ ...adff, code_isk: codeid }));
        ////// подставляю id для объекта физ лиц

        dispatch(changeADUF({ ...aduf, code_isk: codeid }));
        ////// подставляю id для объекта юр лиц

        dispatch(changeADIF({ ...adif, code_isk: codeid }));
        ////// подставляю id для объекта юр лиц

        dispatch(changeDocsIsks({ ...docsIsks, code_isk: codeid }));
        ////// подставляю id для объекта документов
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
  async function (props, { dispatch, rejectWithValue }) {
    const { dataIsk, content } = props;
    const { navigate, typeUser } = props;
    const { codeid } = dataIsk;

    const newData = { ...dataIsk };
    delete newData["files"];

    const data = { ...newData, action_type: 2 }; /// для редактировования созданного иска
    const url = `${REACT_APP_API_URL}/isks/crud`;

    try {
      const response = await axiosInstance.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        dispatch(changeAlertText("Черновик сохранен!"));
        dispatch(toTakeTypeTypeDocs()); /// для очистки (сброса) типа файлов

        const obj = { content, id: codeid, code_file: 15, navigate };
        dispatch(sendDocsEveryIsks({ ...obj, reRender: true }));
        /// для создания документа иска ( 15 - для создания иска)
        return { navigate, typeUser };
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// sendDocsEveryIsks - отправка документа в виде HTML для создания
export const sendDocsEveryIsks = createAsyncThunk(
  "sendDocsEveryIsks",
  async function (props, { dispatch, rejectWithValue }) {
    const { content, code_file, id, navigate, reRender } = props;

    const data = { content, code_file, code_isk: id };
    const url = `${REACT_APP_API_URL}/isks/crud/genereate-pdf`;
    try {
      const response = await axiosInstance.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        navigate("/main");
        if (reRender) {
          dispatch(toTakeIsksList(0));
        }
        //// get список исков (0 - все иски)
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// create_edit_sides - create and edit истцов и ответчиков(представителей)
export const create_edit_sides = createAsyncThunk(
  "create_edit_sides",
  async function (props, { dispatch, rejectWithValue }) {
    const { dataIsk, role, adff, aduf, typeFace, adif } = props;

    const objFace = { 1: adff, 2: aduf, 3: adif };
    const faceData = objFace?.[typeFace];
    const obj = transformCreateData(props, role, faceData);

    const data = { action_type: 2, ...obj };
    const url = `${REACT_APP_API_URL}/isks/crud`;

    try {
      const response = await axiosInstance.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        const newdata = changeActionType(response?.data, obj?.codeid);
        dispatch(setDataaIsk({ ...dataIsk, ...newdata }));
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// changeStatusIsks - изменения статуса иска организацией
/// 1 принят секратарем, 2 отклонен секретарем, 3 Принятые председателем,
/// 4 Отклонённые председателем, 5 ответчик уведомлен, 6 - на доработку
export const changeStatusDocs = createAsyncThunk(
  "changeStatusDocs",
  async function (info, { dispatch, rejectWithValue }) {
    const { id, isk_status, content, navigate, code_file } = info;
    const data = { description: "", code_isk: id, isk_status };
    const url = `${REACT_APP_API_URL}/isks/set_isk_status`;
    try {
      const response = await axiosInstance.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        const obj = { id, content, code_file, navigate, reRender: true };
        dispatch(sendDocsEveryIsks(obj));
        /// для создания документа иска

        if (isk_status == 5) {
          /// для создания и отправки документа "уведомления ответчика"
          setTimeout(() => {
            dispatch(sendNotif(id)); /// отправка уведомления
          }, 1000);
        }
        return response.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// sendNotif - для отправки смс уведомления через почту
export const sendNotif = createAsyncThunk(
  "sendNotif",
  async function (id, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/isks/send_sms?id=${id}`;
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

////-------------------////

/// choiceSecr - выбор секретаря дела председателем
export const choiceSecr = createAsyncThunk(
  "choiceSecr",
  async function (props, { dispatch, rejectWithValue }) {
    const { typeSecretarDela, code_isk } = props;

    const url = `${REACT_APP_API_URL}/isks/set_isk_secretar`;
    const data = { code_isk, code_secretar: typeSecretarDela };

    try {
      const response = await axiosInstance.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        dispatch(toTakeIsksList(0));
        dispatch(clearMainBtnList());
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// choiceArbitrsFN - выбор арбитров председателем
export const choiceArbitrsFN = createAsyncThunk(
  "choiceArbitrsFN",
  async function (props, { dispatch, rejectWithValue }) {
    const { arbitrPred, code_isk } = props;

    const url = "http://mttp-renaissance.333.kg/api/isks/set_isk_arbitrs";
    const data = { code_isk, code_arbitr: arbitrPred };

    try {
      const response = await axiosInstance.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        dispatch(toTakeIsksList(0));
        dispatch(clearMainBtnList());
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// createFileAccept - создание документа для принятие иска для председателя от отв. секретаря и секретаря дела
export const createFileAccept = createAsyncThunk(
  "createFileAccept",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/isks/create_accept_file`;
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

/// getDataHtmlContent - get данные секретарей, котоыре заполняли html документ для прняти иска председателю
export const getDataHtmlContent = createAsyncThunk(
  "getDataHtmlContent",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/isks/get_content`;
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

const sendDocsSlice = createSlice({
  name: "sendDocsSlice",
  initialState,
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

    ///// createIdIskFN
    builder.addCase(createIdIskFN.fulfilled, (state, action) => {
      state.preloader = false;
    });
    builder.addCase(createIdIskFN.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(createIdIskFN.pending, (state, action) => {
      state.preloader = true;
    });

    ////// sendEveryIsks
    builder.addCase(sendEveryIsks.fulfilled, (state, action) => {
      state.preloader = false;
      action?.payload?.navigate("/main");
    });
    builder.addCase(sendEveryIsks.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(sendEveryIsks.pending, (state, action) => {
      state.preloader = true;
    });

    ////// create_edit_sides
    builder.addCase(create_edit_sides.fulfilled, (state, action) => {
      state.preloader = false;
    });
    builder.addCase(create_edit_sides.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(create_edit_sides.pending, (state, action) => {
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

    ////// changeStatusDocs
    builder.addCase(changeStatusDocs.fulfilled, (state, action) => {
      state.preloader = false;
    });
    builder.addCase(changeStatusDocs.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(changeStatusDocs.pending, (state, action) => {
      state.preloader = true;
    });

    /////// createFileAccept
    builder.addCase(createFileAccept.fulfilled, (state, action) => {
      state.preloader = false;
    });
    builder.addCase(createFileAccept.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(createFileAccept.pending, (state, action) => {
      state.preloader = true;
    });

    /////// getDataHtmlContent
    builder.addCase(getDataHtmlContent.fulfilled, (state, action) => {
      state.preloader = false;
      state.listContentHtml = action.payload;
    });
    builder.addCase(getDataHtmlContent.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getDataHtmlContent.pending, (state, action) => {
      state.preloader = true;
    });
  },
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
});
export const { changePreloader, changeListTodos, addListTodos } =
  sendDocsSlice.actions;

export default sendDocsSlice.reducer;
