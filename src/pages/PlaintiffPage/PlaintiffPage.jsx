import React, { useState } from 'react';
import './PlaintiffPage.scss';
import InputsPlaintiff from '../../components/PlaintiffPage/InputsPlaintiff/InputsPlaintiff';

const PlaintiffPage = () => {
  const [typePlantiff, setTypePlantiff] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <div className="plaintiff">
        <h1>Подача искового заявления</h1>
        <div className="plaintiff__type">
          <div>
            <button onClick={() => setTypePlantiff(false)}>Иск</button>
            <button onClick={() => setTypePlantiff(true)}>ChatGPT</button>
          </div>
        </div>
        {typePlantiff ? '' : <InputsPlaintiff />}
      </div>
    </div>
  );
};

export default PlaintiffPage;
