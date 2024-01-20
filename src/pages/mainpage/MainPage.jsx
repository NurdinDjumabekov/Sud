import React, { useState } from "react";
import "./MainPage.scss";
import { Table } from "../../components/Table/Table";
import { useDispatch, useSelector } from "react-redux";
import { toTakeIsksList } from "../../store/reducers/sendDocsSlice";

export default function MainPage() {
  return (
    <div className="main">
      <Table />
    </div>
  );
}
