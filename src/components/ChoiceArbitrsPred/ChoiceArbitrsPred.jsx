import React, { useState } from "react";
import "./ChoiceArbitrsPred.scss";
import Selects from "../Selects/Selects";
import { useSelector } from "react-redux";
import debounce from "debounce";
import userImg from "../../asstes/icons/plaintiff/fiz_face.svg";

const ChoiceArbitrsPred = () => {
  const { arbitrPred } = useSelector((state) => state.stateSlice);
  const { selArbitrs } = useSelector((state) => state.selectsSlice);

  const [serach, setSearch] = useState("");
  console.log(selArbitrs, "selArbitrs");
  console.log(arbitrPred, "arbitrPred");

  const changeInput = (e) => {
    const value = e.target.value;
    debouncedSearch(value);
  };

  const debouncedSearch = debounce((value) => {
    setSearch(value);
  }, 300);

  const clickArbitr = (id) => {};
  return (
    <div className="choiceArbitrs">
      <h6>Арбитры</h6>
      <div className="twoInputs">
        <div>
          <p>Поиск арбитров</p>
          <input
            type="text"
            placeholder="Поиск"
            // name="name"
            onChange={changeInput}
            // value={adff.name}
          />
        </div>
        <Selects
          arr={selArbitrs}
          initText={"Сортировка по странам"}
          keys={{ typeKey: arbitrPred, type: "arbitrPred" }}
          type="arbitrPred"
        />
      </div>
      <div className="choiceArbitrs__list">
        {selArbitrs?.map((i) => (
          <div
            key={i?.codeid}
            onClick={() => clickArbitr(i?.codeid)}
            className="choiceArbitrs__list__every"
          >
            <div className="innerArbitr">
              {i?.photo ? (
                // <img src={i?.photo} alt="user" />
                <img src={userImg} alt="user" />
              ) : (
                <img src={userImg} alt="user" />
              )}
              <p>{i?.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChoiceArbitrsPred;
