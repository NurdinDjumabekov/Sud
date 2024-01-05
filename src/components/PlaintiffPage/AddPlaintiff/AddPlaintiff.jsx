import React, { useState } from "react";
import "./AddPlaintiff.scss";
import FizFace from "../FizFace/FizFace";
import UrFace from "../UrFace/UrFace";

const AddPlaintiff = ({ typerole }) => {
  const [lookType, setLookType] = useState(1);
  const [btnList, setBtnList] = useState([
    {
      id: 1,
      name: "Физическое лицо",
      bool: true,
    },
    {
      id: 2,
      name: "Юридическое лицо",
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
  console.log(btnList, "btnList");

  return (
    <div className="addPlaintiff">
      <div className="btnsType">
        {btnList?.map((item) => (
          <button
            className={item?.bool ? "activeBtnsPlaintiff" : ""}
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
      {lookType === 1 ? (
        <FizFace typerole={typerole} />
      ) : (
        <UrFace typerole={typerole} />
      )}
    </div>
  );
};

export default AddPlaintiff;
