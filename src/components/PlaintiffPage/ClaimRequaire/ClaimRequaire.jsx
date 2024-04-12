import React, { useState } from "react";
import ExampleBlock from "../ExampleBlock/ExampleBlock";
import { useDispatch, useSelector } from "react-redux";
import { changeTodosApplications } from "../../../store/reducers/applicationsSlice";
import "./ClaimRequaire.scss";
import del from "../../../asstes/icons/krestik.svg";

const ClaimRequaire = () => {
  const dispatch = useDispatch();
  const { todosApplications } = useSelector((state) => state.applicationsSlice);
  const { typeUser, checkEditPlaint } = useSelector(
    (state) => state.saveDataSlice
  );
  const [data, setData] = useState("");

  const changeInput = (e) => {
    e.preventDefault();
    if (e.target.value.includes("'") || e.target.value.includes("`")) {
      return;
    }
    setData(e.target.value);
  };

  const addTodoClaim = (e) => {
    e.preventDefault();
    if (data !== "") {
      let newNumber = 1; // По умолчанию номер будет 1
      if (todosApplications?.claim.length > 0) {
        newNumber =
          +todosApplications.claim[todosApplications.claim.length - 1].number +
          1;
      }
      const newClaim = {
        number: newNumber,
        claimText: data,
        status: 0,
      };
      dispatch(
        changeTodosApplications({
          ...todosApplications,
          claim: [...todosApplications?.claim, newClaim],
        })
      );
      setData("");
    }
  };

  const removeTodoClaim = (number) => {
    const updatedClaimList = todosApplications?.claim?.map((item) => {
      if (+item.number === +number) {
        return { ...item, status: -1 };
      }
      return item;
    });

    dispatch(
      changeTodosApplications({
        ...todosApplications,
        claim: updatedClaimList,
      })
    );
  };

  const isCheckRole =
    checkEditPlaint === true && (+typeUser === 1 || +typeUser === 2);

  // console.log(data);
  console.log(todosApplications);
  return (
    <div
      className={`${"plaintiFilling__container"} ${
        isCheckRole && "moreNonePdf"
      }`}
    >
      <div className="descriptionClaim">
        <ExampleBlock
          text={"Пример названия и описания иска должен быть таким-то"}
          typeText={"Пример исковых требований"}
        />
        <form onSubmit={addTodoClaim} className="blockClaim">
          <input name="claim" id="name" onChange={changeInput} value={data} />
          <button type="submit">Добавить</button>
        </form>
        <div className="todos">
          {todosApplications?.claim
            ?.filter((obj) => +obj.status === 0) // Фильтруем объекты с status === 0
            ?.map((obj, index) => (
              <div key={obj.number} className="everyTodo">
                <p>
                  <span>{index + 1}.</span> {obj?.claimText}
                </p>
                <button onClick={() => removeTodoClaim(obj.number)}>
                  <img src={del} alt="del" />
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ClaimRequaire;
