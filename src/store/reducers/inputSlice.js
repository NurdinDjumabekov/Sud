import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  input: "Nurdin Djumabekov",
  typeFace: 1,
  //// addPlaintiffFizFace
  adff: {
    action_type: 0,
    codeid: 0,
    code_fiz_face: 0, // для ответчиков, чтобы можно было их связать с теми, кого они представляют
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
    country: 0, /// select
    region: 0, /// область /// select
    district: 0, //// район /// select
    adddreselement: 0, // адресный элемент /// select
    city: "",
    street: "",
    numObj: "",
    index: "",
    apartament: "",
    emailIndex: "",
    description: "",
  },

  //// addPlaintiffUrFace
  aduf: {
    code_isk: 0,
    codeid: 0,
    name: "",
    numPhone: "",
    inn: "",
    okpo: "",
    email: "",
    email2: "",
    typeOrganization: 0, /// select
    dataReg: "", // дата регистрации
    typeCompany: 0, /// select
    country_ur: 0, /// select

    userStatus: 0, //// должность в компании /// select
    startData: "",
    endData: "",
    fioBoss: "",

    country: 0, /// select
    district: 0, //// район   /// select
    region: 0, /// область   /// select
    adddreselement: 0, // адресный элемент   /// select
    city: "",
    street: "",
    numObj: "",
    index: "",
    apartament: "",
    emailIndex: "",
    description: "",
    ur_face_type: 1, // 1-plaintiff, 2-defendan
    type: 1, //1 - Руководитель компании, 2 - Адрес компании
  },

  docsIsks: {
    files: [
      // { base64: "jkh", name: "sssdsshdfdfdfhh.docx", code_file: 3 },
    ],
    code_isk: 0,
  },
};

const inputSlice = createSlice({
  name: "inputSlice",
  initialState,
  reducers: {
    changeInput: (state, action) => {
      state.input = action.payload;
    },
    //// addPlaintiffFizFace
    changeADFF: (state, action) => {
      state.adff = action.payload;
    },
    clearADFF: (state, action) => {
      state.adff = {
        action_type: 0,
        codeid: 0,
        code_fiz_face: 0, // для ответчиков, чтобы можно было их связать с теми, кого они представляют
        code_isk: 0,
        name: "",
        sex: 1, 
        dob: "", 
        inn: "",
        ///////////////////////////
        unknownDob: 0,
        unknownInn: 0,
        unknownPassport: 0, 
        unknownDataPassport: 0, 
        ///////////////////////////
        passportSeries: "", 
        timePassportStart: "", 
        timePassportEnd: "",
        organizationPassport: "", 
        numPhone: "",
        email: "",
        email2: "",
        country: 0, 
        region: 0, 
        district: 0, 
        adddreselement: 0, 
        city: "",
        street: "",
        numObj: "",
        index: "",
        apartament: "",
        emailIndex: "",
        description: "",
      };
    },
    //// addPlaintiffUrFace
    changeADUF: (state, action) => {
      state.aduf = action.payload;
    },
    clearADUF: (state, action) => {
      state.aduf = {
        code_isk: 0,
        codeid: 0,
        name: "",
        numPhone: "",
        inn: "",
        okpo: "",
        email: "",
        email2: "",
        typeOrganization: 0,
        dataReg: "", 
        typeCompany: 0,
        country_ur: 0,

        userStatus: 0,
        startData: "",
        endData: "",
        fioBoss: "",

        country: 0,
        district: 0, 
        region: 0, 
        adddreselement: 0, 
        city: "",
        street: "",
        numObj: "",
        index: "",
        apartament: "",
        emailIndex: "",
        description: "",
        ur_face_type: 1, 
        type: 1,
      };
    },
    ////////////////////////
    changeTypeFace: (state, action) => {
      state.typeFace = action.payload;
    },
    changeDocsIsks: (state, action) => {
      state.docsIsks = action.payload;
    },
  },
});
export const {
  changeInput,
  changeADFF,
  clearADFF,
  changeADUF,
  clearADUF,
  changeRP,
  changeTypeFace,
  changeDocsIsks,
} = inputSlice.actions;

export default inputSlice.reducer;
