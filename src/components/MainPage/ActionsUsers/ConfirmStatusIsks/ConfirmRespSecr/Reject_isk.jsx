///// hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

///// style
import "../../style.scss";

////// fns
import { changeLookDocs } from "../../../../../store/reducers/stateSlice";
import { confirmStatusFN } from "../../../../../store/reducers/stateSlice";
import { changeStatusDocs } from "../../../../../store/reducers/sendDocsSlice";

///// components
import PdfFulfilled from "../../../../PdfFile/PdfFulfilled/PdfFulfilled";
import ApplicationFiles from "../../../../PlaintiffPage/ApplicationFiles/ApplicationFiles";
import PdfFile from "../../../../PdfFile/PdfFile";
import Modals from "../../../../Modals/Modals";

///// imgs
import imgWarning from "../../../../../asstes/images/warning.png";
import { useState } from "react";
import PdfFileReject from "../../../../PdfFile/PdfFileReject/PdfFileReject";

const Reject_isk = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editorRefReject = useRef(null);

  const [confirmAction, setConfirmAction] = useState(false);

  const { confirmStatus } = useSelector((state) => state.stateSlice);

  const { tokenA } = useSelector((state) => state.saveDataSlice);

  const rejectIsk = () => {
    const { id, status } = confirmStatus;
    if (editorRefReject.current && editorRefReject.current.editor) {
      const content = editorRefReject.current.editor.getContent();

      const send = { id, tokenA, isk_status: status, content, navigate };

      dispatch(changeStatusDocs({ ...send, type: 13 }));
      /// 13 - отклонение иска ответственным секретарём

      // dispatch(clearMainBtnList());
      closeAllModal();
    }
  };

  const closeAllModal = () => {
    dispatch(confirmStatusFN(false));
    setConfirmAction(false);
    //// закрываю обе модалки
  };

  if (confirmStatus?.status == 2) {
    return (
      <>
        {/* ///// открытие документа принятия иска  */}
        <>
          <div className="blockModal__inner">
            <PdfFile editorRef={editorRefReject} />
            <div className="plaintiFilling__container moreStyle">
              <PdfFileReject editorRef={editorRefReject} />
            </div>
          </div>
          <div className="modalchangeStatus" style={{ height: "auto" }}>
            <div className="btnsSendIsks">
              <button
                onClick={() => setConfirmAction(true)}
                className="rejectBtn"
              >
                Отклонить
              </button>
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
            <h5>Отказать в иске?</h5>
            <div className="btnsSendIsks">
              <button onClick={(e) => rejectIsk(e)}>Да</button>
              <button onClick={() => setConfirmAction(false)}>нет</button>
            </div>
          </div>
        </Modals>
      </>
    );
  }
};

export default Reject_isk;
