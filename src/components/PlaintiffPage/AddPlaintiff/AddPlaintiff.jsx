import React from "react";
import "./AddPlaintiff.scss";
import MainFizFace from "../SaveDataFizFace/MainFizFace/MainFizFace";
import MainUrFace from "../SaveDataUrFace/MainUrFace/MainUrFace";
import { useDispatch, useSelector } from "react-redux";
import { changeTypeFace } from "../../../store/reducers/inputSlice";

const AddPlaintiff = ({ typerole }) => {
  const dispatch = useDispatch();
  const { lookAddPlaintiff } = useSelector((state) => state.stateSlice);
  const { typeFace } = useSelector((state) => state.inputSlice);

  const changeFace = (num) => dispatch(changeTypeFace(num));
  /// 1 - физ лицо
  /// 2 - юр лицо

  const getButtonClass = (faceType) =>
    typeFace === faceType ? "activeBtnsPlaintiff" : "";

  return (
    <>
      {lookAddPlaintiff === 2 ? ( /// если это ответчик
        <div className="addPlaintiff">
          <div className="btnsType">
            <button className="activeBtnsPlaintiff">Физическое лицо</button>
          </div>
          <MainFizFace typerole={typerole} />
        </div>
      ) : (
        <div className="addPlaintiff">
          <div className="btnsType">
            <button className={getButtonClass(1)} onClick={() => changeFace(1)}>
              Физическое лицо
            </button>
            <button className={getButtonClass(2)} onClick={() => changeFace(2)}>
              Юридическое лицо
            </button>
          </div>
          {typeFace === 1 ? (
            <MainFizFace typerole={typerole} />
          ) : (
            <MainUrFace typerole={typerole} />
          )}
        </div>
      )}
    </>
  );
};

export default AddPlaintiff;
