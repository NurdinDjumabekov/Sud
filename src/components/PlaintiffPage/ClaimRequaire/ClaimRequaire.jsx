import React from "react";
import ExampleBlock from "../../ExampleBlock/ExampleBlock";
import { useDispatch, useSelector } from "react-redux";
import { changeTodosApplications } from "../../../store/reducers/applicationsSlice";

const ClaimRequaire = () => {
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
          typeText={"Пример исковых требований"}
        />
        <form>
          <div>
            <label htmlFor="name">Исковые требования</label>
            <textarea
              style={{ height: "900px" }}
              name="claim"
              id="name"
              onChange={changeInput}
              value={todosApplications.claim}
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClaimRequaire;
