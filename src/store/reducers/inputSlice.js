import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  typeFace: 1,
  //// addPlaintiffFizFace
  // adff: {
  //   action_type: 1,
  //   codeid: 0,
  //   code_isk: 0,
  //   name: "",
  //   sex: 1, // пол
  //   dob: "", /// data of birth
  //   inn: "",
  //   ///////////////////////////
  //   unknownDob: 0, // неизвестная дата рождения
  //   unknownInn: 0, // неизвестный ИНН
  //   unknownPassport: 0, // неизвестный паспорт
  //   unknownDataPassport: 0, // не учитывать срок действия паспорта
  //   ///////////////////////////
  //   passportSeries: "", // серия паспорта
  //   timePassportStart: "", // дата выдачи паспорта
  //   timePassportEnd: "", // дата истечения паспорта
  //   organizationPassport: "", // кем выдан
  //   numPhone: "",
  //   email: "",
  //   email2: "",
  //   country: 0, /// select
  //   region: 0, /// область /// select
  //   district: 0, //// район /// select
  //   adddreselement: 0, // адресный элемент /// select
  //   city: "",
  //   street: "",
  //   numObj: "",
  //   index: "",
  //   apartament: "",
  //   emailIndex: "",
  //   description: "",
  //   typeFace : 1
  // },

  adff: {
    action_type: 1,
    codeid: 0,
    code_isk: 0,
    name: "Nurdin Djumabekov",
    sex: 1, // пол
    dob: "03/01/2024", /// data of birth
    inn: "1241231231212",
    ///////////////////////////
    unknownDob: 0, // неизвестная дата рождения
    unknownInn: 0, // неизвестный ИНН
    unknownPassport: 0, // неизвестный паспорт
    unknownDataPassport: 0, // не учитывать срок действия паспорта
    ///////////////////////////
    passportSeries: "asdsa", // серия паспорта
    timePassportStart: "03/01/2024", // дата выдачи паспорта
    timePassportEnd: "03/01/2024", // дата истечения паспорта
    organizationPassport: "dsadsa", // кем выдан
    numPhone: "asdas",
    email: "asdsa@sadasd",
    email2: "sadsad@asdasd",
    country: 31, /// select
    region: 1, /// область /// select
    district: 11, //// район /// select
    adddreselement: 1, // адресный элемент /// select
    city: "Бишкек",
    street: "Жайылма",
    numObj: "19",
    index: "dasdasd",
    apartament: "sadas",
    emailIndex: "adsa",
    description: "sadas",
    typeFace: 1,
  },

  //// addPlaintiffUrFace

  aduf: {
    action_type: 1,
    code_isk: 0,
    codeid: 0,
    name: "asdas",
    numPhone: "sadsad",
    inn: "231231",
    okpo: "asdasdsa",
    email: "sdasd@adasd",
    email2: "asdasds@dassadas",
    typeOrganization: 1, /// select
    dataReg: "03/01/2024", // дата регистрации
    typeCompany: 1, /// select
    country_ur: 1, /// select

    userStatus: 1, //// должность в компании /// select
    startData: "03/01/2024",
    endData: "03/01/2024",
    fioBoss: "asdasdsa",

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
        action_type: 1,
        codeid: 0,
        code_isk: 0,
        name: "Nurdin Djumabekov",
        sex: 1, // пол
        dob: "03/01/2024", /// data of birth
        inn: "1241231231212",
        ///////////////////////////
        unknownDob: 0, // неизвестная дата рождения
        unknownInn: 0, // неизвестный ИНН
        unknownPassport: 0, // неизвестный паспорт
        unknownDataPassport: 0, // не учитывать срок действия паспорта
        ///////////////////////////
        passportSeries: "asdsa", // серия паспорта
        timePassportStart: "03/01/2024", // дата выдачи паспорта
        timePassportEnd: "03/01/2024", // дата истечения паспорта
        organizationPassport: "dsadsa", // кем выдан
        numPhone: "asdas",
        email: "asdsa@sadasd",
        email2: "sadsad@asdasd",
        country: 31, /// select
        region: 9, /// область /// select
        district: 11, //// район /// select
        adddreselement: 1, // адресный элемент /// select
        city: "Бишкек",
        street: "Жайылма",
        numObj: "19",
        index: "dasdasd",
        apartament: "sadas",
        emailIndex: "adsa",
        description: "sadas",
        typeFace: 1,
      };
    },
    //// addPlaintiffUrFace
    changeADUF: (state, action) => {
      state.aduf = action.payload;
    },
    clearADUF: (state, action) => {
      state.aduf = {
        action_type: 1,
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
