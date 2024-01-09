import React from "react";
import "./DataArrPlaintiff.scss";
import { useDispatch, useSelector } from "react-redux";
import { changeLookAddPlaintiff } from "../../../store/reducers/stateSlice";
import FillingPlaintiff from "../FillingPlaintiff/FillingPlaintiff";
import DocsList from "../DocsList/DocsList";

const DataArrPlaintiff = ({ arr, typerole }) => {
  const dispatch = useDispatch();
  const { lookAddPlaintiff } = useSelector((state) => state.stateSlice);
  console.log(lookAddPlaintiff, "lookAddPlaintiff");

  return (
    <div>
      {lookAddPlaintiff == 0 && (
        <div className="mainTables dataPlaintiff">
          <ul className="btnsType add">
            <button onClick={() => dispatch(changeLookAddPlaintiff(1))}>
              Добавить {typerole}
            </button>
            <button onClick={() => dispatch(changeLookAddPlaintiff(2))}>
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
