import React, { useState } from "react";
import { useRef } from "react";
import "./InputsPlaintiff.scss";
import PdfFile from "../../PdfFile/PdfFile";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkDataIsks } from "../../../helpers/checkDataIsks";
import { sendEveryIsks } from "../../../store/reducers/sendDocsSlice";
import { clearTodosApplications } from "../../../store/reducers/applicationsSlice";
import { clearMainBtnList } from "../../../store/reducers/stateSlice";
import { changeAlertText } from "../../../store/reducers/typesSlice";
import { jwtDecode } from "jwt-decode";
import ConfirmStatus from "../../ConfirmStatus/ConfirmStatus";

const InputsPlaintiff = ({ btnList, indexComp }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const { lookAddPlaintiff } = useSelector((state) => state.stateSlice);
  const { todosApplications } = useSelector((state) => state.applicationsSlice);
  const { tokenA } = useSelector((state) => state.saveDataSlice);
  const { typeUser } = useSelector((state) => state.saveDataSlice);

  const saveData = () => {
    if (checkDataIsks(todosApplications)) {
      if (todosApplications.plaintiff?.length === 0) {
        dispatch(
          changeAlertText({
            text: "Добавьте истца!",
            backColor: "#f9fafd",
            state: true,
          })
        );
      } else {
        if (todosApplications.defendant?.length === 0) {
          dispatch(
            changeAlertText({
              text: "Добавьте ответчика!",
              backColor: "#f9fafd",
              state: true,
            })
          );
        } else {
          if (editorRef.current && editorRef.current.editor) {
            const content = editorRef.current.editor.getContent();
            dispatch(
              sendEveryIsks({ todosApplications, tokenA, navigate, content })
            );
            dispatch(clearTodosApplications());
            dispatch(clearMainBtnList()); /// очистка состояние типа исков
          }
        }
      }
    } else {
      dispatch(
        changeAlertText({
          text: "Нету заполненных полей!",
          backColor: "#f9fafd",
          state: true,
        })
      );
    }
  };

  const decodedToken = jwtDecode(tokenA);


  return (
    <>
      <div className="plaintiffData">
        <div className="plantiffBlockMain">
          <React.Fragment key={indexComp}>
            {btnList?.[indexComp]?.components}
          </React.Fragment>
          {lookAddPlaintiff === 0 && <PdfFile editorRef={editorRef} />}
        </div>
      </div>
      {+decodedToken?.type_user === 4 ? (
        <div className="actionBtn">
          <button onClick={saveData}>Сохранить</button>
          <button
            onClick={() => {
              if (+typeUser === 1) {
                navigate("/mainSimpSecr");
              } else if (+typeUser === 2) {
                navigate("/mainRespSec");
              } else if (+typeUser === 3) {
                navigate("/mainRespPred");
              } else if (+typeUser === 4) {
                navigate("/mainPlaintiff"); //// ???
              }
            }}
            style={{
              color: "#4d5969",
              background: "rgba(237, 242, 249, 0.404)",
            }}
          >
            Закрыть
          </button>
        </div>
      ) : (
        <>
          <div className="actionBtn">
            <button
              style={{
                color: "#4d5969",
                background: "rgba(237, 242, 249, 0.404)",
              }}
              onClick={() => navigate(-1)}
            >
              Закрыть
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default InputsPlaintiff;
