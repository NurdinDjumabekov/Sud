import React, { useState } from "react";
import "./InputsPlaintiff.scss";
import PdfFile from "../../PdfFile/PdfFile";
import { useSelector } from "react-redux";

const InputsPlaintiff = ({ btnList, indexComp }) => {
  const { lookAddPlaintiff } = useSelector((state) => state.stateSlice);

  return (
    <div className="plaintiffData">
      <div className="plantiffBlockMain">
        <React.Fragment key={indexComp}>
          {btnList?.[indexComp]?.components}
        </React.Fragment>
        {lookAddPlaintiff === 0 && (
          <PdfFile typerole={indexComp === 0 ? "Истец" : "Ответчик"} />
        )}
      </div>
    </div>
  );
};

export default InputsPlaintiff;
