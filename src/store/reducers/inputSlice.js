import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  input: "Nurdin Djumabekov",
  typeFace: 1,
  //// addPlaintiffFizFace
  adff: {
    codeid: 0,
    code_fiz_face: 2,
    fiz_face_type: 0, // 1-plaintiff, 2-defendant, 3 - plaintiff representative, 4 - defendant representative
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
    codeid: 0,
    code_fiz_face: 0,
    name: "",
    dataReg: "", // дата регистрации
    inn: "",
    okpo: "",
    email: "",
    email2: "",
    numPhone: "",
    typeOrganization: "",
    typeCompany: "",
    country: "",

    userStatus: "", //// должность в компании
    startData: "",
    endData: "",
    fioBoss: "",

    country: "",
    region: "", /// область
    district: "", //// район
    city: "",
    adddreselement: "", // адресный элемент
    street: "",
    numObj: "",
    index: "",
    apartament: "",
    emailIndex: "",
    description: "",

    type: true, //true - Руководитель компании, false - Адрес компании
    role: "",
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
        codeid: 0,
        code_fiz_face: 0,
        fiz_face_type: 0, // 1-plaintiff, 2-defendant, 3 - plaintiff representative, 4 - defendant representative
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
        codeid: 0,
        code_fiz_face: 0,
        name: "",
        dataReg: "",
        inn: "",
        okpo: "",
        email: "",
        email2: "",
        numPhone: "",
        typeOrganization: "",
        typeCompany: "",
        country: "",

        userStatus: "",
        startData: "",
        endData: "",
        fioBoss: "",

        country: "",
        region: "",
        district: "",
        city: "",
        adddreselement: "",
        street: "",
        numObj: "",
        index: "",
        apartament: "",
        emailIndex: "",
        description: "",

        type: true,
        role: "",
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
