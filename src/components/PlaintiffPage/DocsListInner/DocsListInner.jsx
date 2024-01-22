import React from "react";
import "./DocsListInner.scss";
import {
  changeADFF,
  changeADUF,
  changeTypeFace,
} from "../../../store/reducers/inputSlice";
import { useDispatch, useSelector } from "react-redux";
import { changeLookAddPlaintiff } from "../../../store/reducers/stateSlice";
import imgFizFace from "../../../asstes/icons/plaintiff/fiz_face.svg";
import imgUrFace from "../../../asstes/icons/plaintiff/ur_face.svg";
import editImg from "../../../asstes/icons/editBtn.svg";
import deleteImg from "../../../asstes/icons/deleteBtn.svg";
import { deleteEveryIsk } from "../../../store/reducers/applicationsSlice";

const DocsListInner = ({ arr, arr2, typerole }) => {
  const dispatch = useDispatch();
  const { tokenA } = useSelector((state) => state.saveDataSlice);
  const { todosApplications } = useSelector((state) => state.applicationsSlice);

  const changeAddPlaintiff = (objData, type) => {
    if (type === "plaint" && typerole === "истца") {
      dispatch(changeLookAddPlaintiff(1));
      dispatch(changeTypeFace(objData.typeFace));
    } else if (type === "represen" && typerole === "истца") {
      dispatch(changeLookAddPlaintiff(2));
    } else if (type === "plaint" && typerole === "ответчика") {
      dispatch(changeLookAddPlaintiff(1));
      dispatch(changeTypeFace(objData.typeFace));
    } else if (type === "represen" && typerole === "ответчика") {
      dispatch(changeLookAddPlaintiff(2));
    }
    dispatch(
      changeADUF({
        ...objData,
        action_type: 2,
      })
    );
    dispatch(
      changeADFF({
        ...objData,
        action_type: 2,
      })
    );
  };

  const sortSend = (objData, type) => {
    dispatch(
      deleteEveryIsk({
        objData,
        tokenA,
        role: type,
        todosApplications,
        typeFace: 1,
      })
    );
  };

  const deleteIsks = (objData, type) => {
    if (type === "plaint" && typerole === "истца") {
      /// истец
      sortSend(objData, 1);
    } else if (type === "plaint" && typerole === "ответчика") {
      //// ответчик
      sortSend(objData, 2);
    } else if (type === "represen" && typerole === "истца") {
      /// представитель истеца
      sortSend(objData, 3);
    } else if (type === "represen" && typerole === "ответчика") {
      ///// представитель ответчика
      sortSend(objData, 4);
    }
  };

  return (
    <div className="listDocs">
      {arr?.length === 0 && arr2?.length === 0 ? (
        <p className="emptyData" style={{ height: "70vh" }}>
          список исков пока что отсутствует...
        </p>
      ) : (
        <>
          <div>
            {arr?.map((i) => (
              <div key={i.codeid} className="everyCard">
                <div className="everyCard__imgs">
                  {/* <div className="everyCard__date">
                    <h5>Февраль</h5>
                    <p>25</p>
                  </div> */}
                  {i?.typeFace === 1 ? (
                    <img src={imgFizFace} alt="faceImg" />
                  ) : (
                    <img src={imgUrFace} alt="faceImg" />
                  )}
                </div>
                <div className="everyCard__data">
                  <h5>ФИО: {i.name ? i.name : "не указано"}</h5>
                  {i.typeFace === "" ? (
                    " не указано"
                  ) : (
                    <p>
                      Лицо:
                      {i?.typeFace === 1 ? " физическое" : " юридическое"}
                    </p>
                  )}
                  <p>
                    Адрес
                    {i.country && i.city ? (
                      <>
                        : {i.country},{i.city}
                      </>
                    ) : (
                      ": не указан"
                    )}
                  </p>
                </div>
                <div className="everyCard__btns">
                  <button onClick={() => changeAddPlaintiff(i, "plaint")}>
                    <img src={editImg} alt="edit" />
                  </button>
                  <button onClick={() => deleteIsks(i, "plaint")}>
                    <img src={deleteImg} alt="delete" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div>
            {arr2?.map((i) => (
              <div key={i.codeid} className="everyCard">
                <div className="everyCard__imgs">
                  {/* <div className="everyCard__date">
                    <h5>Февраль</h5>
                    <p>25</p>
                  </div> */}
                  {i?.typeFace === 1 ? (
                    <img src={imgFizFace} alt="faceImg" />
                  ) : (
                    <img src={imgUrFace} alt="faceImg" />
                  )}
                </div>
                <div className="everyCard__data">
                  <h5>ФИО: {i.name ? i.name : "не указано"}</h5>
                  {i.typeFace === "" ? (
                    " не указано"
                  ) : (
                    <p>
                      Лицо:
                      {i?.typeFace === 1 ? " физическое" : " юридическое"}
                    </p>
                  )}
                  <p>
                    Адрес:
                    {i.country && i.city ? (
                      <>
                        {i.country},{i.city}
                      </>
                    ) : (
                      " не указан"
                    )}
                  </p>
                </div>
                <div className="everyCard__btns">
                  <button onClick={() => changeAddPlaintiff(i, "represen")}>
                    <img src={editImg} alt="" />
                  </button>
                  <button onClick={() => deleteIsks(i, "represen")}>
                    <img src={deleteImg} alt="" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DocsListInner;
