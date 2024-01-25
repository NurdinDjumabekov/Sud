import React from "react";
import ExampleBlock from "../../ExampleBlock/ExampleBlock";
import { useDispatch, useSelector } from "react-redux";
import { changeTodosApplications } from "../../../store/reducers/applicationsSlice";

const MotivationClaim = () => {
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
          typeText={"Пример мотивационная части иска"}
        />
        <form>
          <div>
            <label htmlFor="name">Мотивационная часть</label>
            <textarea
              style={{ height: "70vh" }}
              name="motivation"
              id="name"
              onChange={changeInput}
              value={todosApplications.motivation}
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MotivationClaim;
