import {
  toTakeCountries,
  toTakeDistrict,
  toTakeRegions,
} from "../store/reducers/selectsSlice";

export const getCountry = (dispatch) => {
  dispatch(toTakeCountries());
  dispatch(toTakeRegions({}));
  dispatch(toTakeDistrict({}));
  ///// для получения и отображения нужных мне значений городов, стран для седектов
};

export const comparisonCheck = (key) => {
  //// сравнение для документов
  if (key == "" || key == "Не известно" || key == "Не выбрано") {
    return false;
  }
  return true;
};
