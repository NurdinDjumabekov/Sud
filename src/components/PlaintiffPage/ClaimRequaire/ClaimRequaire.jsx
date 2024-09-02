import React, { useState } from "react";
import ExampleBlock from "../ExampleBlock/ExampleBlock";
import { useDispatch, useSelector } from "react-redux";
import { setDataaIsk } from "../../../store/reducers/applicationsSlice";
import "./ClaimRequaire.scss";
import del from "../../../asstes/icons/krestik.svg";

const ClaimRequaire = () => {
  const dispatch = useDispatch();
  const { dataIsk } = useSelector((state) => state.applicationsSlice);
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
      if (dataIsk?.claim.length > 0) {
        newNumber = +dataIsk.claim[dataIsk.claim.length - 1].number + 1;
      }
      const newClaim = {
        number: newNumber,
        claimText: data,
        status: 0,
      };
      dispatch(
        setDataaIsk({
          ...dataIsk,
          claim: [...dataIsk?.claim, newClaim],
        })
      );
      setData("");
    }
  };

  const removeTodoClaim = (number) => {
    const updatedClaimList = dataIsk?.claim?.map((item) => {
      if (+item.number === +number) {
        return { ...item, status: -1 };
      }
      return item;
    });

    dispatch(
      setDataaIsk({
        ...dataIsk,
        claim: updatedClaimList,
      })
    );
  };

  return (
    <div className={`${"plaintiFilling__container"}`}>
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
          {dataIsk?.claim
            ?.filter((obj) => +obj.status === 0) // Фильтруем объекты с status === 0
            ?.map((obj, index) => (
              <div key={obj.number} className="everyTodo">
                <p>
                  <span>{index + 1}.</span> {obj?.claimText}
                </p>
                <button onClick={() => removeTodoClaim(obj?.number)}>
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
