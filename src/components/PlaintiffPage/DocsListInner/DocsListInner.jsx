//// hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";

//// style
import "./style.scss";

///// fns
import { changeADFF } from "../../../store/reducers/inputSlice";
import { changeADIF } from "../../../store/reducers/inputSlice";
import { changeADUF } from "../../../store/reducers/inputSlice";
import { changeTypeFace } from "../../../store/reducers/inputSlice";
import { setLookTypeRole } from "../../../store/reducers/stateSlice";

//// igms
import editImg from "../../../asstes/icons/editBtn.svg";
import deleteImg from "../../../asstes/icons/deleteBtn.svg";

///// helpers
import { getCountry } from "../../../helpers/getSelects";
import { objFace, objSidesAndRoles } from "../../../helpers/localData";

import { delDataSidesFN } from "../../../store/reducers/applicationsSlice";
/// check

const DocsListInner = ({ firstList, secondList, typeSide }) => {
  const dispatch = useDispatch();

  const { checkEditPlaint } = useSelector((state) => state.saveDataSlice);

  const changeDataSides = (objData, type) => {
    //// меняю данные всех ролей (это для редактированиЯ)
    //// type - 1 только соновные лица, 2 - представители

    dispatch(setLookTypeRole(type));
    dispatch(changeTypeFace(objData?.typeFace));

    if (objData?.typeFace === 1) {
      /// подставляю данные только физ лица во временный state changeADUF
      dispatch(changeADFF({ ...objData, action_type: 2 })); /// action_type 2 - редактирование
    } else if (objData?.typeFace === 2) {
      /// подставляю данные только юр лица во временный state changeADUF
      dispatch(changeADUF({ ...objData, action_type: 2 }));
    } else {
      /// подставляю данные только юр лица во временный state changeADUF
      dispatch(changeADIF({ ...objData, action_type: 2 }));
    }

    getCountry(dispatch);
    ///// для получения и отображения нужных мне значений городов, стран для селектов
  };

  const delDataSides = (obj, type) => {
    //// удалить данные сторон (данные ответчика, истца и т.д.)
    const key = `${typeSide}_${type}`;
    const role = objSidesAndRoles?.[key]?.num; /// 1 из 4 ролей выбирается

    console.log(role, "role");
    dispatch(delDataSidesFN({ obj, role }));
    //// typeFace - check
  };

  return (
    <div className="listDocs">
      <div>
        {firstList?.map((i) => (
          <div key={i.codeid} className="everyCard">
            <div className="everyCard__mainData">
              <div className="everyCard__data">
                <h5>{i?.name ? i.name : "не указано"}</h5>
                <p>{objFace?.[i?.typeFace] || "не указано"}</p>
              </div>
            </div>
            <div className="everyCard__btns">
              {checkEditPlaint ? (
                <>
                  <button onClick={() => changeDataSides(i, 1)}>
                    <p>Редактировать</p>
                    <img src={editImg} alt="edit" className="imgMini" />
                  </button>
                  <button onClick={() => delDataSides(i, 1)}>
                    <p>Удалить</p>
                    <img src={deleteImg} alt="del" />
                  </button>
                </>
              ) : (
                <button onClick={() => changeDataSides(i, 1)}>
                  <p>Посмотреть</p>
                  <img src={editImg} alt="edit" className="imgMini" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div>
        {secondList?.map((i) => (
          <div key={i.codeid} className="everyCard">
            <div className="everyCard__mainData">
              <div className="everyCard__data">
                <h5>{i.name ? i.name : "не указано"}</h5>
                <p>{objFace?.[i?.typeFace] || "не указано"}</p>
              </div>
            </div>
            <div className="everyCard__btns">
              {checkEditPlaint ? (
                <>
                  <button onClick={() => changeDataSides(i, 2)}>
                    <p>Редактировать</p>
                    <img src={editImg} alt="edit" className="imgMini" />
                  </button>
                  <button onClick={() => delDataSides(i, 2)}>
                    <p>Удалить</p>
                    <img src={deleteImg} alt="del" />
                  </button>
                </>
              ) : (
                <button onClick={() => changeDataSides(i, 2)}>
                  <p>Посмотреть</p>
                  <img src={editImg} alt="edit" className="imgMini" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocsListInner;
