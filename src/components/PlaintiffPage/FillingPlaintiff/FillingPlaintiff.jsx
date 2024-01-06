import React, { useState } from "react";
import "./FillingPlaintiff.scss";
import AddPlaintiff from "../AddPlaintiff/AddPlaintiff";
import AddRepresentative from "../AddRepresentative/AddRepresentative";

const FillingPlaintiff = ({ typerole }) => {
  const [btnSend, setBtnSend] = useState(true);

  return (
    <div className="plaintiFilling__container">
      <AddPlaintiff typerole={typerole} />
      {/* <AddRepresentative typerole={typerole} /> */}
      {/* {btnSend ? (
      ) : (
      )} */}
      {/* /// delete */}
    </div>
  );
};

export default FillingPlaintiff;
