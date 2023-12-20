import React, { useState } from 'react';
import './FillingPlaintiff.scss';
import AddPlaintiff from '../AddPlaintiff/AddPlaintiff';
import AddRepresentative from '../AddRepresentative/AddRepresentative';

const FillingPlaintiff = ({ typerole }) => {
  const [btnSend, setBtnSend] = useState(true);
  const selectArr = [
    { id: 0, name: 'Мужской' },
    { id: 1, name: 'Женский' },
  ];
  return (
    <div className="plaintiFilling__container">
      <div className="P_filling__mainBtn">
        {btnSend ? (
          <button onClick={() => setBtnSend(false)}>
            Добавить представителя {typerole}
          </button>
        ) : (
          <button onClick={() => setBtnSend(true)}>Добавить {typerole}</button>
        )}
      </div>
      {btnSend ? <AddPlaintiff typerole={typerole} /> : <AddRepresentative />}
    </div>
  );
};

export default FillingPlaintiff;
