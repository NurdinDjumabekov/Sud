import React from "react";
import ExampleBlock from "../../ExampleBlock/ExampleBlock";
import "./DescriptionClaim.scss";
import { changeTodosApplications } from "../../../store/reducers/applicationsSlice";
import { useDispatch, useSelector } from "react-redux";

const DescriptionClaim = () => {
  const dispatch = useDispatch();
  const { todosApplications } = useSelector((state) => state.applicationsSlice);

  const changeInput = (e) => {
    e.preventDefault();
    dispatch(
      changeTodosApplications({
        ...todosApplications,
        [e.target.name]: e.target.value,
      })
    );
  };

  return (
    <div className="plaintiFilling__container">
      <div className="descriptionClaim">
        <ExampleBlock
          text={"Пример названия и описания иска должен быть таким-то"}
          typeText={"Пример названия и описания иска"}
        />
        <form>
          <div>
            <label htmlFor="name">Название иска</label>
            <textarea
              name="name"
              id="name"
              onChange={changeInput}
              value={todosApplications.name}
            ></textarea>
          </div>
          <div>
            <label htmlFor="description">Описание иска</label>
            <textarea
              id="description"
              name="description"
              onChange={changeInput}
              value={todosApplications.description}
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DescriptionClaim;
