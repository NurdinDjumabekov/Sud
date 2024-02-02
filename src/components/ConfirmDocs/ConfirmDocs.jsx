import React, { useRef } from "react";
import PdfObjection from "../PdfFile/PdfObjection/PdfObjection";
import Modals from "../Modals/Modals";
import { useDispatch } from "react-redux";
import "./ConfirmDocs.scss";

const ConfirmDocs = (props) => {
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const { setSendStatusIsk, sendStatusIsk, setIsType, istype } = props;

  console.log(istype, "istype");
  console.log(sendStatusIsk, "sendStatusIsk");
  return (
    <div className="blockModal moreStylePdf objectionPdf">
      <Modals openModal={sendStatusIsk} setOpenModal={() => setSendStatusIsk()}>
        <div className="blockModal__inner obj__inner">
          <PdfObjection editorRef={editorRef} />
        </div>
        <div className="modalchangeStatus" style={{ height: "auto" }}>
          <div className="btnsSendIsks">
            <button
            //   onClick={(e) => {
            //     setIsType({ ...istype, type: 1 });
            //     dispatch(changeActionFullfilled(true));
            //   }}
            >
              Сохранить
            </button>
            <button onClick={() => setSendStatusIsk(false)}>Отмена</button>
          </div>
        </div>
      </Modals>
    </div>
  );
};

export default ConfirmDocs;
