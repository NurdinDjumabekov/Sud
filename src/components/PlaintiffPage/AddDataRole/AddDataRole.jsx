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

const AddDataRole = ({ typeSide }) => {
  const dispatch = useDispatch();
  const { lookTypeRole } = useSelector((state) => state.stateSlice);
  const { typeFace } = useSelector((state) => state.inputSlice); /// (юр и физ лиц и ип)

  const changeFace = (num) => dispatch(changeTypeFace(num));
  /// 1 - физ лицо, 2 - юр лицо, 3 - ИП

  const component = {
    1: <MainFizFace typeSide={typeSide} />,
    2: <MainUrFace typeSide={typeSide} />,
    3: <MainIpFace typeSide={typeSide} />,
  };

  return (
    <div className="addPlaintiff">
      {lookTypeRole === 2 ? ( /// если это ответчик
        <div className="addPlaintiff__inner">
          <div className="btnsType">
            <button className="activeBtnsPlaintiff">Физическое лицо</button>
          </div>
          <MainFizFace typeSide={typeSide} />
        </div>
      ) : (
        <div className="addPlaintiff__inner">
          <div className="btnsType">
            {listFace?.map(({ id, name }) => (
              <button
                className={typeFace === id ? "activeBtnsPlaintiff" : ""}
                onClick={() => changeFace(id)}
                key={id}
              >
                {name}
              </button>
            ))}
          </div>
          {component?.[typeFace]}
        </div>
      )}
    </div>
  );
};

export default AddDataRole;
