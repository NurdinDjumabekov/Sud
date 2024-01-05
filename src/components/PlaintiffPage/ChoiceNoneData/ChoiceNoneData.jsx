import React, { useState } from "react";
import "./ChoiceNoneData.scss";

const ChoiceNoneData = ({ props }) => {
  const [btnList, setBtnList] = React.useState([
    {
      id: 1,
      name: "Да",
      bool: false,
    },
    {
      id: 2,
      name: "Нет",
      bool: true,
    },
  ]);

  const clickBtn = (id) => {
    const newList = btnList.map((item) => {
      return {
        ...item,
        bool: id === item.id ? true : false,
      };
    });
    setBtnList(newList);
  };

  return (
    <>
      <div className="choiceNoneData">
        <label htmlFor="checkboxDate">{props.title}</label>
        <div className="choiceNoneData__inner">
          {btnList?.map((btn) => (
            <button
              className={btn?.bool ? "activeBtnsPlaintiff" : ""}
              onClick={() => clickBtn(btn.id)}
              key={btn.id}
            >
              {btn.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default ChoiceNoneData;
