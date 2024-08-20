///// hooks
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

///// style
import "../style.scss";

////// fns
import { confirmStatusFN } from "../../../../store/reducers/stateSlice";
import { changeStatusDocs } from "../../../../store/reducers/sendDocsSlice";

///// components
import PdfFile from "../../../../components/PdfFile/PdfFile";
import PdfFileRedone from "../../../../components/PdfFile/PdfFileRedone/PdfFileRedone";
import Modals from "../../../Modals/Modals";

///// imgs
import imgWarning from "../../../../asstes/images/warning.png";

const Redone_isk = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editorRef = useRef(null);

  const [confirmAction, setConfirmAction] = useState(false);

  const { confirmStatus } = useSelector((state) => state.stateSlice);

  const redoneIsk = () => {
    const { id, status } = confirmStatus;
    if (editorRef.current && editorRef.current.editor) {
      const content = editorRef.current.editor.getContent();

      const send = { id, isk_status: status, content, navigate };
      dispatch(changeStatusDocs({ ...send, code_file: 18 }));
      /// 18 - отправить на доработку

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
        <div className="blockModal__inner vh100">
          <PdfFile editorRef={editorRef} />
          <div className="plaintiFilling__container moreStyle">
            <PdfFileRedone editorRef={editorRef} />
          </div>
        </div>
        <div className="modalchangeStatus" style={{ height: "auto" }}>
          <div className="btnsSendIsks">
            <button onClick={() => setConfirmAction(true)}>На доработку</button>
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
          <h5>Отправить на доработку?</h5>
          <div className="btnsSendIsks">
            <button onClick={redoneIsk}>Да</button>
            <button onClick={() => setConfirmAction(false)}>Нет</button>
          </div>
        </div>
      </Modals>
    </>
  );
};

export default Redone_isk;
