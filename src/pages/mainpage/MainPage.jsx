import React, { useState } from "react";
import "./MainPage.scss";
import { Table } from "../../components/Table/Table";

export default function MainPage() {
  return (
    <div className="main">
      <Table />
    </div>
  );
}
