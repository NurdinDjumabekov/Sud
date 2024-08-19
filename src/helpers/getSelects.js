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
