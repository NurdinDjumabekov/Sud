import React, { useState } from "react";
import "./MainPage.scss";
import userIcon from "../../asstes/icons/user-icon.png";
import onOffIcon from "../../asstes/icons/onOff.png";
import PlaintiffPage from "../PlaintiffPage/PlaintiffPage";
import { useNavigate } from "react-router-dom";
import TableLawsuit from "../../components/TableLawsuit/TableLawsuit";

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="main">
      <div className="nav_footer">
        <div className="table_container">
          <TableLawsuit />
        </div>
      </div>
    </div>
  );
}
