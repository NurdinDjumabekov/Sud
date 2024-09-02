//////// hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";

////// style
import "./style.scss";

////// componnets
import AddDataRole from "../AddDataRole/AddDataRole";
import DocsList from "../DocsList/DocsList";

////// fns
import { setLookTypeRole } from "../../../store/reducers/stateSlice";
import { changeADFF, changeADIF } from "../../../store/reducers/inputSlice";
import { changeADUF } from "../../../store/reducers/inputSlice";
import { changeTypeFace } from "../../../store/reducers/inputSlice";

/////// helpers
import { getCountry } from "../../../helpers/getSelects";

const DataArrPlaintiff = ({ typeSide }) => {
  const objRole = { 1: "истца", 2: "ответчика" };
  //// typeSide - (1)сторона истца, (2) сторона ответчика

  const dispatch = useDispatch();

  const { lookTypeRole } = useSelector((state) => state.stateSlice);
  const { dataIsk } = useSelector((state) => state.applicationsSlice);
  const { adff, aduf, adif } = useSelector((state) => state.inputSlice);

  const approvId = () => {
    dispatch(changeADFF({ ...adff, code_isk: dataIsk?.codeid }));
    dispatch(changeADUF({ ...aduf, code_isk: dataIsk?.codeid }));
    dispatch(changeADIF({ ...adif, code_isk: dataIsk?.codeid }));
    //// подствляю codeid для юр и физ лиц и ип
    getCountry(dispatch);
    ///// для получения и отображения нужных мне значений городов, стран для седектов
  };

  const lookDataRole = (type) => {
    ///// при нажатии на истца
    dispatch(setLookTypeRole(type));
    /// убираю state для отображения добавленных истцов и ответчиков (представителей тоже) и отоюражаю из добавление
    dispatch(changeTypeFace(1)); /// type face (юр и физ лиц и ип)
    approvId();
  };

  if (lookTypeRole == 0) {
    //// if  0 то показывать краткую инфу об истцах и ответчиках
    return (
      <div className="mainTables dataPlaintiff">
        <ul className="btnsType add">
          <button onClick={() => lookDataRole(1)}>
            Добавить {objRole?.[typeSide]}
          </button>
          <button onClick={() => lookDataRole(2)}>
            Добавить представителя {objRole?.[typeSide]}
          </button>
        </ul>
        <DocsList typeSide={typeSide} />
      </div>
    );
  }

  return <AddDataRole typeSide={typeSide} />;
};

export default DataArrPlaintiff;
