import React from "react";
import "./DocsListInner.scss";
import {
  changeADFF,
  changeADUF,
  changeTypeFace,
} from "../../../store/reducers/inputSlice";
import { useDispatch } from "react-redux";
import { changeLookAddPlaintiff } from "../../../store/reducers/stateSlice";

const DocsListInner = ({ arr, arr2, typerole }) => {
  const dispatch = useDispatch();
  // console.log(arr);
  // console.log(arr2);
  // console.log(typerole,"typerole");
  const changeAddPlaintiff = (objData, type) => {
    if (type === "plaint" && typerole === "истца") {
      // console.log(objData);
      dispatch(changeLookAddPlaintiff(1));
      dispatch(changeTypeFace(objData.typeFace));
    } else if (type === "represen" && typerole === "истца") {
      // console.log(objData, "nnn");
      dispatch(changeLookAddPlaintiff(2));
    } else if (type === "plaint" && typerole === "ответчика") {
      // console.log(objData, "6556+5 ответчика");
      dispatch(changeLookAddPlaintiff(1));
      dispatch(changeTypeFace(objData.typeFace));
    } else if (type === "represen" && typerole === "ответчика") {
      // console.log(objData, "nnn ответчика");
      dispatch(changeLookAddPlaintiff(2));
    }

    dispatch(changeADUF(objData));
    dispatch(changeADFF(objData));
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
              <div
                key={i.id}
                className="everyCard"
                onClick={() => changeAddPlaintiff(i, "plaint")}
              >
                <div>
                  <div className="everyCard__date">
                    <h5>Февраль</h5>
                    <p>25</p>
                  </div>
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
              </div>
            ))}
          </div>
          <div>
            {arr2?.map((i) => (
              <div
                key={i.id}
                className="everyCard"
                onClick={() => changeAddPlaintiff(i, "represen")}
              >
                <div>
                  <div className="everyCard__date">
                    <h5>Февраль</h5>
                    <p>25</p>
                  </div>
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
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DocsListInner;
