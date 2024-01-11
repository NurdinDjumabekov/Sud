import React, { useState } from "react";
import "./GeneralInfo.scss";
import Selects from "../../Selects/Selects";
import { useDispatch, useSelector } from "react-redux";
import { changeTodosApplications } from "../../../store/reducers/applicationsSlice";

const GeneralInfo = () => {
  const { todosApplications } = useSelector((state) => state.applicationsSlice);
  const dispatch = useDispatch();

  const selectArr = [
    { id: 0, name: "Мужской" },
    { id: 1, name: "Женский" },
  ];

  return (
    <div className="plaintiFilling__container">
      <div className="generalInfo">
        <form>
          <div className="blockSelects">
            <Selects
              arr={selectArr}
              initText={"Применимое право"}
              keys={{
                typeKey: todosApplications.prim_pravo,
                type: "prim_pravo",
              }}
              type="todos"
            />
            <Selects
              arr={selectArr}
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
              arr={selectArr}
              initText={"Характер спора"}
              keys={{
                typeKey: todosApplications.haracter_spor,
                type: "haracter_spor",
              }}
              type="todos"
            />

            <Selects
              arr={selectArr}
              initText={"Язык арбитража"}
              keys={{
                typeKey: todosApplications.arbitr_lang,
                type: "arbitr_lang",
              }}
              type="todos"
            />
          </div>
          <div className="blockCheckBox">
            <input
              type="checkbox"
              id="lab"
              name="arbitr_po_dogovor"
              onChange={(e) =>
                dispatch(
                  changeTodosApplications({
                    ...todosApplications,
                    arbitr_po_dogovor: e.target.checked,
                  })
                )
              }
              checked={todosApplications.arbitr_po_dogovor}
            />
            <label htmlFor="lab">Выбрать арбитра по договору</label>
          </div>
          {/* <button className="saveBtn">Сохранить</button> */}
        </form>
      </div>
    </div>
  );
};

export default GeneralInfo;
