import React, { useState } from "react";
import "./ChoiceArbitrsPred.scss";
import Selects from "../../../Selects/Selects";
import { useDispatch, useSelector } from "react-redux";
import debounce from "debounce";
import userImg from "../../../../asstes/icons/plaintiff/fiz_face.svg";
import Modals from "../../../Modals/Modals";
import { searchNameSelect } from "../../../../helpers/searchNameSelect";
import { changeArbitrPred } from "../../../../store/reducers/stateSlice";
import { toTakeArbitrsList } from "../../../../store/reducers/selectsSlice";

const ChoiceArbitrsPred = () => {
  const dispatch = useDispatch();
  const { arbitrPred } = useSelector((state) => state.stateSlice);
  const { selArbitrs } = useSelector((state) => state.selectsSlice);
  const { tokenA } = useSelector((state) => state.saveDataSlice);
  const { selCountries, selRegions } = useSelector(
    (state) => state.selectsSlice
  );
  const [modalState, setModalState] = useState(false);
  const [dataModal, setDataModal] = useState({});

  const [serach, setSearch] = useState("");
  // console.log(selArbitrs, "selArbitrs");
  // console.log(arbitrPred, "arbitrPred");

  const changeInput = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setSearch(value);
    debouncedSearch(value);
  };

  const debouncedSearch = debounce((value) => {
    dispatch(toTakeArbitrsList({ tokenA, search: value }));
  }, 300);

  const moreInfo = (obj) => {
    // console.log(obj);
    setDataModal(obj);
    setModalState(true);
  };

  const clickArbitr = (codeid) => {
    dispatch(changeArbitrPred(codeid));
  };

  return (
    <>
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
              value={serach}
            />
          </div>
          {/* <Selects
          arr={selArbitrs}
          initText={"Сортировка по странам"}
          keys={{ typeKey: arbitrPred, type: "arbitrPred" }}
          type="arbitrPred"
        /> */}
        </div>
        <div className="choiceArbitrs__list">
          {selArbitrs?.map((i) => (
            <div
              key={i?.codeid}
              onClick={() => clickArbitr(i?.codeid)}
              className={`${
                arbitrPred === i?.codeid && "activeArbitr"
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
      </div>
      <Modals openModal={modalState} setOpenModal={() => setModalState()}>
        <div className="moreInfoArbitrs">
          <div className="moreMainData">
            <div className="logoArbitr">
              {/* <img src={dataModal?.photo || userImg} alt="" /> */}
              {/* <img src={userImg} alt="" /> */}
            </div>
            <h5>{dataModal?.name}</h5>
          </div>
          <div className="moreOtherInfo">
            <h6>{dataModal?.description}</h6>
            <div>
              <span>Образование:</span>
              <p>{dataModal?.education}</p>
            </div>
            <div>
              <span>Специализация:</span>
              <p>{dataModal?.spec}</p>
            </div>
            <div>
              <span>Языки:</span>
              <p>{dataModal?.language}</p>
            </div>
            <div>
              {/* <span>Страна:</span> */}
              {/* <p>{searchNameSelect(selCountries, +dataModal.gorod)}</p> */}
            </div>
          </div>
        </div>
      </Modals>
    </>
  );
};

export default ChoiceArbitrsPred;
