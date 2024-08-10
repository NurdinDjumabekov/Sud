import React, { useEffect } from "react";
import { useRef } from "react";
import "./InputsPlaintiff.scss";
import PdfFile from "../../PdfFile/PdfFile";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkDataIsks } from "../../../helpers/checkDataIsks";
import { sendEveryIsks } from "../../../store/reducers/sendDocsSlice";
import { clearTodosApplications } from "../../../store/reducers/applicationsSlice";
import {
  changeCalculatorState,
  changeCalculatorType,
  changeResult,
  changeSumIsk,
  clearMainBtnList,
} from "../../../store/reducers/stateSlice";
import { changeAlertText } from "../../../store/reducers/typesSlice";

const InputsPlaintiff = ({ btnList, activeComponent }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const editorRef = useRef(null);

  const { lookAddPlaintiff } = useSelector((state) => state.stateSlice);
  const { todosApplications } = useSelector((state) => state.applicationsSlice);
  const { typeUser, checkEditPlaint } = useSelector(
    (state) => state.saveDataSlice
  );

  const saveData = () => {
    if (!checkDataIsks(todosApplications)) {
      return dispatch(changeAlertText("Нету заполненных полей!"));
    }

    if (todosApplications.plaintiff?.length === 0) {
      return dispatch(changeAlertText("Добавьте истца!"));
    }

    if (todosApplications.defendant?.length === 0) {
      return dispatch(changeAlertText("Добавьте ответчика!"));
    }

    if (editorRef.current?.editor) {
      const content = editorRef.current.editor.getContent();
      const obj = { navigate, content, typeUser, todosApplications };

      dispatch(sendEveryIsks(obj));

      // Очистка всех временных state
      dispatch(clearTodosApplications());
      dispatch(clearMainBtnList());
      clearDataCalculator();
    }
  };

  const clearDataCalculator = () => {
    dispatch(changeCalculatorType(false)); /// строс отображение калькулятора
    dispatch(changeSumIsk("")); /// сброс суммы калькулятора
    dispatch(changeCalculatorState(false)); // отображение таблицы
    dispatch(
      /// строс подсчёт калькулятора
      changeResult({ num1: 0, num2: 0, num3: 0, num4: 0 })
    );
  };

  // useEffect(() => {
  //   if (+todosApplications?.codeid === 0 && checkEditPlaint === false) {
  //     /// 0 означает что у тебя пустое исковое заявление и ты не истец
  //     followLink(typeUser, navigate);
  //   }
  // }, []);

  const navMain = () => navigate("/main");

  return (
    <>
      <div className="plaintiffData">
        <div className="plantiffBlockMain">
          <React.Fragment key={activeComponent - 1}>
            {btnList?.[activeComponent - 1]?.components}
          </React.Fragment>
          {lookAddPlaintiff === 0 && (
            /// if открыты инпуты с физ и юр лицами, то я временно скрываю pdf файл
            <PdfFile editorRef={editorRef} />
          )}
        </div>
      </div>
      {checkEditPlaint ? (
        <div className="actionBtn">
          <button onClick={saveData}>Сохранить</button>
          <button onClick={navMain} className="btnLink">
            Закрыть
          </button>
        </div>
      ) : (
        <div className="actionBtn">
          <button className="btnLink" onClick={() => navigate(-1)}>
            Закрыть
          </button>
        </div>
      )}
    </>
  );
};

export default InputsPlaintiff;
