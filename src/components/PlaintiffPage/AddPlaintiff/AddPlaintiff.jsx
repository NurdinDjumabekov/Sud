import React, { useState } from 'react';
import './AddPlaintiff.scss';
import FizFace from '../FizFace/FizFace';
import UrFace from '../UrFace/UrFace';

const AddPlaintiff = ({ typerole }) => {
  const [lookType, setLookType] = useState(1);
  const [btnList, setBtnList] = useState([
    {
      id: 1,
      name: 'Физическое лицо',
      bool: true,
    },
    {
      id: 2,
      name: 'Юридическое лицо',
      bool: false,
    },
  ]);

  const clickBtn = (id) => {
    const newList = btnList.map((item) => {
      return {
        ...item,
        bool: id === item.id ? !item.bool : false,
      };
    });

    setBtnList(newList);
  };

  return (
    <div>
      <div className="blockfaceMan">
        {btnList?.map((item) => (
          <button
            className={item?.bool ? 'activeBtn' : ''}
            onClick={() => {
              clickBtn(item.id);
              setLookType(item.id);
            }}
            key={item.id}
          >
            {item.name}
          </button>
        ))}
      </div>
      {lookType === 1 ? <FizFace typerole={typerole} /> : <UrFace />}
    </div>
  );
};

export default AddPlaintiff;
