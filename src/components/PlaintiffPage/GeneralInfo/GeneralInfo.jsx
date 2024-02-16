import React, { useState } from "react";
import "./GeneralInfo.scss";
import Selects from "../../Selects/Selects";
import { useDispatch, useSelector } from "react-redux";
import { changeTodosApplications } from "../../../store/reducers/applicationsSlice";
// import { selectUserStatus } from "../../../helpers/dataArr";

const GeneralInfo = () => {
  const { todosApplications } = useSelector((state) => state.applicationsSlice);
  const { selHarSpora, selPrimPravo, selReglament, selLangArbitr } =
    useSelector((state) => state.selectsSlice);
  const dispatch = useDispatch();

  // console.log(todosApplications, "todosApplications");
  return (
    <div className="plaintiFilling__container">
      <div className="generalInfo">
        <form>
          <div className="blockSelects">
            <Selects
              arr={selPrimPravo}
              initText={"Применимое право"}
              keys={{
                typeKey: todosApplications.prim_pravo,
                type: "prim_pravo",
              }}
              type="todos"
            />
            <Selects
              arr={selReglament}
              initText={"Регламент"}
              keys={{
                typeKey: todosApplications.reglament,
                type: "reglament",
              }}
              type="todos"
            />
          </div>
          <div className="blockSelects">
            <Selects
              arr={selHarSpora}
              initText={"Характер спора"}
              keys={{
                typeKey: todosApplications.haracter_spor,
                type: "haracter_spor",
              }}
              type="todos"
            />
            <Selects
              arr={selLangArbitr}
              initText={"Язык арбитража"}
              keys={{
                typeKey: todosApplications.arbitr_lang,
                type: "arbitr_lang",
              }}
              type="todos"
            />
          </div>
          <div className="blockSelects">
            <Selects
              arr={selLangArbitr}
              initText={"Выбрать арбитра"}
              keys={{
                typeKey: todosApplications.code_arbitr,
                type: "code_arbitr",
              }}
              type="todos"
            />
          </div>
          <div className="blockCheckBox">
            <input
              type="checkbox"
              id="lab"
              name="is_arbitr_po_dogovor"
              onChange={(e) =>
                dispatch(
                  changeTodosApplications({
                    ...todosApplications,
                    is_arbitr_po_dogovor: e.target.checked ? 1 : 0,
                  })
                )
              }
              checked={todosApplications.is_arbitr_po_dogovor === 1}
            />
            <label htmlFor="lab">Выбрать арбитра по договору</label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GeneralInfo;
