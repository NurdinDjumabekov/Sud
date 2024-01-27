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
  const [sendStatusIsk, setSendStatusIsk] = useState(false);
  const [istype, setIsType] = useState({ type: 0, id: 0 }); // 1- подтвердить, 2 - отклонить
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

  const changeStatusIsks = (id, status) => {
    setSendStatusIsk(true);
    setIsType({ type: status, id });
  };

  const decodedToken = jwtDecode(tokenA);
  // console.log(decodedToken?.type_user, "decodedToken");

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
      {+decodedToken?.type_user === 4 ? (
        <div className="actionBtn">
          <button onClick={saveData}>Сохранить</button>
          <button onClick={() => navigate(-1)}>Отменить</button>
        </div>
      ) : (
        <>
          <div className="actionBtn">
            {+decodedToken?.type_user === 2 && (
              <>
                <button
                  onClick={() => changeStatusIsks(todosApplications?.codeid, 1)}
                >
                  Принять иск
                </button>
                <button
                  onClick={() => changeStatusIsks(todosApplications?.codeid, 2)}
                >
                  Отказать в иске
                </button>
              </>
            )}
            {+decodedToken?.type_user === 3 && (
              <>
                <button
                  onClick={() => changeStatusIsks(todosApplications?.codeid, 3)}
                >
                  Принять иск
                </button>
                <button
                  onClick={() => changeStatusIsks(todosApplications?.codeid, 4)}
                >
                  Отказать в иске
                </button>
              </>
            )}
          </div>
          {/* ///// это для ответственного секретаря и председателя */}
          <ConfirmStatus
            setSendStatusIsk={setSendStatusIsk}
            sendStatusIsk={sendStatusIsk}
            setIsType={setIsType}
            istype={istype}
          />
        </>
      )}
    </>
  );
};

export default InputsPlaintiff;
