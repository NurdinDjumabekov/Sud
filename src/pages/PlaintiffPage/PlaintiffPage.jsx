import React, { useState } from 'react';
import './PlaintiffPage.scss';
import InputsPlaintiff from '../../components/PlaintiffPage/InputsPlaintiff/InputsPlaintiff';

const PlaintiffPage = () => {
  const [typePlantiff, setTypePlantiff] = useState(false);

  return (
    <div>
      <div className="plaintiff">
        <h1>Подача искового заявления</h1>
        <button></button>
        <div className="plaintiff__type">
          <button onClick={() => setTypePlantiff(false)}>Иск</button>
          <button onClick={() => setTypePlantiff(true)}>ChatGPT</button>
        </div>
        {typePlantiff ? '' : <InputsPlaintiff />}
      </div>
    </div>
  );
};

export default PlaintiffPage;
