import React, { useState } from "react";
import "./FillingPlaintiff.scss";
import AddPlaintiff from "../AddPlaintiff/AddPlaintiff";
import { useSelector } from "react-redux";

const FillingPlaintiff = ({ typerole }) => {
  const { lookAddPlaintiff } = useSelector((state) => state.stateSlice);

  return (
    <div
      className="plaintiFilling__container"
      style={lookAddPlaintiff !== 0 ? { maxWidth: "100%" } : {}}
    >
      <AddPlaintiff typerole={typerole} />
    </div>
  );
};

export default FillingPlaintiff;
