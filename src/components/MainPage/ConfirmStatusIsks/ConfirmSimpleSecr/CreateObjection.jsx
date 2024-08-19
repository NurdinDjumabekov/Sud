//////// hooks
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/////// components
import PdfObjection from "../../../PdfFile/PdfObjection/PdfObjection";
import Modals from "../../../Modals/Modals";

////// fns
import { confirmStatusFN } from "../../../../store/reducers/stateSlice";
import { sendDocsEveryIsks } from "../../../../store/reducers/sendDocsSlice";

///// imgs
import imgWarning from "../../../../asstes/images/warning.png";

const CreateObjection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editorRef = useRef(null);

  const [confirmAction, setConfirmAction] = useState(false);

  const { confirmStatus } = useSelector((state) => state.stateSlice);

  const sendObjection = () => {
    if (editorRef.current && editorRef.current?.editor) {
      const content = editorRef.current?.editor?.getContent();
      const obj = { content, id: confirmStatus?.id, code_file: 17 };
      dispatch(sendDocsEveryIsks({ ...obj, reRender: true, navigate })); /// 17 - Возражение
      /// для создания документа "Возражение"
      ////// закрываю модалки
      dispatch(confirmStatusFN(false));
      setConfirmAction(false);
    }
  };

  return (
    <>
      <>
        <div className="blockModal__inner onePdf">
          <PdfObjection editorRef={editorRef} />
        </div>
        <div className="modalchangeStatus allHeight">
          <div className="btnsSendIsks">
            <button onClick={() => setConfirmAction(true)}>Сохранить</button>
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
          <h5>Отправить возражение?</h5>
          <div className="btnsSendIsks">
            <button onClick={sendObjection}>Да</button>
            <button onClick={() => setConfirmAction(false)}>нет</button>
          </div>
        </div>
      </Modals>
    </>
  );
};

export default CreateObjection;
