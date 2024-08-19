///// hooks
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

///// style
import "../style.scss";

////// fns
import { confirmStatusFN } from "../../../../store/reducers/stateSlice";
import { changeStatusDocs } from "../../../../store/reducers/sendDocsSlice";

///// components
import PdfFulfilled from "../../../../components/PdfFile/PdfFulfilled/PdfFulfilled";
import ApplicationFiles from "../../../PlaintiffPage/ApplicationFiles/ApplicationFiles";
import PdfFile from "../../../PdfFile/PdfFile";
import Modals from "../../../Modals/Modals";

///// imgs
import imgWarning from "../../../../asstes/images/warning.png";

const Fullfilled_isk = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editorDocRef = useRef(null);
  const fulfilledRef = useRef(null);

  const [confirmAction, setConfirmAction] = useState(false);
  const [lookDocs, setLookDocs] = useState(false); ///// для просмотра документов

  const { confirmStatus } = useSelector((state) => state.stateSlice);

  const fulfilledIsk = () => {
    const { id, status } = confirmStatus;
    if (fulfilledRef.current.editor) {
      const content = fulfilledRef.current.editor.getContent();

      const send = { id, isk_status: status, content, navigate };
      dispatch(changeStatusDocs({ ...send, code_file: 12 }));
      /// 12 - принятие иска ответственным секретарём
      closeAllModal();
    }
  };

  const closeAllModal = () => {
    dispatch(confirmStatusFN(false));
    setConfirmAction(false);
    //// закрываю обе модалки
  };

  return (
    <>
      {/* ///// открытие документа приняти  я иска  */}
      <>
        <div className="choiceSecretard">
          {lookDocs ? (
            <button onClick={() => setLookDocs(false)}>
              Исковое заявление
            </button>
          ) : (
            <button onClick={() => setLookDocs(true)}>Документы</button>
          )}
        </div>
        <div className="blockModal__inner haveDocs">
          {lookDocs ? (
            <div className="noEditDoctLoading">
              <ApplicationFiles />
            </div>
          ) : (
            <PdfFile editorRef={editorDocRef} />
          )}
          <div className="plaintiFilling__container moreStyle">
            <PdfFulfilled editorRef={fulfilledRef} />
          </div>
        </div>
        <div className="modalchangeStatus" style={{ height: "auto" }}>
          <div className="btnsSendIsks">
            <button onClick={() => setConfirmAction(true)}>Принять</button>
            <button onClick={closeAllModal}>Отмена</button>
          </div>
        </div>
      </>

      {/* ///// подверждение документа принятия иска  */}
      <Modals openModal={confirmAction} setOpenModal={setConfirmAction}>
        <div className="modalchangeStatus">
          <div className="imgBlock">
            <img src={imgWarning} alt="send!" />
          </div>
          <h5>Принять иск?</h5>
          <div className="btnsSendIsks">
            <button onClick={fulfilledIsk}>Да</button>
            <button onClick={() => setConfirmAction(false)}>Нет</button>
          </div>
        </div>
      </Modals>
    </>
  );
};

export default Fullfilled_isk;
