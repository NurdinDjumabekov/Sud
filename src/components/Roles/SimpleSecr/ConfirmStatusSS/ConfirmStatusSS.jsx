////////// states and fns
import {
  changeActionFullfilled,
  changeLookDocs,
  changeObjectionPdfVeiw,
  clearMainBtnList,
} from "../../../../store/reducers/stateSlice";

import {
  changeStatusOrg,
  sendDocsEveryIsks,
} from "../../../../store/reducers/sendDocsSlice";

//// pdfs
import PdfFile from "../../../PdfFile/PdfFile";
import PdfFulfilled from "../../../PdfFile/PdfFulfilled/PdfFulfilled";

////// img
import imgWarning from "../../../../asstes/images/warning.png";

///// hooks
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useRef } from "react";

///components
import ApplicationFiles from "../../../PlaintiffPage/ApplicationFiles/ApplicationFiles";
import PdfObjection from "../../../PdfFile/PdfObjection/PdfObjection";
import Modals from "../../../Modals/Modals";

///scsss
import "./ConfirmStatusSS.scss";

const ConfirmStatusSS = (props) => {
  const { setSendStatusIsk, sendStatusIsk, setIsType, istype } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editorRef = useRef(null);
  const editorRefReject = useRef(null);

  const { tokenA } = useSelector((state) => state.saveDataSlice);

  const { objectionPdfVeiw, lookDocs, confirmActionFullfilled } = useSelector(
    (state) => state.stateSlice
  );

  const sendObjection = () => {
    if (editorRef.current && editorRef.current.editor) {
      const content = editorRef.current.editor.getContent();
      dispatch(
        sendDocsEveryIsks({
          content,
          id: istype.id,
          type: 17,
          navigate,
          tokenA,
        }) /// для создания документа иска
      );
      setSendStatusIsk(false);
      dispatch(clearMainBtnList());
    }
    dispatch(changeObjectionPdfVeiw(false));
    setSendStatusIsk(false);
  };

  const changeStatus = () => {
    dispatch(
      changeStatusOrg({ id: istype.id, tokenA, isk_status: 5, navigate })
    );
    setSendStatusIsk(false);
    dispatch(clearMainBtnList());
  };

  const closeAllModal = () => {
    setSendStatusIsk(false);
    setIsType({ ...istype, type: 0 });
    dispatch(changeActionFullfilled(false));
  };

  const fulfilledIsk = (e) => {
    e.preventDefault();
    if (editorRef.current && editorRef.current.editor) {
      const content = editorRef.current.editor.getContent();
      dispatch(sendDocsEveryIsks({ content, type: 12, id: istype.id }));
      /// для создания документа иска
      closeAllModal();
    }
  };

  return (
    <div className="blockModal moreStylePdf objectionPdf">
      <Modals openModal={sendStatusIsk} setOpenModal={() => setSendStatusIsk()}>
        {/* //// фоормирование возражения */}
        {istype.type === 5 && (
          <>
            <div className="blockModal__inner obj__inner">
              <PdfObjection editorRef={editorRef} />
            </div>
            <div className="modalchangeStatus" style={{ height: "auto" }}>
              <div className="btnsSendIsks">
                <button onClick={() => dispatch(changeObjectionPdfVeiw(true))}>
                  Сохранить
                </button>
                <button onClick={() => setSendStatusIsk(false)}>Отмена</button>
              </div>
            </div>
          </>
        )}

        {/* //// уведомить ответчика */}
        {istype.type === 6 && (
          <div className="modalchangeStatus">
            <div className="imgBlock">
              <img src={imgWarning} alt="send!" />
            </div>
            <h5>Уведомить ответчика?</h5>
            <div className="btnsSendIsks">
              <button onClick={() => changeStatus()}>Да</button>
              <button onClick={() => setSendStatusIsk(false)}>нет</button>
            </div>
          </div>
        )}

        {/* //// заполнить принятие искового заявления от секретаря дела */}
        {istype.type === 7 && (
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
                <button onClick={() => dispatch(changeActionFullfilled(true))}>
                  Отправить
                </button>
                <button onClick={closeAllModal}>Отмена</button>
              </div>
            </div>
          </>
        )}
      </Modals>

      <Modals
        openModal={objectionPdfVeiw}
        setOpenModal={() => dispatch(changeObjectionPdfVeiw())}
      >
        {/* //// фоормирование возражения */}
        {istype.type === 5 && (
          <div className="modalchangeStatus">
            <div className="imgBlock">
              <img src={imgWarning} alt="send!" />
            </div>
            <h5>Отправить возражение?</h5>
            <div className="btnsSendIsks">
              <button onClick={() => sendObjection()}>Да</button>
              <button onClick={() => dispatch(changeObjectionPdfVeiw(false))}>
                нет
              </button>
            </div>
          </div>
        )}
      </Modals>

      <Modals
        openModal={confirmActionFullfilled}
        setOpenModal={() => dispatch(changeActionFullfilled())}
      >
        {/* //// заполнить принятие искового заявления от секретаря дела */}
        <div className="modalchangeStatus">
          <div className="imgBlock">
            <img src={imgWarning} alt="send!" />
          </div>
          <h5>Отправить председателю? </h5>
          <div className="btnsSendIsks">
            <button onClick={(e) => fulfilledIsk(e)}>Да</button>
            <button onClick={() => dispatch(changeActionFullfilled(false))}>
              Нет
            </button>
          </div>
        </div>
      </Modals>
    </div>
  );
};

export default ConfirmStatusSS;
