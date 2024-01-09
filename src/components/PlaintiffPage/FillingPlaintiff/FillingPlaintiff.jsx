import React, { useState } from "react";
import "./FillingPlaintiff.scss";
import AddPlaintiff from "../AddPlaintiff/AddPlaintiff";

const FillingPlaintiff = ({ typerole }) => {
  return (
    <div className="plaintiFilling__container">
      <AddPlaintiff typerole={typerole} />
    </div>
  );
};

export default FillingPlaintiff;
