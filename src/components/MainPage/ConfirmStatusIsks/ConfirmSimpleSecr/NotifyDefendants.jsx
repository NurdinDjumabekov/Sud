//////// hooks
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/////// components
import Modals from "../../../Modals/Modals";
import PdfNotifyDefendant from "../../../PdfFile/PdfNotifyDefendant/PdfNotifyDefendant";

////// fns
import { confirmStatusFN } from "../../../../store/reducers/stateSlice";
import { changeStatusDocs } from "../../../../store/reducers/sendDocsSlice";

///// imgs
import imgWarning from "../../../../asstes/images/warning.png";

const NotifyDefendants = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editorRef = useRef(null);

  const [confirmAction, setConfirmAction] = useState(false);

  const { confirmStatus } = useSelector((state) => state.stateSlice);

  const sendObjection = () => {
    if (editorRef.current && editorRef.current?.editor) {
      const content = editorRef.current?.editor?.getContent();
      const obj = { content, id: confirmStatus?.id, code_file: 23 };
      dispatch(changeStatusDocs({ ...obj, isk_status: 5, navigate }));
      /// 17 - уведомление

      ////// закрываю модалки
      dispatch(confirmStatusFN(false));
      setConfirmAction(false);
    }
  };

  return (
    <>
      <>
        <div className="blockModal__inner onePdf">
          <PdfNotifyDefendant editorRef={editorRef} />
        </div>
        <div className="modalchangeStatus allHeight">
          <div className="btnsSendIsks">
            <button onClick={() => setConfirmAction(true)}>Отправить</button>
            <button onClick={() => dispatch(confirmStatusFN(false))}>
              Отмена
            </button>
          </div>
        </div>
      </>
      <Modals
        openModal={confirmAction}
        setOpenModal={() => setConfirmAction()}
        krest={true}
      >
        {/* //// фоормирование возражения */}
        <div className="modalchangeStatus">
          <div className="imgBlock">
            <img src={imgWarning} alt="send!" />
          </div>
          <h5>Отправить уведомление?</h5>
          <div className="btnsSendIsks">
            <button onClick={sendObjection}>Да</button>
            <button onClick={() => setConfirmAction(false)}>нет</button>
          </div>
        </div>
      </Modals>
    </>
  );
};

export default NotifyDefendants;
