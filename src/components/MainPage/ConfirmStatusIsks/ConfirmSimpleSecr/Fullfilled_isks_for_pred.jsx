///// hooks
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

///// style
import "../style.scss";

////// fns
import { confirmStatusFN } from "../../../../store/reducers/stateSlice";
import { sendDocsEveryIsks } from "../../../../store/reducers/sendDocsSlice";

///// components
import PdfFulfilled from "../../../PdfFile/PdfFulfilled/PdfFulfilled";
import ApplicationFiles from "../../../PlaintiffPage/ApplicationFiles/ApplicationFiles";
import PdfFile from "../../../PdfFile/PdfFile";
import Modals from "../../../Modals/Modals";

///// imgs
import imgWarning from "../../../../asstes/images/warning.png";

////// helpers

const Fullfilled_isks_for_pred = () => {
  const dispatch = useDispatch();
  const editorDocRef = useRef(null);
  const fulfilledRef = useRef(null);

  const [confirmAction, setConfirmAction] = useState(false);
  const [lookDocs, setLookDocs] = useState(false); ///// для просмотра документов

  const { id } = useSelector((state) => state.stateSlice?.confirmStatus);

  const fulfilledIsk = () => {
    if (fulfilledRef.current.editor) {
      const content = fulfilledRef.current.editor.getContent();
      dispatch(sendDocsEveryIsks({ content, code_file: 12, id }));
      /// 12 - принятие иска председателем
      /// для создания документа о принятии иска (заполняет секретарь для председателя)
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
      {/* ///// открытие документа приняти  я иска, секретарь заполняет его для председателя */}
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
        <div className="modalchangeStatus allHeight">
          <div className="btnsSendIsks">
            <button onClick={() => setConfirmAction(true)}>Отправить</button>
            <button onClick={closeAllModal}>Отмена</button>
          </div>
        </div>
      </>

      {/* ///// подверждение документа принятия иска  */}
      <Modals
        openModal={confirmAction}
        setOpenModal={setConfirmAction}
        krest={true}
      >
        <div className="modalchangeStatus">
          <div className="imgBlock">
            <img src={imgWarning} alt="send!" />
          </div>
          <h5>Отправить председателю?</h5>
          <div className="btnsSendIsks">
            <button onClick={fulfilledIsk}>Да</button>
            <button onClick={() => setConfirmAction(false)}>Нет</button>
          </div>
        </div>
      </Modals>
    </>
  );
};

export default Fullfilled_isks_for_pred;
