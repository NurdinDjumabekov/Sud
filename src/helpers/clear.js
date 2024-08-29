import { clearADFF, clearADIF, clearADUF } from "../store/reducers/inputSlice";
import { changeLookAddPlaintiff } from "../store/reducers/stateSlice";

export const clearAllFace = (dispatch) => {
  ///// очищаю все state для всех лиц
  dispatch(changeLookAddPlaintiff(0));
  dispatch(clearADFF());
  dispatch(clearADIF());
  dispatch(clearADUF());
};
