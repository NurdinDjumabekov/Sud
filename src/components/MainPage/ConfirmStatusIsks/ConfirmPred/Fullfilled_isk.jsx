///// hooks
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

///// style
import "../style.scss";

////// fns
import { confirmStatusFN } from "../../../../store/reducers/stateSlice";
import { changeStatusDocs } from "../../../../store/reducers/sendDocsSlice";
import { getDataHtmlContent } from "../../../../store/reducers/sendDocsSlice";

///// components
import PdfFulfilled from "../../../../components/PdfFile/PdfFulfilled/PdfFulfilled";
import ApplicationFiles from "../../../PlaintiffPage/ApplicationFiles/ApplicationFiles";
import PdfFile from "../../../PdfFile/PdfFile";
import Modals from "../../../Modals/Modals";

///// imgs
import imgWarning from "../../../../asstes/images/warning.png";
import { createIsksInDocs } from "../../../../store/reducers/applicationsSlice";
import { transformDate } from "../../../../helpers/transformDate";

const Fullfilled_isk = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editorDocRef = useRef(null);
  const fulfilledRef = useRef(null);

  const [confirmAction, setConfirmAction] = useState(false);
  const [idContent, setIdContent] = useState({ id: 0, name: "" });
  const [lookDocs, setLookDocs] = useState(false); ///// для просмотра документов

  const { confirmStatus } = useSelector((state) => state.stateSlice);
  const { id } = useSelector((state) => state.stateSlice?.confirmStatus);
  const { listTodos } = useSelector((state) => state.sendDocsSlice);

  const fulfilledIsk = async () => {
    const { id, status } = confirmStatus;
    if (fulfilledRef.current.editor) {
      const content = fulfilledRef.current.editor.getContent();

      const send = { id, isk_status: status, content, navigate, code_file: 12 };

      const res = await dispatch(changeStatusDocs(send)).unwrap();
      /// 12 - принятие иска председателем

      if (res?.result == 1) {
        const [data] = listTodos?.filter((item) => item?.codeid == id);

        const { isk_date, isk_time, plaintiff, defendant } = data;
        const { reglament_codeid_journal, arbitr_fee } = data;
        const { isk_number, haracter_spor, isk_summ, arbitrs } = data;
        const { arbitr_lang_codeid_journal } = data;

        const plaintiffs = plaintiff?.map((obj) => obj?.name).join(", ");
        const defendants = defendant?.map((obj) => obj?.name).join(", ");
        const choice_arbitr = arbitrs?.[0]?.codeid_journal;

        const countrysPlaint = plaintiff?.[0]?.country_journal || 0;
        const countrysDefend = defendant?.[0]?.country_journal || 0;
        /// 2636 - финансовый

        // console.log(data, "listTodos");
        const sendData = {
          crateDate: `${isk_date} ${isk_time}`,
          plaintiffs,
          defendants,
          reglament: reglament_codeid_journal,
          countrysPlaint,
          arbitr_fee, // деньги
          arbitr_lang: arbitr_lang_codeid_journal,
          choice_arbitr,
          countrysDefend,
          dateAccept: transformDate(new Date()),
          isk_number,
          haracter_spor,
          isk_summ,
        };

        dispatch(createIsksInDocs(sendData)); // создания иска в доксе
      }

      closeAllModal();
    }
  };

  const closeAllModal = () => {
    dispatch(confirmStatusFN(false));
    setConfirmAction(false);
    //// закрываю обе модалки
  };

  useEffect(() => {
    dispatch(getDataHtmlContent({ id }));
    //// get данные для отбражения видов документов приготовленные секретарями
  }, [id]);

  return (
    <>
      {/* ///// открытие документа принятия иска  */}
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
            <PdfFulfilled editorRef={fulfilledRef} idContent={idContent?.id} />
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
