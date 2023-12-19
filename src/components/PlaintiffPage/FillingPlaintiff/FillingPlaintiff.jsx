import React, { useState } from 'react';
import './FillingPlaintiff.scss';
import AddPlaintiff from '../AddPlaintiff/AddPlaintiff';
import AddRepresentative from '../AddRepresentative/AddRepresentative';

const FillingPlaintiff = () => {
  const [btnSend, setBtnSend] = useState(true);

  return (
    <div className="P_filling">
      <div className="P_filling__mainBtn">
        {btnSend ? (
          <button onClick={() => setBtnSend(false)}>Добавить истца</button>
        ) : (
          <button onClick={() => setBtnSend(true)}>
            Добавить представителя истца
          </button>
        )}
      </div>
      {btnSend ? <AddPlaintiff /> : <AddRepresentative />}
    </div>
  );
};

export default FillingPlaintiff;
