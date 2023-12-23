import React, { useState } from "react";
import "./FillingPlaintiff.scss";
import AddPlaintiff from "../AddPlaintiff/AddPlaintiff";
import AddRepresentative from "../AddRepresentative/AddRepresentative";

const FillingPlaintiff = ({ typerole }) => {
  const [btnSend, setBtnSend] = useState(true);

  return (
    <div className="plaintiFilling__container">
      <div className="P_filling__mainBtn">
        <button
          className={btnSend ? "activeBtns" : ""}
          onClick={() => setBtnSend(true)}
        >
          Добавить {typerole}
        </button>
        <button
          className={btnSend ? "" : "activeBtns"}
          onClick={() => setBtnSend(false)}
        >
          Добавить представителя {typerole}
        </button>
      </div>
      {btnSend ? <AddPlaintiff typerole={typerole} /> : <AddRepresentative />}
    </div>
  );
};

export default FillingPlaintiff;
