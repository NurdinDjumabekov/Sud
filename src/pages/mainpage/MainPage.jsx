import React, { useState } from "react";
import "./MainPage.scss";
import { Table } from "../../components/Table/Table";
import { useDispatch, useSelector } from "react-redux";
import { toTakeIsksList } from "../../store/reducers/sendDocsSlice";

export default function MainPage() {
  const dispatch = useDispatch();
  const { tokenA } = useSelector((state) => state.saveDataSlice);

  React.useEffect(() => {
    dispatch(toTakeIsksList(tokenA));
  }, []);

  return (
    <div className="main">
      <Table />
    </div>
  );
}
