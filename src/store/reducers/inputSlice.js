import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  input: 'Nurdin Djumabekov',
  //// addPlaintiffFizFace
  adff: {
    name: '',
    sex: '', // пол
    dob: '', /// data of birth
    inn: '',
    ///////////////////////////
    unknownDob:"", // неизвестная дата рождения
    unknownInn:"", // неизвестный ИНН
    unknownPassport:"", // неизвестный паспорт
    unknownDataPassport:"", // не учитывать срок действия паспорта
    ///////////////////////////
    passportSeries: '', // серия паспорта
    timePassportStart: '', // дата выдачи паспорта
    timePassportEnd: '', // дата истечения паспорта
    organizationPassport: '', // кем выдан
    numberPlaintiff: '',
    email: '',
    email2: '',
    country: '',
    region: '', /// область
    district: '', //// район
    city: '',
    adddreselement: '', // адресный элемент
    street: '',
    numObj: '',
    index: '',
    apartament: '',
    emailIndex: '',
    description: '',
  },

  //// addPlaintiffUrFace
  aduf: {
    name: '',
    dataReg: '', // дата регистрации
    inn: '',
    okpo: '',
    email: '',
    email2: '',
    numPhone: '',
    typeOrganization: '',
    typeCompany: '',
    country: '',

    userStatus: '', //// должность компании
    startData: '',
    endData: '',
    fioBoss: '',

    country: '',
    region: '', /// область
    district: '', //// район
    city: '',
    adddreselement: '', // адресный элемент
    street: '',
    numObj: '',
    index: '',
    apartament: '',
    emailIndex: '',
    description: '',
  },

  ////// representativePlaintiff
  rp: {
    name: '',
    sex: '', // пол
    dob: '', /// data of birth
    inn: '',
    passportSeries: '', // серия паспорта
    timePassportStart: '', // дата выдачи паспорта
    timePassportEnd: '', // дата истечения паспорта
    organizationPassport: '', // кем выдан
    numberPlaintiff: '',
    email: '',
    email2: '',
    country: '',
    region: '', /// область
    district: '', //// район
    city: '',
    adddreselement: '', // адресный элемент
    street: '',
    numObj: '',
    index: '',
    apartament: '',
    emailIndex: '',
    description: '',
  },
};

const inputSlice = createSlice({
  name: 'inputSlice',
  initialState,
  reducers: {
    changeInput: (state, action) => {
      state.input = action.payload;
    },
    //// addPlaintiffFizFace
    changeADFF: (state, action) => {
      state.adff = action.payload;
    },
    //// addPlaintiffUrFace
    changeADUF: (state, action) => {
      state.aduf = action.payload;
    },
    ////// representativePlaintiff
    changeRP: (state, action) => {
      state.rp = action.payload;
    },
  },
});
export const { changeInput, changeADFF, changeADUF, changeRP } =
  inputSlice.actions;

export default inputSlice.reducer;

