import { clearADFF, clearADIF, clearADUF } from "../store/reducers/inputSlice";
import { setLookTypeRole } from "../store/reducers/stateSlice";

export const clearAllFace = (dispatch) => {
  ///// очищаю все state для всех лиц
  dispatch(setLookTypeRole(0));
  dispatch(clearADFF());
  dispatch(clearADIF());
  dispatch(clearADUF());
};

export const clearTodosApp = {
  codeid: 0,
  plaintiff: [], //1 plaintiff
  plaintiffResper: [], //2
  defendant: [], //3
  defendantResper: [], //4

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
  //////////////////
};

export const adffClear = {
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
};
export const adufClear = {
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
};
export const adifClear = {
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
};

