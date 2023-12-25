import React, { useState } from 'react';
import './TableLawsuit.scss';
import { useNavigate } from 'react-router-dom';
import imgPdf from '../../asstes/icons/pdf.svg';
import LogOut from '../LogOut/LogOut';
import { Table } from '../Table/Table';

export default function TableLawsuit() {
  const navigate = useNavigate();
  return (
    <div className="mainTable">
      <Table />
    </div>
  );
}
