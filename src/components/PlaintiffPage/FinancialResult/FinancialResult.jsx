import React from "react";
import ExampleBlock from "../../ExampleBlock/ExampleBlock";
import { useDispatch, useSelector } from "react-redux";
import { changeTodosApplications } from "../../../store/reducers/applicationsSlice";

const FinancialResult = () => {
  const dispatch = useDispatch();
  const { todosApplications } = useSelector((state) => state.applicationsSlice);
  const { typeUser, checkEditPlaint } = useSelector(
    (state) => state.saveDataSlice
  );

  const changeInput = (e) => {
    e.preventDefault();
    if (e.target.value.includes("'") || e.target.value.includes("`")) {
      return;
    }
    dispatch(
      changeTodosApplications({
        ...todosApplications,
        [e.target.name]: e.target.value,
      })
    );
  };

  const isCheckRole =
    checkEditPlaint === true && (+typeUser === 1 || +typeUser === 2);

  return (
    <div
      className={`${"plaintiFilling__container"} ${
        isCheckRole && "moreNonePdf"
      }`}
    >
      <div className="descriptionClaim">
        <ExampleBlock
          text={"Пример названия и описания иска должен быть таким-то"}
          typeText={"Пример финансового расчета"}
        />
        <form>
          <div>
            <label htmlFor="name">Финансовый расчет</label>
            <textarea
              style={{ height: "70vh" }}
              name="finance_raschet"
              id="name"
              onChange={changeInput}
              value={todosApplications.finance_raschet}
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FinancialResult;
