import React, { useState } from "react";
import "./InputsPlaintiff.scss";
import PdfFile from "../../PdfFile/PdfFile";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkDataIsks } from "../../../helpers/checkDataIsks";
import {
  sendDocsEveryIsks,
  sendEveryIsks,
} from "../../../store/reducers/sendDocsSlice";
import { clearTodosApplications } from "../../../store/reducers/applicationsSlice";
import {
  changeLookAddPlaintiff,
  clearMainBtnList,
} from "../../../store/reducers/stateSlice";
import { changeAlertText } from "../../../store/reducers/typesSlice";
import { useRef } from "react";

const InputsPlaintiff = ({ btnList, indexComp }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const { lookAddPlaintiff } = useSelector((state) => state.stateSlice);
  const { todosApplications } = useSelector((state) => state.applicationsSlice);
  const { adff, aduf, docsIsks } = useSelector((state) => state.inputSlice);
  const { tokenA } = useSelector((state) => state.saveDataSlice);

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
          console.log(editorRef);
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

  return (
    <>
      <div className="plaintiffData">
        <div className="plantiffBlockMain">
          <React.Fragment key={indexComp}>
            {btnList?.[indexComp]?.components}
          </React.Fragment>
          {lookAddPlaintiff === 0 && (
            <PdfFile
              // typerole={indexComp === 0 ? "Истец" : "Ответчик"}
              editorRef={editorRef}
            />
          )}
        </div>
      </div>
      <div className="actionBtn">
        <button onClick={saveData}>Сохранить</button>
        <button onClick={() => navigate(-1)}>Отменить</button>
      </div>
    </>
  );
};

export default InputsPlaintiff;
