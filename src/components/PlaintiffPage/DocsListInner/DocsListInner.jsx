import React from "react";
import "./DocsListInner.scss";
import {
  changeADFF,
  changeADUF,
  changeTypeFace,
} from "../../../store/reducers/inputSlice";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { changeLookAddPlaintiff } from "../../../store/reducers/stateSlice";
import { searchNameSelect } from "../../../helpers/searchNameSelect";
import editImg from "../../../asstes/icons/editBtn.svg";
import deleteImg from "../../../asstes/icons/deleteBtn.svg";
/// delete
import { deleteEveryIsk } from "../../../store/reducers/applicationsSlice";

const DocsListInner = ({ arr, arr2, typerole }) => {
  const dispatch = useDispatch();
  const { tokenA, typeUser, checkEditPlaint } = useSelector(
    (state) => state.saveDataSlice
  );
  const { todosApplications } = useSelector((state) => state.applicationsSlice);
  const { selCountries } = useSelector((state) => state.selectsSlice);

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
      /// представитель истца
      sortSend(objData, 3);
    } else if (type === "represen" && typerole === "ответчика") {
      ///// представитель ответчика
      sortSend(objData, 4);
    }
  };

  // console.log(arr, "arr");
  const decodedToken = jwtDecode(tokenA);
  return (
    <div className="listDocs">
      <div>
        {arr?.map((i) => (
          <div key={i.codeid} className="everyCard">
            <div className="everyCard__mainData">
              <div className="everyCard__data">
                <h5>{i.name ? i.name : "не указано"}</h5>
                {i.typeFace === "" ? (
                  " не указано"
                ) : (
                  <p>
                    {i?.typeFace === 1
                      ? " Физическое лицо"
                      : " Юридическое лицо"}
                  </p>
                )}
                <p>
                  {i.country && i.city ? (
                    <>
                      {searchNameSelect(selCountries, +i.country)},{i.city}
                      {/* Кыргызстан, Бишкек */}
                    </>
                  ) : (
                    ": не указан"
                  )}
                </p>
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
      <div
        style={{
          width: "auto",
        }}
      >
        {arr2?.map((i) => (
          <div key={i.codeid} className="everyCard">
            <div className="everyCard__mainData">
              <div className="everyCard__data">
                <h5>{i.name ? i.name : "не указано"}</h5>
                {i.typeFace === "" ? (
                  " не указано"
                ) : (
                  <p>
                    {i?.typeFace === 1
                      ? " Физическое лицо"
                      : " Юридическое лицо"}
                  </p>
                )}
                <p>
                  {i.country && i.city ? (
                    <>
                      {i.country},{i.city}
                    </>
                  ) : (
                    ": не указан"
                  )}
                </p>
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
