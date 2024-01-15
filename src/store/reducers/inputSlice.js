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
    country: 1,
    region: 1, /// область
    district: 1, //// район
    city: "",
    adddreselement: 1, // адресный элемент
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
    typeOrganization: 1,
    dataReg: "", // дата регистрации
    typeCompany: 1,
    country_ur: 1,

    userStatus: 1, //// должность в компании
    startData: "",
    endData: "",
    fioBoss: "",

    country: 1,
    district: 1, //// район
    region: 1, /// область
    city: "",
    adddreselement: 1, // адресный элемент
    street: "",
    numObj: "",
    index: "",
    apartament: "",
    emailIndex: "",
    description: "",
    ur_face_type: 1, // 1-plaintiff, 2-defendan
    type: 1, //1 - Руководитель компании, 2 - Адрес компании
  },

  // цена иска /// можно удалить
  priceDocs: {},

  /// хренения докусентов
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
        code_fiz_face: 0,
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
        country: 1,
        region: 1, /// область
        district: 1, //// район
        city: "",
        adddreselement: 1, // адресный элемент
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
        typeOrganization: "",
        dataReg: "", // дата регистрации
        typeCompany: "",
        country_ur: "",

        userStatus: "", //// должность в компании
        startData: "",
        endData: "",
        fioBoss: "",

        country: "",
        district: "", //// район
        region: "", /// область
        city: "",
        adddreselement: "", // адресный элемент
        street: "",
        numObj: "",
        index: "",
        apartament: "",
        emailIndex: "",
        description: "",
        ur_face_type: 1, // 1-plaintiff, 2-defendan
        type: 1, //1 - Руководитель компании, 2 - Адрес компании
      };
    },
    ////////////////////////
    changeTypeFace: (state, action) => {
      state.typeFace = action.payload;
    },
    changePriceDocs: (state, action) => {
      state.priceDocs = action.payload;
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
  changePriceDocs,
} = inputSlice.actions;

export default inputSlice.reducer;
