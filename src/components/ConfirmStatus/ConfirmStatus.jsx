import React, { useRef, useState } from "react";
import Modals from "../Modals/Modals";
import "./ConfirmStatus.scss";
import imgWarning from "../../asstes/images/warning.png";
import { changeStatusOrg } from "../../store/reducers/sendDocsSlice";
import { useDispatch, useSelector } from "react-redux";
import PdfFileReject from "../PdfFile/PdfFileReject/PdfFileReject";
import PdfFulfilled from "../PdfFile/PdfFulfilled/PdfFulfilled";
import { useNavigate } from "react-router-dom";

const ConfirmStatus = ({
  setSendStatusIsk,
  sendStatusIsk,
  setIsType,
  istype,
}) => {
  const { tokenA } = useSelector((state) => state.saveDataSlice);
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const navigate = useNavigate();

  const handleConfirm = (type) => {
    if (editorRef.current && editorRef.current.editor) {
      const content = editorRef.current.editor.getContent();
      dispatch(
        changeStatusOrg({
          id: istype.id,
          tokenA,
          isk_status: istype.type,
          content,
          // description: "",
          type: 12,
          isk_status: +type,
          navigate,
          ///// завтра
        })
      );
      setSendStatusIsk(false);
    }
  };
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
    }
  };
  const fulfilledIsk = (e) => {
    e.preventDefault();
    if (editorRef.current && editorRef.current.editor) {
      const content = editorRef.current.editor.getContent();
      dispatch(
        changeStatusOrg({
          id: istype.id,
          tokenA,
          isk_status: istype.type,
          content,
          type: 12, /// принятие иска
        })
      );
      setSendStatusIsk(false);
    }
  };

  React.useEffect(() => {
    return () => setIsType({ type: 0, id: 0 });
  }, []);
  return (
    <div className="blockModal">
      <Modals openModal={sendStatusIsk} setOpenModal={() => setSendStatusIsk()}>
        {istype.type === 1 && (
          <div className="modalchangeStatus">
            <div className="imgBlock">
              <img src={imgWarning} alt="send!" />
            </div>
            <h5>Вы уверены что хотите поменять статус иска?</h5>
            <p>После подтверждения обратно иск поменять не получится...</p>
            <div className="btnsSendIsks">
              <button onClick={() => handleConfirm(istype.type)}>
                Принять иск
              </button>
              <button onClick={() => setSendStatusIsk(false)}>Отмена</button>
            </div>
          </div>
        )}
        {(istype.type === 2 || istype.type === 4) && (
          <div className="plaintiFilling__container moreStyle">
            <PdfFileReject istype={istype} editorRef={editorRef} />
            <div className="modalchangeStatus" style={{ height: "auto" }}>
              <div className="btnsSendIsks">
                <button onClick={(e) => rejectIsk(e)}>Отклонить иск</button>
                <button onClick={() => setSendStatusIsk(false)}>Отмена</button>
              </div>
            </div>
          </div>
        )}
        {istype.type === 3 && (
          <div className="plaintiFilling__container moreStyle">
            <PdfFulfilled istype={istype} editorRef={editorRef} />
            <div className="modalchangeStatus" style={{ height: "auto" }}>
              <div className="btnsSendIsks">
                <button onClick={(e) => fulfilledIsk(e)}>Принять иск</button>
                <button onClick={() => setSendStatusIsk(false)}>Отмена</button>
              </div>
            </div>
          </div>
        )}
      </Modals>
    </div>
  );
};

export default ConfirmStatus;
