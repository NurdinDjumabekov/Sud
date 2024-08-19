import React from "react";
import { useState } from "react";
import Modals from "../../Modals/Modals";
import "./LookPdfModal.scss";
import pdfImg from "../../../asstes/images/pdfFile.png";

const LookPdfModal = ({ pdf, row }) => {
  const [lookPdf, setLookPdf] = useState(false);

  if (pdf?.code_file_type == 12 && row?.isk_status == 1) {
    //// не отображаю доки принятые отв. секретарем т.к. они не нужны но данные внутри нужны
    return <></>;
  }

  return (
    <div className="lookPdfModal">
      <div className="lookPdfModal__inner" onClick={() => setLookPdf(true)}>
        <img src={pdfImg} alt="pdf" />
        <span>{pdf?.document_name}</span>
      </div>
      <Modals openModal={lookPdf} setOpenModal={() => setLookPdf()}>
        <div className="blockPdf">
          <iframe src={pdf?.path} width="100%" height="100%"></iframe>
        </div>
      </Modals>
    </div>
  );
};

export default LookPdfModal;
