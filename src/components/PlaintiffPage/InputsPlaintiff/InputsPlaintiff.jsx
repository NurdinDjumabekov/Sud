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
import { followLink } from "../../../helpers/followLink";

const InputsPlaintiff = ({ btnList, indexComp }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const { lookAddPlaintiff } = useSelector((state) => state.stateSlice);
  const { todosApplications } = useSelector((state) => state.applicationsSlice);
  const { tokenA, typeUser, checkEditPlaint } = useSelector(
    (state) => state.saveDataSlice
  );

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
              sendEveryIsks({
                todosApplications,
                tokenA,
                navigate,
                content,
                typeUser,
              })
            );
            dispatch(clearTodosApplications());
            dispatch(clearMainBtnList()); /// очистка состояние типа исков
            clearDataCalculator();
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

  const clearDataCalculator = () => {
    dispatch(changeCalculatorType(false)); /// строс отображение калькулятора
    dispatch(changeSumIsk("")); /// строс суммы калькулятора
    dispatch(changeCalculatorState(false)); // отображение таблицы
    dispatch(
      /// строс подсчёт калькулятора
      changeResult({
        num1: 0,
        num2: 0,
        num3: 0,
        num4: 0,
      })
    );
  };

  useEffect(() => {
    if (+todosApplications?.codeid === 0 && checkEditPlaint === false) {
      /// 0 означает что у тебя пустое исковое заявление и ты не истец
      followLink(typeUser, navigate);
    }
  }, []);

  const isCheckRole =
    checkEditPlaint === false && (+typeUser === 1 || +typeUser === 2);

  return (
    <>
      <div className="plaintiffData">
        <div className="plantiffBlockMain">
          <React.Fragment key={indexComp}>
            {btnList?.[indexComp]?.components}
          </React.Fragment>
          {lookAddPlaintiff === 0 && !isCheckRole && (
            <PdfFile editorRef={editorRef} />
          )}
        </div>
      </div>
      {checkEditPlaint ? (
        <div className="actionBtn">
          <button onClick={saveData}>Сохранить</button>
          <button
            onClick={() => followLink(typeUser, navigate)}
            className="btnLink"
          >
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
