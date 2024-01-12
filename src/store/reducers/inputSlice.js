import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  input: "Nurdin Djumabekov",
  typeFace: 2,
  //// addPlaintiffFizFace
  adff: {
    name: "",
    sex: "", // пол
    dob: "", /// data of birth
    inn: "",
    ///////////////////////////
    unknownDob: false, // неизвестная дата рождения
    unknownInn: false, // неизвестный ИНН
    unknownPassport: false, // неизвестный паспорт
    unknownDataPassport: false, // не учитывать срок действия паспорта
    ///////////////////////////
    passportSeries: "", // серия паспорта
    timePassportStart: "", // дата выдачи паспорта
    timePassportEnd: "", // дата истечения паспорта
    organizationPassport: "", // кем выдан
    numPhone: "",
    email: "",
    email2: "",
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
    role: "",
  },

  //// addPlaintiffUrFace
  aduf: {
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
        name: "",
        sex: "",
        dob: "",
        inn: "",
        unknownDob: false,
        unknownInn: false,
        unknownPassport: false,
        unknownDataPassport: false,
        passportSeries: "",
        timePassportStart: "",
        timePassportEnd: "",
        organizationPassport: "",
        numPhone: "",
        email: "",
        email2: "",
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
        role: "",
      };
    },
    //// addPlaintiffUrFace
    changeADUF: (state, action) => {
      state.aduf = action.payload;
    },
    clearADUF: (state, action) => {
      state.aduf = {
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
