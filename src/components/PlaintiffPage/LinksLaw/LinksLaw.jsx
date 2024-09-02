import React from "react";
import ExampleBlock from "../ExampleBlock/ExampleBlock";
import { useDispatch, useSelector } from "react-redux";
import { setDataaIsk } from "../../../store/reducers/applicationsSlice";

const LinksLaw = () => {
  const dispatch = useDispatch();
  const { dataIsk } = useSelector((state) => state.applicationsSlice);

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
    <div className={`${"plaintiFilling__container"}`}>
      <div className="descriptionClaim">
        <ExampleBlock
          text={"Пример названия и описания иска должен быть таким-то"}
          typeText={"Пример cсылки на законы"}
        />
        <form>
          <div>
            <label htmlFor="name">Ссылка на законы</label>
            <textarea
              style={{ height: "70vh" }}
              name="law_links"
              id="name"
              onChange={changeInput}
              value={dataIsk.law_links}
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LinksLaw;
