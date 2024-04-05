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

const DataArrPlaintiff = ({ typerole }) => {
  const dispatch = useDispatch();
  const { lookAddPlaintiff } = useSelector((state) => state.stateSlice);
  const { todosApplications } = useSelector((state) => state.applicationsSlice);
  const { adff, aduf } = useSelector((state) => state.inputSlice);
  const { typeUser, checkEditPlaint } = useSelector(
    (state) => state.saveDataSlice
  );

  // console.log(lookAddPlaintiff, "lookAddPlaintiff");
  // console.log(typerole, "typerole");

  const approvId = () => {
    dispatch(changeADFF({ ...adff, code_isk: todosApplications?.codeid }));
    dispatch(changeADUF({ ...aduf, code_isk: todosApplications?.codeid }));
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

  const isCheckRole =
    checkEditPlaint === true && (+typeUser === 1 || +typeUser === 2);

  return (
    <>
      {lookAddPlaintiff == 0 && (
        <div
          className={`${"mainTables"} ${"dataPlaintiff"} ${
            isCheckRole && "dataPlaintiff_more"
          }`}
        >
          <ul className="btnsType add">
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
                  {typerole === "истца" ? "Данные истца" : "Данные ответчика"}
                </button>
                <button>
                  {typerole === "истца"
                    ? "Данные представителя истца"
                    : "Данные представителя ответчика"}
                </button>
              </>
            )}
          </ul>
          <DocsList typerole={typerole} />
        </div>
      )}
      {lookAddPlaintiff === 1 && <FillingPlaintiff typerole={typerole} />}
      {lookAddPlaintiff === 2 && <FillingPlaintiff typerole={typerole} />}
    </>
  );
};

export default DataArrPlaintiff;
