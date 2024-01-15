import React from "react";
import "./DataArrPlaintiff.scss";
import { useDispatch, useSelector } from "react-redux";
import { changeLookAddPlaintiff } from "../../../store/reducers/stateSlice";
import FillingPlaintiff from "../FillingPlaintiff/FillingPlaintiff";
import DocsList from "../DocsList/DocsList";
import {
  changeADFF,
  changeADUF,
  changeTypeFace,
} from "../../../store/reducers/inputSlice";

const DataArrPlaintiff = ({ arr, typerole }) => {
  const dispatch = useDispatch();
  const { lookAddPlaintiff } = useSelector((state) => state.stateSlice);
  const { todosApplications } = useSelector((state) => state.applicationsSlice);
  const { adff, aduf } = useSelector((state) => state.inputSlice);
  // console.log(lookAddPlaintiff, "lookAddPlaintiff");
  // console.log(typerole, "typerole");

  const approvId = () => {
    dispatch(changeADFF({ ...adff, code_isk: todosApplications.codeid }));
    dispatch(changeADUF({ ...aduf, code_isk: todosApplications.codeid }));
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
      if (todosApplications?.plaintiff?.length === 0) {
        alert("Сначало заполните данные истца");
      } else {
        dispatch(changeLookAddPlaintiff(2));
        dispatch(changeTypeFace(1));
      }
    } else if (typerole === "ответчика") {
      approvId();
      /// нажатие на представителя ответчика
      if (todosApplications?.defendant?.length === 0) {
        alert("Сначало заполните данные ответчика");
      } else {
        dispatch(changeLookAddPlaintiff(2));
        dispatch(changeTypeFace(1));
      }
    }
  };

  return (
    <div>
      {lookAddPlaintiff == 0 && (
        <div className="mainTables dataPlaintiff">
          <ul className="btnsType add">
            <button onClick={clickPlaintiff}>Добавить {typerole}</button>
            <button onClick={clickRepresen}>
              Добавить представителя {typerole}
            </button>
          </ul>
          <DocsList typerole={typerole} />
        </div>
      )}
      {lookAddPlaintiff === 1 && <FillingPlaintiff typerole={typerole} />}
      {lookAddPlaintiff === 2 && <FillingPlaintiff typerole={typerole} />}
    </div>
  );
};

export default DataArrPlaintiff;
