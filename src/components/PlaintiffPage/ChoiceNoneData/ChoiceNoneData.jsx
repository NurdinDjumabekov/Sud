import React, { useState } from "react";
import "./ChoiceNoneData.scss";
import { useDispatch, useSelector } from "react-redux";
import { changeADFF } from "../../../store/reducers/inputSlice";

const ChoiceNoneData = ({ props }) => {
  const dispatch = useDispatch();
  const { adff } = useSelector((state) => state.inputSlice);

  const clickBtn = (bool) => {
    dispatch(changeADFF({ ...adff, [props.type]: bool }));
  };

  return (
    <div className="choiceNoneData">
      <label htmlFor="checkboxDate">{props.title}</label>
      <div className="choiceNoneData__inner">
        <span
          className={props?.typeKey ? "activeBtnsPlaintiff" : ""}
          onClick={() => clickBtn(true)}
        >
          Да
        </span>
        <span
          className={props?.typeKey ? "" : "activeBtnsPlaintiff"}
          onClick={() => clickBtn(false)}
        >
          Нет
        </span>
      </div>
    </div>
  );
};

export default ChoiceNoneData;
