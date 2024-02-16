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
import {
  changeActionFullfilled,
  changeActionReject,
  changeLookDocs,
  clearMainBtnList,
} from "../../store/reducers/stateSlice";
import Selects from "../Selects/Selects";
import { changeAlertText } from "../../store/reducers/typesSlice";
import {
  changeTypeSecretarDela,
  toTakeSecretarList,
} from "../../store/reducers/selectsSlice";
import { toTakeTypeTypeDocs } from "../../store/reducers/applicationsSlice";
import ApplicationFiles from "../PlaintiffPage/ApplicationFiles/ApplicationFiles";

const ConfirmStatus = ({
  setSendStatusIsk,
  sendStatusIsk,
  setIsType,
  istype,
}) => {
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const editorRefReject = useRef(null);
  const navigate = useNavigate();
  // const [lookDocs, setLookDocs] = useState(false);
  const { tokenA } = useSelector((state) => state.saveDataSlice);
  const { confirmActionFullfilled, confirmActionReject, lookDocs } =
    useSelector((state) => state.stateSlice);
  const { typeSecretarDela, selSecretarDela } = useSelector(
    (state) => state.selectsSlice
  );

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

    dispatch(changeActionFullfilled(false));
    dispatch(changeActionReject(false));
  };

  const closeAllModal = () => {
    dispatch(changeActionFullfilled(false));
    dispatch(changeActionReject(false));
    setSendStatusIsk(false);
  };

  const fulfilledIsk = (e) => {
    e.preventDefault();
    if (+istype.type === 1) {
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
        dispatch(clearMainBtnList());
        closeAllModal();
      }
      closeAllModal();
    } else if (+istype?.type === 3) {
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
            idSecr: typeSecretarDela,
          })
        );
        dispatch(clearMainBtnList());
        closeAllModal();
      }
    }
    dispatch(changeTypeSecretarDela(0)); /// обнуляю секретаря дела
  };

  const goodIsks = () => {
    if (+typeSecretarDela === 0) {
      dispatch(changeActionFullfilled(false));
      dispatch(
        changeAlertText({
          text: "Выберите секретаря!",
          backColor: "#f9fafd",
          state: true,
        })
      );
    } else {
      dispatch(changeActionFullfilled(true));
    }
  };

  const closeRSPdf = () => {
    setIsType({ ...istype, type: 0 });
    setSendStatusIsk(false);
    dispatch(changeActionReject(false));
  };

  React.useEffect(() => {
    dispatch(toTakeSecretarList(tokenA));
    return () => {
      setIsType({ type: 0, id: 0 });
    };
  }, []);

  React.useEffect(() => {
    if (!sendStatusIsk) {
      dispatch(toTakeTypeTypeDocs(tokenA));
    }
  }, [sendStatusIsk]);

  //// 1 - принять ответ. секр, 2 - отказ отв. секр, 3 - принят председ. 4 - отказ. председ. 5 - возражение
  return (
    <>
      <div className="blockModal moreStylePdf">
        <Modals
          openModal={sendStatusIsk}
          setOpenModal={() => setSendStatusIsk()}
        >
          {istype.type === 1 && (
            <>
              <div className="choiceSecretard">
                {lookDocs ? (
                  <button onClick={() => dispatch(changeLookDocs(false))}>
                    Исковое заявление
                  </button>
                ) : (
                  <button onClick={() => dispatch(changeLookDocs(true))}>
                    Документы
                  </button>
                )}
              </div>
              <div className="blockModal__inner">
                {lookDocs ? (
                  <div className="lookDocsIsksPred">
                    <ApplicationFiles />
                  </div>
                ) : (
                  <PdfFile editorRef={editorRefReject} />
                )}
                <div className="plaintiFilling__container moreStyle">
                  <PdfFulfilled istype={istype} editorRef={editorRef} />
                </div>
              </div>
              <div className="modalchangeStatus" style={{ height: "auto" }}>
                <div className="btnsSendIsks">
                  <button
                    onClick={(e) => dispatch(changeActionFullfilled(true))}
                  >
                    Принять
                  </button>
                  <button onClick={closeRSPdf}>Отмена</button>
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
                  <button
                    onClick={(e) => dispatch(changeActionReject(true))}
                    className="rejectBtn"
                  >
                    Отклонить
                  </button>
                  <button
                    onClick={(e) => {
                      setIsType({ ...istype, type: 0 });
                      setSendStatusIsk(false);
                      dispatch(changeActionReject(false));
                    }}
                  >
                    Отмена
                  </button>
                </div>
              </div>
            </>
          )}
          {istype.type === 3 && (
            <>
              <div className="choiceSecretard">
                <Selects
                  arr={selSecretarDela}
                  initText={"Выберите секретаря дела"}
                  keys={{ typeKey: typeSecretarDela, type: "typeSecretarDela" }}
                  type="secr"
                  urgently={false}
                />
                {lookDocs ? (
                  <button onClick={() => dispatch(changeLookDocs(false))}>
                    Исковое заявление
                  </button>
                ) : (
                  <button onClick={() => dispatch(changeLookDocs(true))}>
                    Документы
                  </button>
                )}
              </div>
              <div className="blockModal__inner">
                {lookDocs ? (
                  <div className="lookDocsIsksPred">
                    <ApplicationFiles />
                  </div>
                ) : (
                  <PdfFile editorRef={editorRefReject} />
                )}
                <div className="plaintiFilling__container moreStyle">
                  <PdfFulfilled istype={istype} editorRef={editorRef} />
                </div>
              </div>
              <div className="modalchangeStatus" style={{ height: "auto" }}>
                <div className="btnsSendIsks">
                  <button onClick={() => goodIsks()}>Принять</button>
                  <button onClick={() => setSendStatusIsk(false)}>
                    Отмена
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
                    onClick={(e) => dispatch(changeActionReject(true))}
                    className="rejectBtn"
                  >
                    Отклонить
                  </button>
                  <button onClick={() => setSendStatusIsk(false)}>
                    Отмена
                  </button>
                </div>
              </div>
            </>
          )}
        </Modals>
      </div>
      <div className="blockModal moreStylePdf noneKrestic">
        {/* ////////// только для подтверждения иска  */}
        <Modals
          openModal={confirmActionFullfilled}
          setOpenModal={() => dispatch(changeActionFullfilled())}
        >
          {+istype.type === 1 && (
            <div className="modalchangeStatus">
              <div className="imgBlock">
                <img src={imgWarning} alt="send!" />
              </div>
              <h5>Принять иск?</h5>
              <div className="btnsSendIsks">
                <button onClick={(e) => fulfilledIsk(e)}>Да</button>
                <button
                  onClick={() => {
                    dispatch(changeActionFullfilled(false));
                  }}
                >
                  Нет
                </button>
              </div>
            </div>
          )}
          {+istype.type === 3 && (
            <div className="modalchangeStatus">
              <div className="imgBlock">
                <img src={imgWarning} alt="send!" />
              </div>
              <h5>Принять иск?</h5>
              <div className="btnsSendIsks">
                <button onClick={(e) => fulfilledIsk(e)}>Да</button>
                <button
                  onClick={() => {
                    dispatch(changeActionFullfilled(false));
                  }}
                >
                  Нет
                </button>
              </div>
            </div>
          )}
        </Modals>
        {/* /////// */}
        <Modals
          openModal={confirmActionReject}
          setOpenModal={() => dispatch(changeActionReject())}
        >
          {+istype.type === 2 && (
            <div className="modalchangeStatus">
              <div className="imgBlock">
                <img src={imgWarning} alt="send!" />
              </div>
              <h5>Отказать в иске?</h5>
              <div className="btnsSendIsks">
                <button onClick={(e) => rejectIsk(e)}>Да</button>
                <button
                  onClick={() => {
                    setIsType({ ...istype, type: 2 });
                    dispatch(changeActionReject(false));
                  }}
                >
                  нет
                </button>
              </div>
            </div>
          )}
          {+istype.type === 4 && (
            <div className="modalchangeStatus">
              <div className="imgBlock">
                <img src={imgWarning} alt="send!" />
              </div>
              <h5>Отказать в иске?</h5>
              <div className="btnsSendIsks">
                <button onClick={(e) => rejectIsk(e)}>Да</button>
                <button
                  onClick={() => {
                    dispatch(changeActionReject(false));
                  }}
                >
                  нет
                </button>
              </div>
            </div>
          )}
        </Modals>
      </div>
    </>
  );
};
export default ConfirmStatus;
