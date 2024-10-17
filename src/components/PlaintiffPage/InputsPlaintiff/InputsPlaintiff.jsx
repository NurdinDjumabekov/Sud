///// hooks
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

///// style
import "./style.scss";

////// components
import PdfFile from "../../PdfFile/PdfFile";

///// helpers
import { checkDataIsks } from "../../../helpers/checkDataIsks";

///// fns
import { sendEveryIsks } from "../../../store/reducers/sendDocsSlice";
import { clearDataaIsk } from "../../../store/reducers/applicationsSlice";
import { changeCalculatorState } from "../../../store/reducers/stateSlice";
import { changeCalculatorType } from "../../../store/reducers/stateSlice";
import { changeResult } from "../../../store/reducers/stateSlice";
import { changeSumIsk } from "../../../store/reducers/stateSlice";
import { clearMainBtnList } from "../../../store/reducers/stateSlice";
import { changeAlertText } from "../../../store/reducers/typesSlice";

const InputsPlaintiff = ({ btnList, activeComponent }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const editorRef = useRef(null);

  const { lookTypeRole } = useSelector((state) => state.stateSlice);
  const { dataIsk } = useSelector((state) => state.applicationsSlice);
  const { typeUser, checkEditPlaint } = useSelector(
    (state) => state.saveDataSlice
  );

  const saveData = () => {
    // if (dataIsk?.plaintiff?.length === 0) {
    //   return dispatch(changeAlertText("Добавьте истца!"));
    // }

    // if (dataIsk?.defendant?.length === 0) {
    //   return dispatch(changeAlertText("Добавьте ответчика!"));
    // }

    if (editorRef.current?.editor) {
      const content = editorRef.current.editor.getContent();
      const obj = { navigate, content, typeUser, dataIsk };

      dispatch(sendEveryIsks(obj));

      // Очистка всех временных state
      dispatch(clearDataaIsk());
      dispatch(clearMainBtnList());
      clearDataCalculator();
    }
  };

  const clearDataCalculator = () => {
    dispatch(changeCalculatorType(false)); /// строс отображение калькулятора
    dispatch(changeSumIsk("")); /// сброс суммы калькулятора
    dispatch(changeCalculatorState(false)); // отображение таблицы
    dispatch(changeResult({ num1: 0, num2: 0, num3: 0, num4: 0 }));
    /// строс подсчёт калькулятора
  };

  const navMain = () => navigate("/main");

  const nonePdf = lookTypeRole === 0 ? "" : "nonePdf";

  return (
    <>
      <div className="plaintiffData">
        <div className="plantiffBlockMain">
          <React.Fragment key={activeComponent - 1}>
            {btnList?.[activeComponent - 1]?.components}
          </React.Fragment>
          {/* /// if открыты инпуты с физ и юр лицами, то я временно скрываю pdf файл */}
          <PdfFile editorRef={editorRef} nonePdf={nonePdf} />
        </div>
      </div>
      {true ? ( //// check
        <div className={`actionBtn ${nonePdf}`}>
          <button onClick={saveData}>Сохранить</button>
          <button onClick={navMain} className="btnLink">
            Закрыть
          </button>
        </div>
      ) : (
        <div className="actionBtn">
          <button className="btnLink" onClick={navMain}>
            Закрыть
          </button>
        </div>
      )}
    </>
  );
};

export default InputsPlaintiff;
