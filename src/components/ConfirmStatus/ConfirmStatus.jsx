import React, { useRef, useState } from "react";
import Modals from "../Modals/Modals";
import "./ConfirmStatus.scss";
import imgWarning from "../../asstes/images/warning.png";
import { changeStatusOrg } from "../../store/reducers/sendDocsSlice";
import { useDispatch, useSelector } from "react-redux";
import PdfFileReject from "../PdfFile/PdfFileReject/PdfFileReject";
import PdfFulfilled from "../PdfFile/PdfFulfilled/PdfFulfilled";
import { useNavigate } from "react-router-dom";
import PdfFile from "../PdfFile/PdfFile";
import { clearMainBtnList } from "../../store/reducers/stateSlice";
import Selects from "../Selects/Selects";
import { typeSecretar } from "../../helpers/dataArr";
import { changeAlertText } from "../../store/reducers/typesSlice";

const ConfirmStatus = ({
  setSendStatusIsk,
  sendStatusIsk,
  setIsType,
  istype,
}) => {
  const { tokenA } = useSelector((state) => state.saveDataSlice);
  const { typeSecretarDela } = useSelector((state) => state.selectsSlice);
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const editorRefReject = useRef(null);
  const navigate = useNavigate();

  const rejectIsk = (e) => {
    e.preventDefault();
    if (editorRef.current && editorRef.current.editor) {
      const content = editorRef.current.editor.getContent();
      // console.log(content, "content");
      dispatch(
        changeStatusOrg({
          id: istype.id,
          tokenA,
          isk_status: istype.type,
          content,
          type: istype?.type === 2 ? 13 : istype?.type === 4 ? 14 : 0,
          navigate,
        })
      );
      setSendStatusIsk(false);
      dispatch(clearMainBtnList());
    }
  };

  const fulfilledIsk = (e) => {
    e.preventDefault();
    if (istype.type === 1) {
      dispatch(
        changeStatusOrg({
          id: istype.id,
          tokenA,
          isk_status: istype.type,
          content: "",
          type: 0, /// принятие иска (12 у председателя) 0 просто так для условия чтобы не сработало 12
          navigate,
        })
      );
      setSendStatusIsk(false);
    } else if (istype?.type === 3) {
      if (+typeSecretarDela === 0) {
        dispatch(
          changeAlertText({
            text: "Выберите секретаря!",
            backColor: "#f9fafd",
            state: true,
          })
        );
      } else {
        if (editorRef.current && editorRef.current.editor) {
          const content = editorRef.current.editor.getContent();
          dispatch(
            changeStatusOrg({
              id: istype.id,
              tokenA,
              isk_status: istype.type,
              content,
              type: 12, /// принятие иска как ответственный секретарь
              navigate,
            })
          );
          setSendStatusIsk(false);
          dispatch(clearMainBtnList());
        }
      }
    }
  };

  React.useEffect(() => {
    return () => {
      setIsType({ type: 0, id: 0 });
    };
  }, []);

  // console.log(typeSecretarDela, "typeSecretarDela");

  return (
    <div className="blockModal moreStylePdf">
      <Modals openModal={sendStatusIsk} setOpenModal={() => setSendStatusIsk()}>
        {istype.type === 1 && (
          <>
            <div className="modalchangeStatus">
              <div className="imgBlock">
                <img src={imgWarning} alt="send!" />
              </div>
              <h5>Принять иск?</h5>
              {/* <p>После подтверждения обратно иск поменять не получится...</p> */}
              <div className="btnsSendIsks">
                <button onClick={(e) => fulfilledIsk(e)}>Принять</button>
                <button
                  onClick={() => {
                    setIsType({ ...istype, type: 2 });
                    // setSendStatusIsk(false);
                  }}
                >
                  Отмена
                </button>
              </div>
            </div>
          </>
        )}
        {istype.type === 2 && (
          <>
            <div className="blockModal__inner">
              <PdfFile editorRef={editorRefReject} />
              <div className="plaintiFilling__container moreStyle">
                <PdfFileReject istype={istype} editorRef={editorRef} />
              </div>
            </div>
            <div className="modalchangeStatus" style={{ height: "auto" }}>
              <div className="btnsSendIsks">
                <button onClick={(e) => setIsType({ ...istype, type: 1 })}>
                  Принять
                </button>
                <button onClick={(e) => rejectIsk(e)} className="rejectBtn">
                  Отклонить
                </button>
              </div>
            </div>
          </>
        )}
        {istype.type === 3 && (
          <>
            <div className="choiceSecretard">
              <Selects
                arr={typeSecretar}
                initText={"Выберите секретаря дела"}
                keys={{ typeKey: typeSecretarDela, type: "typeSecretarDela" }}
                type="secr"
                urgently={false}
              />
            </div>
            <div className="blockModal__inner">
              <PdfFile editorRef={editorRefReject} />
              <div className="plaintiFilling__container moreStyle">
                <PdfFulfilled istype={istype} editorRef={editorRef} />
              </div>
            </div>
            <div className="modalchangeStatus" style={{ height: "auto" }}>
              <div className="btnsSendIsks">
                <button onClick={(e) => fulfilledIsk(e)}>Принять</button>
                <button
                  onClick={(e) => setIsType({ ...istype, type: 4 })}
                  className="rejectBtn"
                >
                  Отклонить
                </button>
              </div>
            </div>
          </>
        )}
        {istype.type === 4 && (
          <>
            <div className="blockModal__inner">
              <PdfFile editorRef={editorRefReject} />
              <div className="plaintiFilling__container moreStyle">
                <PdfFileReject istype={istype} editorRef={editorRef} />
              </div>
            </div>
            <div className="modalchangeStatus" style={{ height: "auto" }}>
              <div className="btnsSendIsks">
                <button
                  onClick={(e) => {
                    setIsType({ ...istype, type: 3 });
                  }}
                >
                  Принять
                </button>
                <button onClick={(e) => rejectIsk(e)} className="rejectBtn">
                  Отклонить
                </button>
              </div>
            </div>
          </>
        )}
      </Modals>
    </div>
  );
};

export default ConfirmStatus;
