import React, { useState } from "react";
import "./ChoiceNoneData.scss";
import { useDispatch, useSelector } from "react-redux";
import { changeADFF } from "../../../store/reducers/inputSlice";
import { changeTodosApplications } from "../../../store/reducers/applicationsSlice";

const ChoiceNoneData = ({ props, multiType }) => {
  const dispatch = useDispatch();
  const { adff } = useSelector((state) => state.inputSlice);
  const { todosApplications } = useSelector((state) => state.applicationsSlice);

  const clickBtn = (bool) => {
    if (multiType) {
      dispatch(
        changeTodosApplications({ ...todosApplications, [props.type]: bool })
      );
    } else {
      dispatch(changeADFF({ ...adff, [props.type]: bool }));
    }
  };

  return (
    <div className="choiceNoneData">
      <label htmlFor="checkboxDate">{props.title}</label>
      <div className="choiceNoneData__inner">
        <span
          className={props?.typeKey === 1 ? "activeBtnsPlaintiff" : ""}
          onClick={() => clickBtn(1)}
        >
          Да
        </span>
        <span
          className={props?.typeKey === 1 ? "" : "activeBtnsPlaintiff"}
          onClick={() => clickBtn(0)}
        >
          Нет
        </span>
      </div>
    </div>
  );
};

export default ChoiceNoneData;
