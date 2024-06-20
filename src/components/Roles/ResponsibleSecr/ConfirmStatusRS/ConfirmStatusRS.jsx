import "./ConfirmStatusRS.scss";

/// hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

///// states
import {
  changeActionFullfilled,
  changeActionRedone,
  changeActionReject,
  changeLookDocs,
  clearMainBtnList,
} from "../../../../store/reducers/stateSlice";
import { toTakeSecretarList } from "../../../../store/reducers/selectsSlice";
import { toTakeTypeTypeDocs } from "../../../../store/reducers/applicationsSlice";
import { changeStatusDocs } from "../../../../store/reducers/sendDocsSlice";

//// components
import ApplicationFiles from "../../../PlaintiffPage/ApplicationFiles/ApplicationFiles";
import PdfFileReject from "../../../PdfFile/PdfFileReject/PdfFileReject";
import PdfFulfilled from "../../../PdfFile/PdfFulfilled/PdfFulfilled";
import Modals from "../../../Modals/Modals";
import PdfFile from "../../../PdfFile/PdfFile";

///// imgs
import imgWarning from "../../../../asstes/images/warning.png";
import PdfFileRedone from "../../../PdfFile/PdfFileRedone/PdfFileRedone";

const ConfirmStatusRS = (props) => {
  const { setSendStatusIsk, sendStatusIsk, setIsType, istype } = props;

  const dispatch = useDispatch();
  const editorRef = React.useRef(null);
  const editorRefReject = React.useRef(null);
  const navigate = useNavigate();

  const { confirmActionRedone, lookDocs } = useSelector(
    (state) => state.stateSlice
  );

  const { confirmActionFullfilled, confirmActionReject } = useSelector(
    (state) => state.stateSlice
  );

  const { tokenA } = useSelector((state) => state.saveDataSlice);

  const chechPdf = editorRef.current && editorRef.current.editor;

  const fulfilledIsk = (e) => {
    e.preventDefault();
    if (chechPdf) {
      const content = editorRef.current.editor.getContent();
      dispatch(
        changeStatusDocs({
          id: istype.id,
          tokenA,
          isk_status: istype.type,
          content,
          type: 12, /// принятие иска как ответственный секретарь
          navigate,
        })
      );
      dispatch(clearMainBtnList());
      closeAllModal();
    }
  };

  const rejectIsk = (e) => {
    e.preventDefault();
    if (chechPdf) {
      const content = editorRef.current.editor.getContent();
      dispatch(
        changeStatusDocs({
          id: istype.id,
          tokenA,
          isk_status: istype.type,
          content,
          type: 13,
          navigate,
        })
      );
      dispatch(clearMainBtnList());
      closeAllModal();
    }
  };

  const redoneIsk = (e) => {
    e.preventDefault();
    if (chechPdf) {
      const content = editorRef.current.editor.getContent();
      dispatch(
        changeStatusDocs({
          id: istype.id,
          tokenA,
          isk_status: istype.type,
          content,
          type: 18, //// отправить на доработку
          navigate,
        })
      );

      dispatch(clearMainBtnList());
      closeAllModal();
    }
  };

  const closeRSPdf = () => {
    setIsType({ ...istype, type: 0 });
    setSendStatusIsk(false);
    dispatch(changeActionReject(false));
  };

  const closeAllModal = () => {
    dispatch(changeActionFullfilled(false));
    dispatch(changeActionReject(false));
    dispatch(changeActionRedone(false));
    setSendStatusIsk(false);
  };

  React.useEffect(() => {
    dispatch(toTakeSecretarList(tokenA));
  }, []);

  React.useEffect(() => {
    if (!sendStatusIsk) {
      dispatch(toTakeTypeTypeDocs(tokenA));
    }
  }, [sendStatusIsk]);

  //// 1 - принять ответ. секр, 2 - отказ отв. секр, 3 - на доработку

  return (
    <>
      <div className="blockModal moreStylePdf">
        <Modals
          openModal={sendStatusIsk}
          setOpenModal={() => setSendStatusIsk()}
        >
          {istype.type === 6 && (
            <>
              <div className="blockModal__inner">
                <PdfFile editorRef={editorRefReject} />
                <div className="plaintiFilling__container moreStyle">
                  <PdfFileRedone istype={istype} editorRef={editorRef} />
                </div>
              </div>
              <div className="modalchangeStatus" style={{ height: "auto" }}>
                <div className="btnsSendIsks">
                  <button
                    onClick={() => dispatch(changeActionRedone(true))}
                    className="btnsSendIsks"
                  >
                    На доработку
                  </button>
                  <button onClick={closeRSPdf}>Отмена</button>
                </div>
              </div>
            </>
          )}
        </Modals>
      </div>
      {/* ////////// только для подтверждения иска  */}
      <div className="blockModal moreStylePdf noneKrestic">
        {/*  //////// на доработку отв. секр */}
        <Modals
          openModal={confirmActionRedone}
          setOpenModal={() => dispatch(changeActionRedone())}
        >
          <div className="modalchangeStatus">
            <div className="imgBlock">
              <img src={imgWarning} alt="send!" />
            </div>
            <h5>Отправить на доработку?</h5>
            <div className="btnsSendIsks">
              <button onClick={(e) => redoneIsk(e)}>Да</button>
              <button onClick={() => dispatch(changeActionRedone(false))}>
                нет
              </button>
            </div>
          </div>
        </Modals>
      </div>
    </>
  );
};
export default ConfirmStatusRS;
