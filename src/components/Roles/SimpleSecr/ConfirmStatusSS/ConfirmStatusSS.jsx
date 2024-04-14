import React, { useRef } from "react";
import PdfObjection from "../../../PdfFile/PdfObjection/PdfObjection";
import Modals from "../../../Modals/Modals";
import { useDispatch, useSelector } from "react-redux";
import {
  changeObjectionPdfVeiw,
  clearMainBtnList,
} from "../../../../store/reducers/stateSlice";
import imgWarning from "../../../../asstes/images/warning.png";

import "./ConfirmStatusSS.scss";
import {
  changeStatusOrg,
  sendDocsEveryIsks,
} from "../../../../store/reducers/sendDocsSlice";
import { useNavigate } from "react-router-dom";

const ConfirmStatusSS = (props) => {
  const { setSendStatusIsk, sendStatusIsk, setIsType, istype } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const { tokenA } = useSelector((state) => state.saveDataSlice);
  const { objectionPdfVeiw } = useSelector((state) => state.stateSlice);

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
      changeStatusOrg({
        id: istype.id,
        tokenA,
        isk_status: 5,
        navigate,
      })
    );
    setSendStatusIsk(false);
    dispatch(clearMainBtnList());
  };

  return (
    <div className="blockModal moreStylePdf objectionPdf">
      <Modals openModal={sendStatusIsk} setOpenModal={() => setSendStatusIsk()}>
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
      </Modals>
      <Modals
        openModal={objectionPdfVeiw}
        setOpenModal={() => dispatch(changeObjectionPdfVeiw())}
      >
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
    </div>
  );
};

export default ConfirmStatusSS;
