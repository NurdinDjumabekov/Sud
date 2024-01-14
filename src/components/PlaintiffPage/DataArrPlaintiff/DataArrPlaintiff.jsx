import React from "react";
import "./DataArrPlaintiff.scss";
import { useDispatch, useSelector } from "react-redux";
import { changeLookAddPlaintiff } from "../../../store/reducers/stateSlice";
import FillingPlaintiff from "../FillingPlaintiff/FillingPlaintiff";
import DocsList from "../DocsList/DocsList";
import {
  changeADFF,
  changeTypeFace,
  clearADFF,
} from "../../../store/reducers/inputSlice";

const DataArrPlaintiff = ({ arr, typerole }) => {
  const dispatch = useDispatch();
  const { lookAddPlaintiff } = useSelector((state) => state.stateSlice);
  const { adff, aduf } = useSelector((state) => state.inputSlice);
  // console.log(lookAddPlaintiff, "lookAddPlaintiff");
  // console.log(typerole, "typerole");
  return (
    <div>
      {lookAddPlaintiff == 0 && (
        <div className="mainTables dataPlaintiff">
          <ul className="btnsType add">
            <button
              onClick={() => {
                dispatch(changeLookAddPlaintiff(1));
                dispatch(changeTypeFace(1));
                if (typerole === "истца") {
                  dispatch(changeADFF({ ...adff, fiz_face_type: 1 }));
                } else if (typerole === "ответчика") {
                  dispatch(changeADFF({ ...adff, fiz_face_type: 2 }));
                }
              }}
            >
              Добавить {typerole}
            </button>
            <button
              onClick={() => {
                dispatch(changeLookAddPlaintiff(2));
                dispatch(changeTypeFace(1));
                if (typerole === "истца") {
                  dispatch(changeADFF({ ...adff, fiz_face_type: 3 }));
                } else if (typerole === "ответчика") {
                  dispatch(changeADFF({ ...adff, fiz_face_type: 4 }));
                }
              }}
            >
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
