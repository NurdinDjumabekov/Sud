import { createSlice } from "@reduxjs/toolkit";
import { adffClear, adifClear, adufClear } from "../../helpers/clear";

const initialState = {
  typeFace: 1,

  adff: {
    action_type: 1,
    codeid: 0,
    code_isk: 0,
    name: "",
    sex: 1, // пол
    dob: "", /// data of birth
    inn: "",
    ///////////////////////////
    unknownDob: 0, // неизвестная дата рождения
    unknownInn: 0, // неизвестный ИНН
    unknownPassport: 0, // неизвестный паспорт
    unknownDataPassport: 0, // не учитывать срок действия паспорта
    ///////////////////////////
    passportSeries: "", // серия паспорта
    timePassportStart: "", // дата выдачи паспорта
    timePassportEnd: "", // дата истечения паспорта
    organizationPassport: "", // кем выдан
    numPhone: "",
    email: "",
    email2: "",
    country: 36, /// select
    region: 12, /// область /// select
    district: 48, //// район /// select
    adddreselement: 1, // адресный элемент /// select
    city: "",
    street: "",
    numObj: "",
    index: "",
    apartament: "",
    emailIndex: "",
    description: "",
    typeFace: 1,
  },

  aduf: {
    action_type: 1,
    code_isk: 0,
    codeid: 0,
    name: "",
    numPhone: "",
    inn: "",
    okpo: "",
    email: "",
    email2: "",
    typeOrganization: 1, /// select
    dataReg: "", // дата регистрации
    typeCompany: 1, /// select
    country_ur: 1, /// select

    userStatus: 1, //// должность в компании /// select
    startData: "",
    endData: "",
    fioBoss: "",

    country: 36, /// select
    region: 12, /// область /// select
    district: 48, //// район /// select
    adddreselement: 1, // адресный элемент   /// select
    city: "",
    street: "",
    numObj: "",
    index: "",
    apartament: "",
    emailIndex: "",
    description: "",
    ur_face_type: 1, // 1-plaintiff, 2-defendan
  },

  adif: {
    action_type: 1,
    code_isk: 0,

    codeid: 0,
    name: "",
    numPhone: "",
    inn: "",
    okpo: "",
    email: "",
    email2: "",

    startData: "",
    endData: "",

    country: 36, /// select
    region: 12, /// область /// select
    district: 48, //// район /// select
    adddreselement: 1, // адресный элемент   /// select
    city: "",
    street: "",
    numObj: "",
    index: "",
    apartament: "",
    emailIndex: "",
    description: "",
    ip_face_type: 1, // 1-plaintiff, 2-defendan
  },

  docsIsks: { files: [], code_isk: 0 },
  // files - { base64: "jkh", name: "sssdsshdfdfdfhh.docx", code_file: 3 },
};

const inputSlice = createSlice({
  name: "inputSlice",
  initialState,
  reducers: {
    ///// fiz face
    changeADFF: (state, action) => {
      state.adff = action.payload;
    },

    clearADFF: (state, action) => {
      state.adff = adffClear;
    },

    ///// ur face
    changeADUF: (state, action) => {
      state.aduf = action.payload;
    },

    clearADUF: (state, action) => {
      state.aduf = adufClear;
    },

    ///// ip face
    changeADIF: (state, action) => {
      state.adif = action.payload;
    },

    clearADIF: (state, action) => {
      state.adif = adifClear;
    },

    changeTypeFace: (state, action) => {
      state.typeFace = action.payload;
    },

    changeDocsIsks: (state, action) => {
      state.docsIsks = action.payload;
    },
  },
});

export const {
  changeADFF,
  clearADFF,
  changeADUF,
  clearADUF,
  changeADIF,
  clearADIF,
  changeRP,
  changeTypeFace,
  changeDocsIsks,
} = inputSlice.actions;

export default inputSlice.reducer;
