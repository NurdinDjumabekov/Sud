import React from "react";
import { useDispatch, useSelector } from "react-redux";

////// style
import "./style.scss";

////// componnets
import FillingPlaintiff from "../FillingPlaintiff/FillingPlaintiff";
import DocsList from "../DocsList/DocsList";

////// fns
import { changeLookAddPlaintiff } from "../../../store/reducers/stateSlice";
import { changeADFF, changeADIF } from "../../../store/reducers/inputSlice";
import { changeADUF } from "../../../store/reducers/inputSlice";
import { changeTypeFace } from "../../../store/reducers/inputSlice";
import { toTakeCountries } from "../../../store/reducers/selectsSlice";
import { toTakeDistrict } from "../../../store/reducers/selectsSlice";
import { toTakeRegions } from "../../../store/reducers/selectsSlice";

const DataArrPlaintiff = ({ typerole }) => {
  const dispatch = useDispatch();
  const { lookAddPlaintiff } = useSelector((state) => state.stateSlice);
  const { todosApplications } = useSelector((state) => state.applicationsSlice);
  const { adff, aduf, adif } = useSelector((state) => state.inputSlice);
  const { checkEditPlaint } = useSelector((state) => state.saveDataSlice);

  const approvId = () => {
    //// подствляю codeid для юр и физ лиц
    dispatch(changeADFF({ ...adff, code_isk: todosApplications?.codeid }));
    dispatch(changeADUF({ ...aduf, code_isk: todosApplications?.codeid }));
    dispatch(changeADIF({ ...adif, code_isk: todosApplications?.codeid }));
  };

  const clickPlaintiff = () => {
    dispatch(changeLookAddPlaintiff(1));
    dispatch(changeTypeFace(1));
    approvId();
  };

  const clickRepresen = () => {
    if (typerole === "истца") {
      approvId();
      /// нажатие на представителя истца
      dispatch(changeLookAddPlaintiff(2));
      dispatch(changeTypeFace(1));
    } else if (typerole === "ответчика") {
      approvId();
      /// нажатие на представителя ответчика
      dispatch(changeLookAddPlaintiff(2));
      dispatch(changeTypeFace(1));
    }
  };

  const getAllSelectAddres = () => {
    dispatch(toTakeCountries());
    dispatch(toTakeRegions({}));
    dispatch(toTakeDistrict({}));
    ///// для получения и отображения нужных мне значений городов, стран для седектов
  };

  return (
    <>
      {lookAddPlaintiff === 0 ? (
        <div className="mainTables dataPlaintiff">
          <ul className="btnsType add" onClick={getAllSelectAddres}>
            {checkEditPlaint ? (
              <>
                <button onClick={clickPlaintiff}>Добавить {typerole}</button>
                <button onClick={clickRepresen}>
                  Добавить представителя {typerole}
                </button>
              </>
            ) : (
              <>
                <button>
                  Данные {typerole === "истца" ? "истца" : "ответчика"}
                </button>
                <button>
                  Данные представителя{" "}
                  {typerole === "истца" ? "истца" : "ответчика"}
                </button>
              </>
            )}
          </ul>
          <DocsList typerole={typerole} />
        </div>
      ) : (
        <FillingPlaintiff typerole={typerole} />
      )}
    </>
  );
};

export default DataArrPlaintiff;
