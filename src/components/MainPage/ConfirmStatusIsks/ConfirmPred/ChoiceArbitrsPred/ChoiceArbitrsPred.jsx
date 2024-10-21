/////// hooks
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import debounce from "debounce";

/////// style
import "./style.scss";

/////// imgs
import userImg from "../../../../../asstes/icons/plaintiff/fiz_face.svg";
import star from "../../../../../asstes/icons/star.svg";
import starActive from "../../../../../asstes/icons/starActive.svg";

/////// fns
import { changeArbitrPred } from "../../../../../store/reducers/stateSlice";
import { toTakeArbitrsList } from "../../../../../store/reducers/selectsSlice";

const ChoiceArbitrsPred = (props) => {
  const { setDataModalArbitr, setModalArbitrs, maxCount } = props;
  const { setArbitrs, arbitrs, sendArbitrs } = props;

  const dispatch = useDispatch();

  const { selArbitrs } = useSelector((state) => state.selectsSlice);

  const [serach, setSearch] = useState("");

  const changeInput = (e) => {
    setSearch(e.target.value);
    debouncedSearch(e.target.value);
  };

  const debouncedSearch = useCallback(
    /// поиск арбитре
    debounce((value) => {
      dispatch(toTakeArbitrsList(value));
      dispatch(changeArbitrPred(0));
    }, 500),
    []
  );

  const moreInfo = (obj) => {
    ///// посмотреть подробную инфу об арбитре
    setDataModalArbitr(obj);
    setModalArbitrs(true);
  };

  const clickArbitr = (obj) => {
    setArbitrs((prevArbitrs) => {
      const exists = prevArbitrs.some((item) => item.codeid === obj.codeid);
      if (exists) {
        // Удаляем объект, если он уже есть
        return prevArbitrs.filter((item) => item.codeid !== obj.codeid);
      } else {
        // Добавляем объект, если его нет
        if (prevArbitrs.length >= 5) {
          alert("Вы выбрали максимальное кол-во арбитров");
          return prevArbitrs; // Возвращаем предыдущее состояние, если лимит превышен
        }
        return [...prevArbitrs, obj]; // Добавляем новый объект
      }
    });
  };

  return (
    <div className="choiceArbitrs">
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
        <button className="actionsBtn save" onClick={sendArbitrs}>
          <p>Сохранить</p>
        </button>
      </div>
      <div className="choiceArbitrs__list">
        {selArbitrs?.map((i) => (
          <div key={i?.codeid} className={`every`}>
            <div className="mainInfo">
              <div className="logo">
                <img src={i?.photo || userImg} alt="" />
              </div>
              <p>{i?.name}</p>
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="#4361ee"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 rotate-90 opacity-70 hover:opacity-100"
                onClick={() => moreInfo(i)}
              >
                <circle
                  cx="5"
                  cy="12"
                  r="2"
                  stroke="currentColor"
                  stroke-width="1.5"
                ></circle>
                <circle
                  opacity="0.5"
                  cx="12"
                  cy="12"
                  r="2"
                  stroke="currentColor"
                  stroke-width="1.5"
                ></circle>
                <circle
                  cx="19"
                  cy="12"
                  r="2"
                  stroke="currentColor"
                  stroke-width="1.5"
                ></circle>
              </svg>
            </div>
            <div className="moreInfo">
              <p className="position">
                {i?.education} {i?.position} {i?.description}
              </p>
            </div>

            <div className="actions">
              {arbitrs?.some((item) => item?.codeid === i?.codeid) ? (
                <img src={star} alt="*" onClick={() => clickArbitr(i)} />
              ) : (
                <img src={starActive} alt="*" onClick={() => clickArbitr(i)} />
              )}
              <button className="actionsBtn" onClick={() => clickArbitr(i)}>
                <p>Выбрать</p>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChoiceArbitrsPred;
