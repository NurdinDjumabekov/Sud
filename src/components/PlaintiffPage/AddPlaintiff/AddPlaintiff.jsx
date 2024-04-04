import React from "react";
import "./AddPlaintiff.scss";
import FizFace from "../FizFace/FizFace";
import UrFace from "../UrFace/UrFace";
import { useDispatch, useSelector } from "react-redux";
import { changeTypeFace } from "../../../store/reducers/inputSlice";

const AddPlaintiff = ({ typerole }) => {
  const dispatch = useDispatch();
  const { lookAddPlaintiff } = useSelector((state) => state.stateSlice);
  const { typeFace } = useSelector((state) => state.inputSlice);
  const { tokenA, typeUser } = useSelector((state) => state.saveDataSlice);

  return (
    <>
      {lookAddPlaintiff === 2 ? ( /// если это ответчик
        <div className="addPlaintiff">
          <div className="btnsType">
            <button className="activeBtnsPlaintiff">Физическое лицо</button>
          </div>
          <FizFace typerole={typerole} />
        </div>
      ) : (
        <div className="addPlaintiff">
          <div className="btnsType">
            <button
              className={typeFace === 1 ? "activeBtnsPlaintiff" : ""}
              onClick={() => {
                dispatch(changeTypeFace(1)); // физ лицо
              }}
            >
              Физическое лицо
            </button>
            <button
              className={typeFace === 2 ? "activeBtnsPlaintiff" : ""}
              onClick={() => {
                dispatch(changeTypeFace(2)); // юр лицо
              }}
            >
              Юридическое лицо
            </button>
          </div>
          {typeFace === 1 ? (
            <FizFace typerole={typerole} />
          ) : (
            <UrFace typerole={typerole} />
          )}
        </div>
      )}
    </>
  );
};

export default AddPlaintiff;
