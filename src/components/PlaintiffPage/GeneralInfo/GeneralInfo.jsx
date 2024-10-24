//////// hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";

/////// fns
import { setDataaIsk } from "../../../store/reducers/applicationsSlice";

////// components
import MyInput from "../../../common/MyInput/MyInput";
import MySelects from "../../MySelects/MySelects";

////// style
import "./style.scss";
import Arbitrs from "../../MainPage/Arbitrs/Arbitrs";

const GeneralInfo = () => {
  const dispatch = useDispatch();

  const { dataIsk } = useSelector((state) => state.applicationsSlice);
  const { selHarSpora, selPrimPravo, selReglament } = useSelector(
    (state) => state.selectsSlice
  );
  const { selLangArbitr, selArbitrs } = useSelector(
    (state) => state.selectsSlice
  );

  const changeInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (value.includes("'") || value.includes("`")) return;

    const obj = { ...dataIsk, [name]: value };
    dispatch(setDataaIsk(obj));
  };

  const onChangeSel = (nameKey, name, codeid) => {
    const obj = { ...dataIsk, [nameKey]: codeid };
    dispatch(setDataaIsk(obj));
  };

  return (
    <div className="plaintiFilling__container">
      <div className="generalInfo">
        <form>
          <div className="blockSelects">
            <MySelects
              list={selPrimPravo}
              onChangeSel={onChangeSel}
              initText={"Применимое право"}
              nameKey={"prim_pravo"}
              value={dataIsk.prim_pravo}
            />

            <MySelects
              list={selReglament}
              onChangeSel={onChangeSel}
              initText={"Процессуальное право"} /// раньше "Регламент"
              nameKey={"reglament"}
              value={dataIsk.reglament}
            />
          </div>
          <div className="blockSelects">
            <MySelects
              list={selHarSpora}
              onChangeSel={onChangeSel}
              initText={"Характер спора"}
              nameKey={"haracter_spor"}
              value={dataIsk.haracter_spor}
            />

            <MySelects
              list={selLangArbitr}
              onChangeSel={onChangeSel}
              initText={"Язык арбитража"}
              nameKey={"arbitr_lang"}
              value={dataIsk.arbitr_lang}
            />
          </div>
          {/* <div className="blockSelects">
            <MySelects
              list={selArbitrs}
              onChangeSel={onChangeSel}
              initText={`Выбрать арбитра (всего ${selArbitrs?.length} арбитров)`}
              nameKey={"code_arbitr"}
              value={dataIsk.code_arbitr}
            />
          </div> */}
          {/* <Arbitrs row={{}} type={1} /> */}
          <MyInput
            changeInput={changeInput}
            title={"Место разбирательства "}
            value={dataIsk?.place_arbitration}
            name={"place_arbitration"}
            placeholder={"Место арбитража"}
          />
          <div className="blockCheckBox">
            <input
              type="checkbox"
              id="lab"
              name="is_arbitr_po_dogovor"
              onChange={(e) =>
                dispatch(
                  setDataaIsk({
                    ...dataIsk,
                    is_arbitr_po_dogovor: e.target.checked ? 1 : 0,
                  })
                )
              }
              checked={dataIsk.is_arbitr_po_dogovor === 1}
            />
            <label htmlFor="lab">Выбрать арбитра по договору</label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GeneralInfo;

