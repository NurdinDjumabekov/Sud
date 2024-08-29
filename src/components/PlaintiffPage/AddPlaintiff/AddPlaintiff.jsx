//////// hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";

/////// style
import "./style.scss";

//////// fns
import { changeTypeFace } from "../../../store/reducers/inputSlice";

//////// components
import MainFizFace from "../SaveDataFizFace/MainFizFace/MainFizFace";
import MainUrFace from "../SaveDataUrFace/MainUrFace/MainUrFace";
import MainIpFace from "../SaveDataIPFace/MainIpFace/MainIpFace";

//////// helpers
import { listFace } from "../../../helpers/dataArr";

const AddPlaintiff = ({ typerole }) => {
  const dispatch = useDispatch();
  const { lookAddPlaintiff } = useSelector((state) => state.stateSlice);
  const { typeFace } = useSelector((state) => state.inputSlice);

  const changeFace = (num) => dispatch(changeTypeFace(num));
  /// 1 - физ лицо, 2 - юр лицо, 3 - ИП

  const getButtonClass = (faceType) =>
    typeFace === faceType ? "activeBtnsPlaintiff" : "";

  const component = {
    1: <MainFizFace typerole={typerole} />,
    2: <MainUrFace typerole={typerole} />,
    3: <MainIpFace typerole={typerole} />,
  };

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
            {listFace?.map(({ id, name }) => (
              <button
                className={getButtonClass(id)}
                onClick={() => changeFace(id)}
              >
                {name}
              </button>
            ))}
          </div>
          {component?.[typeFace]}
        </div>
      )}
    </>
  );
};

export default AddPlaintiff;
