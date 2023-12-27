import React from "react";
import "./LogOut.scss";
import { useNavigate } from "react-router-dom";
import logOutImg from "../../asstes/icons/IconPage/logout.svg";

const LogOut = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button className="logout" onClick={() => navigate("/")}>
        <div>
          <img src={logOutImg} alt="х" />
          <p>Выход</p>
        </div>
      </button>
    </div>
  );
};

export default LogOut;
