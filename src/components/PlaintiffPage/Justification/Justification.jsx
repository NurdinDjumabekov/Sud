import React from "react";
import ExampleBlock from "../../ExampleBlock/ExampleBlock";
import { changeTodosApplications } from "../../../store/reducers/applicationsSlice";
import { useDispatch, useSelector } from "react-redux";

const Justification = () => {
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
          typeText={"Пример обоснования"}
        />
        <form>
          <div>
            <label htmlFor="name">Обоснование</label>
            <textarea
              style={{ height: "70vh" }}
              name="obosnovanie"
              id="name"
              onChange={changeInput}
              value={todosApplications.obosnovanie}
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Justification;
