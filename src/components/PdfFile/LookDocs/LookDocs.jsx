import React from "react";
import { useState } from "react";
import Modals from "../../Modals/Modals";
import "./LookDocs.scss";
import pdfImg from "../../../asstes/images/pdfFile.png";

const LookDocs = ({ file }) => {
  const [lookPdf, setLookPdf] = useState(false);
  return (
    <div className="lookPdfModal">
      <div className="lookPdfModal__inner" onClick={() => setLookPdf(true)}>
        {/* <img src={pdfImg} alt="pdf" /> */}
        <span>{file?.name}</span>
      </div>
      <Modals openModal={lookPdf} setOpenModal={() => setLookPdf()}>
        <div className="blockPdf">
          <iframe src={file?.file_path} width="100%" height="100%"></iframe>
        </div>
      </Modals>
    </div>
  );
};

export default LookDocs;
