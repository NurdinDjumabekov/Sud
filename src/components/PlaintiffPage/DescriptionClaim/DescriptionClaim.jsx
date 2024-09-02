import React from "react";
import ExampleBlock from "../ExampleBlock/ExampleBlock";
import "./DescriptionClaim.scss";
import { setDataaIsk } from "../../../store/reducers/applicationsSlice";
import { useDispatch, useSelector } from "react-redux";
import Selects from "../../Selects/Selects";
import ChoiceNoneData from "../ChoiceNoneData/ChoiceNoneData";

const DescriptionClaim = () => {
  const dispatch = useDispatch();
  const { dataIsk } = useSelector((state) => state.applicationsSlice);
  const { selCurrency } = useSelector((state) => state.selectsSlice);
  const { checkEditPlaint } = useSelector((state) => state.saveDataSlice);

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
        setDataaIsk({
          ...dataIsk,
          [e.target.name]: filteredValue,
        })
      );
    } else {
      dispatch(
        setDataaIsk({
          ...dataIsk,
          [e.target.name]: e.target.value,
        })
      );
    }
  };

  // React.useEffect(() => {
  //   if (+dataIsk.non_proprietary === 0) {
  //     dispatch(
  //       setDataaIsk({
  //         ...dataIsk,
  //         isk_summ: "",
  //         isk_summ_curr: 0,
  //       })
  //     );
  //   }
  // }, [+dataIsk.non_proprietary]);

  return (
    <div className={`${"plaintiFilling__container"} `}>
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
              value={dataIsk.name}
              style={{ height: "28vh" }}
            ></textarea>
          </div>
          <div className="sumIsk">
            {checkEditPlaint && (
              <div className="blockChoice">
                <ChoiceNoneData
                  props={{
                    title: `Неимущественный иск`,
                    typeKey: dataIsk.non_proprietary,
                    type: "non_proprietary",
                  }}
                  multiType={true}
                />
              </div>
            )}
            {dataIsk.non_proprietary === 0 ? (
              <>
                <div>
                  <p>Денежные требования</p>
                  <input
                    type="text"
                    placeholder="Денежные требования"
                    name="isk_summ"
                    onChange={changeInput}
                    value={dataIsk.isk_summ}
                  />
                </div>
                <Selects
                  arr={selCurrency}
                  initText={"Валюта"}
                  keys={{
                    typeKey: dataIsk.isk_summ_curr,
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
              value={dataIsk?.description}
              style={{ height: "28vh" }}
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DescriptionClaim;
