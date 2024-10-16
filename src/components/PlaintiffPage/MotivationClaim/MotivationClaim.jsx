import React from "react";
import ExampleBlock from "../ExampleBlock/ExampleBlock";
import { useDispatch, useSelector } from "react-redux";
import { setDataaIsk } from "../../../store/reducers/applicationsSlice";

const MotivationClaim = () => {
  const dispatch = useDispatch();
  const { dataIsk } = useSelector((state) => state.applicationsSlice);
  const { typeUser, checkEditPlaint } = useSelector(
    (state) => state.saveDataSlice
  );

  const changeInput = (e) => {
    e.preventDefault();
    if (e.target.value.includes("'") || e.target.value.includes("`")) {
      return;
    }
    dispatch(
      setDataaIsk({
        ...dataIsk,
        [e.target.name]: e.target.value,
      })
    );
  };

  return (
    <div className={`${"plaintiFilling__container"} `}>
      <div className="descriptionClaim">
        <ExampleBlock
          text={"Пример названия и описания иска должен быть таким-то"}
          typeText={"Пример мотивационная части иска"}
        />
        <form>
          <div>
            <label htmlFor="name">Мотивационная часть</label>
            <textarea
              style={{ height: "70vh" }}
              name="motivation"
              id="name"
              onChange={changeInput}
              value={dataIsk.motivation}
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MotivationClaim;
