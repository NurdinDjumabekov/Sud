//// hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";

//// style
import "./style.scss";

///// fns
import { changeADFF, changeADUF } from "../../../store/reducers/inputSlice";
import { changeTypeFace } from "../../../store/reducers/inputSlice";
import { changeLookAddPlaintiff } from "../../../store/reducers/stateSlice";

//// igms
import editImg from "../../../asstes/icons/editBtn.svg";
import deleteImg from "../../../asstes/icons/deleteBtn.svg";

/// delete
import { deleteEveryIsk } from "../../../store/reducers/applicationsSlice";

const DocsListInner = ({ arr, arr2, typerole }) => {
  const dispatch = useDispatch();
  const { checkEditPlaint } = useSelector((state) => state.saveDataSlice);
  const { todosApplications } = useSelector((state) => state.applicationsSlice);

  const changeAddPlaintiff = (objData, type) => {
    if (type === "plaint" && typerole === "истца") {
      dispatch(changeLookAddPlaintiff(1));
      dispatch(changeTypeFace(objData?.typeFace));
    } else if (type === "represen" && typerole === "истца") {
      dispatch(changeLookAddPlaintiff(2));
    } else if (type === "plaint" && typerole === "ответчика") {
      dispatch(changeLookAddPlaintiff(1));
      dispatch(changeTypeFace(objData?.typeFace));
    } else if (type === "represen" && typerole === "ответчика") {
      dispatch(changeLookAddPlaintiff(2));
    }

    if (objData?.typeFace === 1) {
      /// подставляю данные только физ лица во временный state changeADUF
      dispatch(changeADFF({ ...objData, action_type: 2 }));
    } else if (objData?.typeFace === 2) {
      /// подставляю данные только юр лица во временный state changeADUF
      dispatch(changeADUF({ ...objData, action_type: 2 }));
    }
    /// action_type 2 - редактирование
  };

  const sortSend = (objData, type) => {
    const obj = { objData, role: type, todosApplications, typeFace: 1 };
    dispatch(deleteEveryIsk(obj));
  };

  const deleteIsks = (objData, type) => {
    if (type === "plaint" && typerole === "истца") {
      /// истец
      sortSend(objData, 1);
    } else if (type === "plaint" && typerole === "ответчика") {
      //// ответчик
      sortSend(objData, 2);
    } else if (type === "represen" && typerole === "истца") {
      /// представитель истца
      sortSend(objData, 3);
    } else if (type === "represen" && typerole === "ответчика") {
      ///// представитель ответчика
      sortSend(objData, 4);
    }
  };

  const objFace = {
    0: "не указано",
    1: "Физическое лицо",
    2: "Юридическое лицо",
  };

  return (
    <div className="listDocs">
      <div>
        {arr?.map((i) => (
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
                  <button onClick={() => changeAddPlaintiff(i, "plaint")}>
                    <p>Редактировать</p>
                    <img src={editImg} alt="edit" className="imgMini" />
                  </button>
                  <button onClick={() => deleteIsks(i, "plaint")}>
                    <p>Удалить</p>
                    <img src={deleteImg} alt="del" />
                  </button>
                </>
              ) : (
                <button onClick={() => changeAddPlaintiff(i, "plaint")}>
                  <p>Посмотреть</p>
                  <img src={editImg} alt="edit" className="imgMini" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div>
        {arr2?.map((i) => (
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
                  <button onClick={() => changeAddPlaintiff(i, "represen")}>
                    <p>Редактировать</p>
                    <img src={editImg} alt="edit" className="imgMini" />
                  </button>
                  <button onClick={() => deleteIsks(i, "represen")}>
                    <p>Удалить</p>
                    <img src={deleteImg} alt="del" />
                  </button>
                </>
              ) : (
                <button onClick={() => changeAddPlaintiff(i, "represen")}>
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
