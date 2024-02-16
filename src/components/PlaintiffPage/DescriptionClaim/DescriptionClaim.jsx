import React from "react";
import ExampleBlock from "../../ExampleBlock/ExampleBlock";
import "./DescriptionClaim.scss";
import { changeTodosApplications } from "../../../store/reducers/applicationsSlice";
import { useDispatch, useSelector } from "react-redux";
import Selects from "../../Selects/Selects";
import ChoiceNoneData from "../ChoiceNoneData/ChoiceNoneData";

const DescriptionClaim = () => {
  const dispatch = useDispatch();
  const { todosApplications } = useSelector((state) => state.applicationsSlice);
  const { selCurrency } = useSelector((state) => state.selectsSlice);
  const { typeUser } = useSelector((state) => state.saveDataSlice);

  const changeInput = (e) => {
    e.preventDefault();
    if (e.target.value.includes("'") || e.target.value.includes("`")) {
      return;
    }
    if (e.target.name === "isk_summ") {
      const numReg = /[0-9,]/;
      const filteredValue = e.target.value
        .split("")
        .filter((char) => numReg.test(char))
        .join("");
      dispatch(
        changeTodosApplications({
          ...todosApplications,
          [e.target.name]: filteredValue,
        })
      );
    } else {
      dispatch(
        changeTodosApplications({
          ...todosApplications,
          [e.target.name]: e.target.value,
        })
      );
    }
  };
  // console.log(todosApplications, "todosApplications");

  // React.useEffect(() => {
  //   if (+todosApplications.non_proprietary === 0) {
  //     dispatch(
  //       changeTodosApplications({
  //         ...todosApplications,
  //         isk_summ: "",
  //         isk_summ_curr: 0,
  //       })
  //     );
  //   }
  // }, [+todosApplications.non_proprietary]);

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
              style={{ height: "28vh" }}
            ></textarea>
          </div>
          <div className="sumIsk">
            {+typeUser === 4 && (
              <div className="blockChoice">
                <ChoiceNoneData
                  props={{
                    title: `Неимущественный иск`,
                    typeKey: todosApplications.non_proprietary,
                    type: "non_proprietary",
                  }}
                  multiType={true}
                />
              </div>
            )}
            {todosApplications.non_proprietary === 0 ? (
              <>
                <div>
                  <p>Денежные требования</p>
                  <input
                    type="text"
                    placeholder="Денежные требования"
                    name="isk_summ"
                    onChange={changeInput}
                    value={todosApplications.isk_summ}
                  />
                </div>
                <Selects
                  arr={selCurrency}
                  initText={"Валюта"}
                  keys={{
                    typeKey: todosApplications.isk_summ_curr,
                    type: "isk_summ_curr",
                  }}
                  type="todos"
                />
              </>
            ) : (
              ""
            )}
          </div>
          <div>
            <label htmlFor="description">Описание иска</label>
            <textarea
              id="description"
              name="description"
              onChange={changeInput}
              value={todosApplications.description}
              style={{ height: "28vh" }}
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DescriptionClaim;
