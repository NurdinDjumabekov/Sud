import React, { useState } from "react";
import "./PlaintiffPage.scss";
import InputsPlaintiff from "../../components/PlaintiffPage/InputsPlaintiff/InputsPlaintiff";
import { useNavigate } from "react-router-dom";
import krestik from "../../asstes/icons/krestik.svg";

const PlaintiffPage = () => {
  const navigate = useNavigate();
  const [typePlantiff, setTypePlantiff] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="plaintiff">
      <button onClick={() => navigate("/main")} className="prevBtn">
        <img src={krestik} alt="x" />
      </button>
      <h1>Подача искового заявления</h1>
      <div className="plaintiff__type">
        <div>
          <button onClick={() => navigate("/main")}>Назад</button>
          <button onClick={() => setTypePlantiff(false)}>Иск</button>
          <button onClick={() => setTypePlantiff(true)}>ChatGPT</button>
        </div>
      </div>
      {typePlantiff ? "" : <InputsPlaintiff />}
    </div>
  );
};

export default PlaintiffPage;
