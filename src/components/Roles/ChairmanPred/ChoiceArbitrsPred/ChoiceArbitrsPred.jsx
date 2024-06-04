import React, { useCallback, useState } from "react";
import "./ChoiceArbitrsPred.scss";
import { useDispatch, useSelector } from "react-redux";
import debounce from "debounce";
import userImg from "../../../../asstes/icons/plaintiff/fiz_face.svg";
import { changeArbitrPred } from "../../../../store/reducers/stateSlice";
import { toTakeArbitrsList } from "../../../../store/reducers/selectsSlice";

const ChoiceArbitrsPred = (props) => {
  const { setDataModalArbitr, setModalArbitrs } = props;
  const { sendArbitrs } = props;

  const dispatch = useDispatch();

  const { arbitrPred } = useSelector((state) => state.stateSlice);

  const { selArbitrs } = useSelector((state) => state.selectsSlice);

  const { tokenA } = useSelector((state) => state.saveDataSlice);

  const [serach, setSearch] = useState("");

  const changeInput = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setSearch(value);
    debouncedSearch(value);
  };

  const debouncedSearch = useCallback(
    debounce((value) => {
      dispatch(toTakeArbitrsList({ tokenA, search: value }));
      dispatch(changeArbitrPred(0));
    }, 500),
    []
  );

  const moreInfo = (obj) => {
    setDataModalArbitr(obj);
    setModalArbitrs(true);
  };

  const clickArbitr = (codeid) => {
    dispatch(changeArbitrPred(codeid));
  };

  return (
    <div className="choiceArbitrs">
      <h6>Арбитры</h6>
      <div className="twoInputs">
        <div>
          <p>Поиск арбитров</p>
          <input
            type="text"
            placeholder="Поиск"
            onChange={changeInput}
            value={serach}
          />
        </div>
      </div>
      <div className="choiceArbitrs__list">
        {selArbitrs?.map((i) => (
          <div
            key={i?.codeid}
            onClick={() => clickArbitr(i?.codeid)}
            className={`${
              arbitrPred == i?.codeid && "activeArbitr"
            } choiceArbitrs__list__every`}
          >
            <div className="innerArbitr">
              <img src={i?.photo || userImg} alt="" />
              <p>{i?.name}</p>
            </div>
            <div className="moreInfo" onClick={() => moreInfo(i)}>
              !
            </div>
          </div>
        ))}
      </div>
      {arbitrPred !== 0 && (
        <button className="choiceArbitrsBtn" onClick={sendArbitrs}>
          Выбрать
        </button>
      )}
    </div>
  );
};

export default ChoiceArbitrsPred;
